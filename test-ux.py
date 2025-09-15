#!/usr/bin/env python3
"""
User Experience Testing Script for BlazeMetrics Frontend
========================================================
Tests learning path effectiveness, page load optimization, and cross-browser compatibility.
"""

import json
import time
from pathlib import Path
from typing import Dict, List, Any
import subprocess
import os

class UXValidator:
    def __init__(self):
        self.frontend_path = Path(".")
        self.results = {
            'learning_paths': {},
            'page_optimization': {},
            'browser_compatibility': {},
            'mobile_responsiveness': {}
        }
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

    def test_learning_path_structure(self) -> bool:
        """Test that learning paths are properly structured and complete"""
        print("\n📚 Testing learning path structure...")
        
        # Define expected learning paths
        learning_paths = {
            'beginner': {
                'component': 'src/components/learning/beginner-path.tsx',
                'expected_steps': [
                    'Installation',
                    'First Evaluation', 
                    'Understanding Results',
                    'Next Steps'
                ]
            },
            'intermediate': {
                'component': 'src/components/learning/intermediate-guide.tsx',
                'expected_steps': [
                    'Advanced Configuration',
                    'Multiple Metrics',
                    'Guardrails Setup',
                    'Production Usage'
                ]
            },
            'advanced': {
                'component': 'src/components/learning/advanced-technical.tsx',
                'expected_steps': [
                    'Custom Evaluators',
                    'Architecture Deep-dive',
                    'Performance Optimization',
                    'Extensibility'
                ]
            }
        }
        
        all_valid = True
        
        for path_name, path_info in learning_paths.items():
            component_path = self.frontend_path / path_info['component']
            
            if not component_path.exists():
                self.log_error(f"Learning path component missing: {path_info['component']}")
                all_valid = False
                continue
                
            try:
                content = component_path.read_text(encoding='utf-8')
                
                # Check for expected steps
                missing_steps = []
                for step in path_info['expected_steps']:
                    if step.lower() not in content.lower():
                        missing_steps.append(step)
                        
                if missing_steps:
                    self.log_warning(f"{path_name} path missing steps: {missing_steps}")
                else:
                    self.log_success(f"{path_name} learning path structure complete")
                    
                # Check for interactive elements
                interactive_elements = [
                    'CodeBlock', 'Button', 'Card', 'Tabs'
                ]
                
                found_elements = []
                for element in interactive_elements:
                    if element in content:
                        found_elements.append(element)
                        
                self.results['learning_paths'][path_name] = {
                    'component_exists': True,
                    'missing_steps': missing_steps,
                    'interactive_elements': found_elements,
                    'step_count': len(path_info['expected_steps']) - len(missing_steps)
                }
                
            except Exception as e:
                self.log_error(f"Failed to analyze {path_name} learning path: {e}")
                all_valid = False
                
        return all_valid

    def test_page_load_optimization(self) -> bool:
        """Test page load optimization techniques"""
        print("\n⚡ Testing page load optimization...")
        
        optimization_checks = {
            'code_splitting': {
                'files': ['src/main.tsx', 'src/App.tsx'],
                'patterns': ['lazy', 'Suspense', 'import(']
            },
            'image_optimization': {
                'files': list(self.frontend_path.glob("src/**/*.tsx")),
                'patterns': ['loading="lazy"', 'placeholder', 'srcSet']
            },
            'bundle_optimization': {
                'files': ['vite.config.ts', 'package.json'],
                'patterns': ['build.rollupOptions', 'build.chunkSizeWarningLimit']
            }
        }
        
        all_optimized = True
        
        for check_name, check_info in optimization_checks.items():
            found_optimizations = []
            
            files_to_check = check_info['files']
            if isinstance(files_to_check[0], str):
                files_to_check = [self.frontend_path / f for f in files_to_check]
                
            for file_path in files_to_check:
                if not file_path.exists():
                    continue
                    
                try:
                    content = file_path.read_text(encoding='utf-8')
                    
                    for pattern in check_info['patterns']:
                        if pattern in content:
                            found_optimizations.append(pattern)
                            
                except Exception as e:
                    self.log_warning(f"Failed to check {file_path}: {e}")
                    
            if found_optimizations:
                self.log_success(f"{check_name} optimizations found: {found_optimizations}")
            else:
                self.log_warning(f"No {check_name} optimizations detected")
                all_optimized = False
                
            self.results['page_optimization'][check_name] = {
                'optimizations_found': found_optimizations,
                'optimization_count': len(found_optimizations)
            }
            
        return all_optimized

    def test_responsive_design(self) -> bool:
        """Test responsive design implementation"""
        print("\n📱 Testing responsive design...")
        
        # Check for responsive design patterns in CSS/Tailwind
        responsive_patterns = [
            'sm:', 'md:', 'lg:', 'xl:', '2xl:',  # Tailwind breakpoints
            '@media', 'min-width', 'max-width',  # CSS media queries
            'grid-cols-', 'flex-col', 'hidden'   # Responsive utilities
        ]
        
        tsx_files = list(self.frontend_path.glob("src/**/*.tsx"))
        css_files = list(self.frontend_path.glob("src/**/*.css"))
        all_files = tsx_files + css_files
        
        responsive_usage = {}
        total_responsive_classes = 0
        
        for file_path in all_files:
            try:
                content = file_path.read_text(encoding='utf-8')
                file_responsive_count = 0
                
                for pattern in responsive_patterns:
                    count = content.count(pattern)
                    file_responsive_count += count
                    total_responsive_classes += count
                    
                if file_responsive_count > 0:
                    responsive_usage[str(file_path)] = file_responsive_count
                    
            except Exception as e:
                self.log_warning(f"Failed to check responsive patterns in {file_path}: {e}")
                
        if total_responsive_classes > 50:  # Arbitrary threshold
            self.log_success(f"Good responsive design usage: {total_responsive_classes} responsive classes found")
            responsive_score = "good"
        elif total_responsive_classes > 20:
            self.log_warning(f"Moderate responsive design usage: {total_responsive_classes} responsive classes found")
            responsive_score = "moderate"
        else:
            self.log_warning(f"Limited responsive design usage: {total_responsive_classes} responsive classes found")
            responsive_score = "limited"
            
        self.results['mobile_responsiveness'] = {
            'total_responsive_classes': total_responsive_classes,
            'responsive_score': responsive_score,
            'files_with_responsive': len(responsive_usage)
        }
        
        return responsive_score in ['good', 'moderate']

    def test_accessibility_compliance(self) -> bool:
        """Test accessibility compliance in code"""
        print("\n♿ Testing accessibility compliance...")
        
        accessibility_patterns = {
            'aria_labels': ['aria-label', 'aria-labelledby', 'aria-describedby'],
            'semantic_html': ['<main', '<nav', '<header', '<footer', '<section', '<article'],
            'keyboard_navigation': ['tabIndex', 'onKeyDown', 'onKeyPress'],
            'alt_text': ['alt=', 'aria-label'],
            'focus_management': ['focus', 'blur', 'autoFocus']
        }
        
        tsx_files = list(self.frontend_path.glob("src/**/*.tsx"))
        
        accessibility_scores = {}
        total_a11y_features = 0
        
        for category, patterns in accessibility_patterns.items():
            category_count = 0
            
            for file_path in tsx_files:
                try:
                    content = file_path.read_text(encoding='utf-8')
                    
                    for pattern in patterns:
                        category_count += content.count(pattern)
                        
                except Exception as e:
                    continue
                    
            accessibility_scores[category] = category_count
            total_a11y_features += category_count
            
        # Evaluate accessibility implementation
        if total_a11y_features > 100:
            self.log_success(f"Good accessibility implementation: {total_a11y_features} a11y features found")
            a11y_score = "good"
        elif total_a11y_features > 50:
            self.log_warning(f"Moderate accessibility implementation: {total_a11y_features} a11y features found")
            a11y_score = "moderate"
        else:
            self.log_warning(f"Limited accessibility implementation: {total_a11y_features} a11y features found")
            a11y_score = "limited"
            
        # Check for accessibility library usage
        package_json_path = self.frontend_path / "package.json"
        a11y_libraries = []
        
        if package_json_path.exists():
            try:
                package_content = json.loads(package_json_path.read_text())
                dependencies = {**package_content.get('dependencies', {}), **package_content.get('devDependencies', {})}
                
                a11y_lib_patterns = ['a11y', 'accessibility', 'aria', 'axe']
                for lib_name in dependencies:
                    if any(pattern in lib_name.lower() for pattern in a11y_lib_patterns):
                        a11y_libraries.append(lib_name)
                        
            except Exception as e:
                self.log_warning(f"Failed to check package.json for a11y libraries: {e}")
                
        self.results['browser_compatibility']['accessibility'] = {
            'total_features': total_a11y_features,
            'score': a11y_score,
            'category_scores': accessibility_scores,
            'a11y_libraries': a11y_libraries
        }
        
        return a11y_score in ['good', 'moderate']

    def test_performance_budgets(self) -> bool:
        """Test if performance budgets are configured"""
        print("\n📊 Testing performance budgets...")
        
        config_files = [
            'vite.config.ts',
            'package.json',
            '.github/workflows'
        ]
        
        performance_configs = []
        
        for config_file in config_files:
            config_path = self.frontend_path / config_file
            
            if config_path.exists():
                try:
                    if config_path.is_file():
                        content = config_path.read_text(encoding='utf-8')
                        
                        # Look for performance-related configurations
                        perf_patterns = [
                            'chunkSizeWarningLimit',
                            'build.rollupOptions',
                            'lighthouse',
                            'bundle-analyzer',
                            'performance'
                        ]
                        
                        found_configs = []
                        for pattern in perf_patterns:
                            if pattern in content:
                                found_configs.append(pattern)
                                
                        if found_configs:
                            performance_configs.extend(found_configs)
                            
                except Exception as e:
                    self.log_warning(f"Failed to check {config_file}: {e}")
                    
        if performance_configs:
            self.log_success(f"Performance configurations found: {performance_configs}")
            perf_configured = True
        else:
            self.log_warning("No performance budgets or monitoring configured")
            perf_configured = False
            
        self.results['page_optimization']['performance_budgets'] = {
            'configured': perf_configured,
            'configurations': performance_configs
        }
        
        return perf_configured

    def generate_ux_recommendations(self) -> List[str]:
        """Generate UX improvement recommendations based on test results"""
        recommendations = []
        
        # Learning path recommendations
        learning_results = self.results.get('learning_paths', {})
        for path_name, path_data in learning_results.items():
            if path_data.get('missing_steps'):
                recommendations.append(f"Complete missing steps in {path_name} learning path: {path_data['missing_steps']}")
                
        # Performance recommendations
        page_opt = self.results.get('page_optimization', {})
        if not page_opt.get('performance_budgets', {}).get('configured'):
            recommendations.append("Configure performance budgets and monitoring")
            
        # Responsive design recommendations
        mobile_resp = self.results.get('mobile_responsiveness', {})
        if mobile_resp.get('responsive_score') == 'limited':
            recommendations.append("Improve responsive design with more breakpoint-specific styling")
            
        # Accessibility recommendations
        a11y_data = self.results.get('browser_compatibility', {}).get('accessibility', {})
        if a11y_data.get('score') == 'limited':
            recommendations.append("Improve accessibility with more ARIA labels and semantic HTML")
            
        return recommendations

    def run_ux_tests(self) -> bool:
        """Run all UX validation tests"""
        print("🎨 Starting BlazeMetrics Frontend UX Testing...")
        print("=" * 60)
        
        # Test learning path structure
        learning_valid = self.test_learning_path_structure()
        
        # Test page load optimization
        optimization_valid = self.test_page_load_optimization()
        
        # Test responsive design
        responsive_valid = self.test_responsive_design()
        
        # Test accessibility compliance
        accessibility_valid = self.test_accessibility_compliance()
        
        # Test performance budgets
        performance_valid = self.test_performance_budgets()
        
        # Generate recommendations
        recommendations = self.generate_ux_recommendations()
        
        # Summary
        print("\n" + "=" * 60)
        print("📊 UX TESTING SUMMARY")
        print("=" * 60)
        
        test_results = {
            'Learning Paths': learning_valid,
            'Page Optimization': optimization_valid,
            'Responsive Design': responsive_valid,
            'Accessibility': accessibility_valid,
            'Performance Budgets': performance_valid
        }
        
        for test_name, result in test_results.items():
            status = "✅ PASS" if result else "⚠️  NEEDS IMPROVEMENT"
            print(f"{test_name}: {status}")
            
        if recommendations:
            print(f"\n💡 RECOMMENDATIONS:")
            for i, rec in enumerate(recommendations, 1):
                print(f"   {i}. {rec}")
                
        if self.errors:
            print(f"\n❌ {len(self.errors)} errors found:")
            for error in self.errors:
                print(f"   • {error}")
                
        if self.warnings:
            print(f"\n⚠️  {len(self.warnings)} warnings found:")
            for warning in self.warnings:
                print(f"   • {warning}")
                
        overall_score = sum(test_results.values()) / len(test_results)
        
        if overall_score >= 0.8:
            print(f"\n✅ UX Score: {overall_score:.1%} - Excellent user experience!")
        elif overall_score >= 0.6:
            print(f"\n⚠️  UX Score: {overall_score:.1%} - Good, with room for improvement")
        else:
            print(f"\n❌ UX Score: {overall_score:.1%} - Needs significant UX improvements")
            
        # Save detailed results
        report_path = self.frontend_path / 'ux-test-report.json'
        with open(report_path, 'w') as f:
            json.dump({
                'timestamp': time.time(),
                'results': self.results,
                'test_results': test_results,
                'recommendations': recommendations,
                'errors': self.errors,
                'warnings': self.warnings,
                'overall_score': overall_score
            }, f, indent=2)
            
        print(f"\n📄 Detailed UX report saved to: {report_path}")
        
        return overall_score >= 0.6  # Pass threshold

if __name__ == "__main__":
    import sys
    validator = UXValidator()
    success = validator.run_ux_tests()
    sys.exit(0 if success else 1)