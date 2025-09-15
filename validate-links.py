#!/usr/bin/env python3
"""
Link Validation Script for BlazeMetrics Frontend
===============================================
Validates all internal and external links in the frontend documentation.
"""

import re
import requests
from pathlib import Path
from urllib.parse import urljoin, urlparse
import time
from typing import Set, List, Dict, Any

class LinkValidator:
    def __init__(self):
        self.frontend_path = Path(".")
        self.errors = []
        self.warnings = []
        self.checked_urls = set()
        self.internal_links = set()
        self.external_links = set()
        
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

    def extract_links_from_file(self, file_path: Path) -> List[Dict[str, Any]]:
        """Extract all links from a TypeScript/React file"""
        links = []
        
        try:
            content = file_path.read_text(encoding='utf-8')
            
            # Patterns to match different types of links
            patterns = [
                # href attributes
                r'href=["\'](.*?)["\']',
                # to attributes (React Router)
                r'to=["\'](.*?)["\']',
                # src attributes for images
                r'src=["\'](.*?)["\']',
                # Links in markdown-like content
                r'\[.*?\]\((.*?)\)',
                # Template literal URLs
                r'`(https?://[^`]*)`',
                # String URLs
                r'"(https?://[^"]*)"',
                r"'(https?://[^']*)'",
            ]
            
            for pattern in patterns:
                matches = re.finditer(pattern, content, re.MULTILINE)
                for match in matches:
                    url = match.group(1)
                    # Skip empty, javascript:, mailto:, tel: links
                    if url and not url.startswith(('javascript:', 'mailto:', 'tel:', '#')):
                        links.append({
                            'url': url,
                            'file': str(file_path),
                            'line': content[:match.start()].count('\n') + 1
                        })
                        
        except Exception as e:
            self.log_error(f"Failed to extract links from {file_path}: {e}")
            
        return links

    def categorize_links(self, links: List[Dict[str, Any]]) -> None:
        """Categorize links as internal or external"""
        for link in links:
            url = link['url']
            
            if url.startswith(('http://', 'https://')):
                self.external_links.add(url)
            elif url.startswith('/') or not url.startswith(('http', 'mailto', 'tel')):
                self.internal_links.add(url)

    def validate_internal_links(self) -> bool:
        """Validate internal links against actual file structure"""
        print("\n🔗 Validating internal links...")
        
        # Map of expected routes to actual files
        route_mappings = {
            '/': 'src/pages/Home.tsx',
            '/docs/getting-started': 'src/pages/docs/GettingStarted.tsx',
            '/docs/metrics': 'src/pages/docs/MetricsGuide.tsx',
            '/docs/llm-integration': 'src/pages/docs/LLMIntegrationGuide.tsx',
            '/docs/llm-use-cases': 'src/pages/docs/LLMUseCases.tsx',
            '/docs/llm-safety': 'src/pages/docs/LLMSafetyGuardrails.tsx',
            '/docs/advanced-evaluators': 'src/pages/docs/AdvancedEvaluators.tsx',
            '/docs/api-reference': 'src/pages/docs/APIReference.tsx',
            '/docs/architecture': 'src/pages/docs/ArchitectureGuide.tsx',
            '/docs/analytics': 'src/pages/docs/AnalyticsGuide.tsx',
            '/docs/production': 'src/pages/docs/ProductionGuide.tsx',
            '/docs/guardrails': 'src/pages/docs/GuardrailsGuide.tsx',
            '/use-cases': 'src/pages/UseCases.tsx',
            '/benchmarks': 'src/pages/Benchmarks.tsx',
            '/learning-paths': 'src/pages/LearningPaths.tsx',
            '/about': 'src/pages/About.tsx',
            '/blog': 'src/pages/Blog.tsx',
        }
        
        all_valid = True
        
        for link in self.internal_links:
            # Clean up the link (remove query params, fragments)
            clean_link = link.split('?')[0].split('#')[0]
            
            if clean_link in route_mappings:
                file_path = self.frontend_path / route_mappings[clean_link]
                if file_path.exists():
                    self.log_success(f"Internal link valid: {link}")
                else:
                    self.log_error(f"Internal link points to missing file: {link} -> {file_path}")
                    all_valid = False
            elif clean_link.startswith('/docs/'):
                # Check if it's a valid docs route
                self.log_warning(f"Unknown docs route: {link}")
            elif clean_link.startswith('/'):
                # Check if it's a static asset
                if clean_link.startswith('/images/') or clean_link.startswith('/public/'):
                    # These should exist in the public directory
                    asset_path = self.frontend_path / 'public' / clean_link.lstrip('/')
                    if not asset_path.exists():
                        self.log_warning(f"Static asset not found: {link}")
                else:
                    self.log_warning(f"Unknown internal route: {link}")
            
        return all_valid

    def validate_external_links(self) -> bool:
        """Validate external links by making HTTP requests"""
        print("\n🌐 Validating external links...")
        
        all_valid = True
        session = requests.Session()
        session.headers.update({
            'User-Agent': 'BlazeMetrics-LinkValidator/1.0'
        })
        
        for url in self.external_links:
            if url in self.checked_urls:
                continue
                
            try:
                # Add delay to be respectful
                time.sleep(0.5)
                
                response = session.head(url, timeout=10, allow_redirects=True)
                
                if response.status_code == 405:  # Method not allowed, try GET
                    response = session.get(url, timeout=10, allow_redirects=True)
                
                if response.status_code < 400:
                    self.log_success(f"External link valid: {url}")
                else:
                    self.log_error(f"External link returned {response.status_code}: {url}")
                    all_valid = False
                    
                self.checked_urls.add(url)
                
            except requests.exceptions.Timeout:
                self.log_warning(f"External link timeout: {url}")
            except requests.exceptions.ConnectionError:
                self.log_warning(f"External link connection error: {url}")
            except Exception as e:
                self.log_warning(f"External link error: {url} - {e}")
                
        return all_valid

    def check_common_issues(self, links: List[Dict[str, Any]]) -> None:
        """Check for common link issues"""
        print("\n🔍 Checking for common link issues...")
        
        for link_info in links:
            url = link_info['url']
            source = f"{link_info['file']}:{link_info['line']}"
            
            # Check for localhost links (should be relative)
            if 'localhost' in url:
                self.log_warning(f"Localhost link found in {source}: {url}")
                
            # Check for hardcoded domain links (should be relative for internal)
            if url.startswith('https://blazemetrics.') or url.startswith('http://blazemetrics.'):
                self.log_warning(f"Hardcoded domain link in {source}: {url}")
                
            # Check for broken fragment links
            if '#' in url and not url.startswith('http'):
                fragment = url.split('#')[1]
                if not fragment:
                    self.log_warning(f"Empty fragment in {source}: {url}")

    def run_validation(self) -> bool:
        """Run all link validation checks"""
        print("🔗 Starting BlazeMetrics Frontend Link Validation...")
        print("=" * 60)
        
        # Find all TypeScript/React files
        tsx_files = list(self.frontend_path.glob("src/**/*.tsx"))
        ts_files = list(self.frontend_path.glob("src/**/*.ts"))
        all_files = tsx_files + ts_files
        
        print(f"\n📁 Scanning {len(all_files)} files for links...")
        
        all_links = []
        for file_path in all_files:
            links = self.extract_links_from_file(file_path)
            all_links.extend(links)
            
        print(f"🔍 Found {len(all_links)} total links")
        
        # Categorize links
        self.categorize_links(all_links)
        print(f"📍 Internal links: {len(self.internal_links)}")
        print(f"🌐 External links: {len(self.external_links)}")
        
        # Check for common issues
        self.check_common_issues(all_links)
        
        # Validate internal links
        internal_valid = self.validate_internal_links()
        
        # Validate external links (with rate limiting)
        external_valid = self.validate_external_links()
        
        # Summary
        print("\n" + "=" * 60)
        print("📊 LINK VALIDATION SUMMARY")
        print("=" * 60)
        
        if self.errors:
            print(f"❌ {len(self.errors)} errors found:")
            for error in self.errors:
                print(f"   • {error}")
                
        if self.warnings:
            print(f"⚠️  {len(self.warnings)} warnings found:")
            for warning in self.warnings:
                print(f"   • {warning}")
                
        overall_valid = internal_valid and external_valid and len(self.errors) == 0
        
        if overall_valid:
            print("✅ All link validations passed!")
        else:
            print("❌ Some link validations failed. Please review the errors above.")
            
        return overall_valid

if __name__ == "__main__":
    import sys
    validator = LinkValidator()
    success = validator.run_validation()
    sys.exit(0 if success else 1)