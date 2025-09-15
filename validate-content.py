#!/usr/bin/env python3
"""
Content Validation Script for BlazeMetrics Frontend
==================================================
This script validates all code examples in the frontend documentation
against the actual backend implementation.
"""

import sys
import os
import re
import ast
import subprocess
import json
from pathlib import Path
from typing import List, Dict, Any, Optional

class ContentValidator:
    def __init__(self):
        self.backend_path = Path("../blazemetrics-core")
        self.frontend_path = Path(".")
        self.errors = []
        self.warnings = []
        
    def log_error(self, message: str):
        """Log a validation error"""
        self.errors.append(message)
        print(f"❌ ERROR: {message}")
        
    def log_warning(self, message: str):
        """Log a validation warning"""
        self.warnings.append(message)
        print(f"⚠️  WARNING: {message}")
        
    def log_success(self, message: str):
        """Log a successful validation"""
        print(f"✅ {message}")

    def extract_code_blocks(self, file_path: Path) -> List[Dict[str, Any]]:
        """Extract Python code blocks from TypeScript/React files"""
        code_blocks = []
        
        try:
            content = file_path.read_text(encoding='utf-8')
            
            # Pattern to match code blocks in template literals or strings
            patterns = [
                # Template literals with python code
                r'const\s+\w+\s*=\s*`([^`]*from blazemetrics[^`]*)`',
                # String literals with python code  
                r'code=\{`([^`]*from blazemetrics[^`]*)`\}',
                # Multi-line strings
                r'code=\{"([^"]*from blazemetrics[^"]*)"',
            ]
            
            for pattern in patterns:
                matches = re.finditer(pattern, content, re.MULTILINE | re.DOTALL)
                for match in matches:
                    code = match.group(1)
                    # Clean up the code
                    code = code.replace('\\n', '\n').replace('\\"', '"')
                    code_blocks.append({
                        'code': code,
                        'file': str(file_path),
                        'line': content[:match.start()].count('\n') + 1
                    })
                    
        except Exception as e:
            self.log_error(f"Failed to extract code from {file_path}: {e}")
            
        return code_blocks

    def validate_python_syntax(self, code: str, source: str) -> bool:
        """Validate Python code syntax"""
        try:
            ast.parse(code)
            return True
        except SyntaxError as e:
            self.log_error(f"Syntax error in {source}: {e}")
            return False

    def validate_imports(self, code: str, source: str) -> bool:
        """Validate that imports match the backend API"""
        valid_imports = {
            'blazemetrics': ['BlazeMetricsClient'],
            'blazemetrics.llm_judge': ['LLMJudge'],
            'blazemetrics.agent_eval': ['AgentEvaluator'],
            'blazemetrics.code_evaluator': ['CodeEvaluator'],
            'blazemetrics.factuality_evaluator': ['FactualityEvaluator'],
        }
        
        try:
            tree = ast.parse(code)
            for node in ast.walk(tree):
                if isinstance(node, ast.ImportFrom):
                    module = node.module
                    if module and module.startswith('blazemetrics'):
                        if module not in valid_imports:
                            self.log_warning(f"Unknown module import in {source}: {module}")
                        else:
                            for alias in node.names:
                                if alias.name not in valid_imports[module]:
                                    self.log_warning(f"Unknown import in {source}: {alias.name} from {module}")
            return True
        except Exception as e:
            self.log_error(f"Failed to validate imports in {source}: {e}")
            return False

    def validate_api_usage(self, code: str, source: str) -> bool:
        """Validate API method calls against backend implementation"""
        # Known API methods from the backend
        client_methods = {
            'compute_metrics', 'aggregate_metrics', 'check_safety', 
            'add_metrics', 'get_analytics_summary', 'evaluate_agent',
            'evaluate_code', 'set_factuality_scorer', 'evaluate_factuality',
            'generate_model_card', 'generate_data_card'
        }
        
        config_params = {
            'blocklist', 'redact_pii', 'regexes', 'case_insensitive',
            'enable_analytics', 'analytics_window', 'analytics_alerts',
            'metrics_include', 'metrics_lowercase'
        }
        
        try:
            tree = ast.parse(code)
            for node in ast.walk(tree):
                if isinstance(node, ast.Call):
                    if isinstance(node.func, ast.Attribute):
                        if isinstance(node.func.value, ast.Name) and node.func.value.id == 'client':
                            method = node.func.attr
                            if method not in client_methods:
                                self.log_warning(f"Unknown client method in {source}: {method}")
                                
                elif isinstance(node, ast.keyword):
                    if hasattr(node, 'arg') and node.arg:
                        # Check if it's a BlazeMetricsClient constructor parameter
                        if node.arg not in config_params and 'BlazeMetricsClient' in code:
                            self.log_warning(f"Unknown config parameter in {source}: {node.arg}")
                            
            return True
        except Exception as e:
            self.log_error(f"Failed to validate API usage in {source}: {e}")
            return False

    def validate_expected_outputs(self, code: str, source: str) -> bool:
        """Validate that expected outputs match realistic backend outputs"""
        # Check for unrealistic metric values
        if 'rouge1_f1:' in code or 'bleu:' in code:
            # Extract numeric values
            numbers = re.findall(r':\s*(\d+\.\d+)', code)
            for num_str in numbers:
                num = float(num_str)
                if num > 1.0:
                    self.log_error(f"Metric value > 1.0 in {source}: {num}")
                    return False
                    
        return True

    def check_backend_examples_exist(self) -> bool:
        """Check that referenced backend examples actually exist"""
        expected_examples = [
            "01_basic_text_metrics.py",
            "10_complete_llm_workflow.py",
            "15_rag_semantic_search.py",
            "02_rag_search_and_provenance.py",
            "07_agent_eval.py"
        ]
        
        examples_dir = self.backend_path / "examples"
        use_cases_dir = self.backend_path / "use_cases"
        
        all_exist = True
        for example in expected_examples:
            example_path = examples_dir / example
            use_case_path = use_cases_dir / example.replace("examples", "use_cases")
            
            if not example_path.exists() and not use_case_path.exists():
                self.log_error(f"Referenced backend example does not exist: {example}")
                all_exist = False
            else:
                self.log_success(f"Backend example exists: {example}")
                
        return all_exist

    def validate_links_and_references(self) -> bool:
        """Validate internal links and references"""
        # This would check that all href="/docs/..." links point to actual pages
        # For now, just check that the main doc pages exist
        doc_pages = [
            "src/pages/docs/GettingStarted.tsx",
            "src/pages/docs/MetricsGuide.tsx", 
            "src/pages/docs/LLMIntegrationGuide.tsx",
            "src/pages/docs/LLMUseCases.tsx",
            "src/pages/docs/AdvancedEvaluators.tsx"
        ]
        
        all_exist = True
        for page in doc_pages:
            page_path = self.frontend_path / page
            if not page_path.exists():
                self.log_error(f"Referenced documentation page does not exist: {page}")
                all_exist = False
            else:
                self.log_success(f"Documentation page exists: {page}")
                
        return all_exist

    def validate_interactive_demos(self) -> bool:
        """Validate that interactive demo components exist and are properly structured"""
        demo_components = [
            "src/components/interactive/code-playground.tsx",
            "src/components/interactive/metric-comparison-tool.tsx",
            "src/components/interactive/hallucination-detective.tsx",
            "src/components/interactive/rag-quality-inspector.tsx",
            "src/components/interactive/agent-performance-monitor.tsx",
            "src/components/interactive/speed-demon-showcase.tsx"
        ]
        
        all_exist = True
        for component in demo_components:
            component_path = self.frontend_path / component
            if not component_path.exists():
                self.log_error(f"Interactive demo component does not exist: {component}")
                all_exist = False
            else:
                self.log_success(f"Interactive demo component exists: {component}")
                
        return all_exist

    def run_validation(self) -> bool:
        """Run all validation checks"""
        print("🔍 Starting BlazeMetrics Frontend Content Validation...")
        print("=" * 60)
        
        # 1. Check backend examples exist
        print("\n📁 Checking backend examples...")
        backend_ok = self.check_backend_examples_exist()
        
        # 2. Check documentation pages exist
        print("\n📄 Checking documentation pages...")
        docs_ok = self.validate_links_and_references()
        
        # 3. Check interactive demos exist
        print("\n🎮 Checking interactive demos...")
        demos_ok = self.validate_interactive_demos()
        
        # 4. Validate code examples in documentation
        print("\n🐍 Validating Python code examples...")
        code_ok = True
        
        # Find all TypeScript files with potential Python code
        tsx_files = list(self.frontend_path.glob("src/**/*.tsx"))
        
        for tsx_file in tsx_files:
            if 'docs' in str(tsx_file) or 'interactive' in str(tsx_file):
                code_blocks = self.extract_code_blocks(tsx_file)
                
                for block in code_blocks:
                    source = f"{block['file']}:{block['line']}"
                    code = block['code']
                    
                    # Skip empty or very short code blocks
                    if len(code.strip()) < 10:
                        continue
                        
                    # Validate syntax
                    if not self.validate_python_syntax(code, source):
                        code_ok = False
                        continue
                        
                    # Validate imports
                    if not self.validate_imports(code, source):
                        code_ok = False
                        
                    # Validate API usage
                    if not self.validate_api_usage(code, source):
                        code_ok = False
                        
                    # Validate expected outputs
                    if not self.validate_expected_outputs(code, source):
                        code_ok = False
        
        # Summary
        print("\n" + "=" * 60)
        print("📊 VALIDATION SUMMARY")
        print("=" * 60)
        
        if self.errors:
            print(f"❌ {len(self.errors)} errors found:")
            for error in self.errors:
                print(f"   • {error}")
                
        if self.warnings:
            print(f"⚠️  {len(self.warnings)} warnings found:")
            for warning in self.warnings:
                print(f"   • {warning}")
                
        overall_ok = backend_ok and docs_ok and demos_ok and code_ok and len(self.errors) == 0
        
        if overall_ok:
            print("✅ All validations passed!")
        else:
            print("❌ Some validations failed. Please review the errors above.")
            
        return overall_ok

if __name__ == "__main__":
    validator = ContentValidator()
    success = validator.run_validation()
    sys.exit(0 if success else 1)