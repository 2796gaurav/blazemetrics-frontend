#!/usr/bin/env node
/**
 * Performance Testing Script for BlazeMetrics Frontend
 * ===================================================
 * Tests page load speeds, interactive performance, and mobile responsiveness
 */

const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

class PerformanceValidator {
    constructor() {
        this.results = {
            pageLoads: {},
            interactiveElements: {},
            mobileResponsiveness: {},
            accessibility: {}
        };
        this.errors = [];
        this.warnings = [];
    }

    log(level, message) {
        const timestamp = new Date().toISOString();
        const logMessage = `[${timestamp}] ${level.toUpperCase()}: ${message}`;
        
        if (level === 'error') {
            this.errors.push(message);
            console.error(`❌ ${message}`);
        } else if (level === 'warning') {
            this.warnings.push(message);
            console.warn(`⚠️  ${message}`);
        } else {
            console.log(`✅ ${message}`);
        }
    }

    async testPageLoad(page, url, pageName) {
        try {
            const startTime = Date.now();
            
            // Navigate to page and wait for network idle
            await page.goto(url, { 
                waitUntil: 'networkidle0',
                timeout: 30000 
            });
            
            const loadTime = Date.now() - startTime;
            
            // Get performance metrics
            const performanceMetrics = await page.evaluate(() => {
                const navigation = performance.getEntriesByType('navigation')[0];
                return {
                    domContentLoaded: navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart,
                    loadComplete: navigation.loadEventEnd - navigation.loadEventStart,
                    firstPaint: performance.getEntriesByName('first-paint')[0]?.startTime || 0,
                    firstContentfulPaint: performance.getEntriesByName('first-contentful-paint')[0]?.startTime || 0
                };
            });

            this.results.pageLoads[pageName] = {
                totalLoadTime: loadTime,
                ...performanceMetrics
            };

            // Performance thresholds
            if (loadTime > 5000) {
                this.log('warning', `${pageName} load time (${loadTime}ms) exceeds 5s threshold`);
            } else if (loadTime > 3000) {
                this.log('warning', `${pageName} load time (${loadTime}ms) exceeds 3s recommended threshold`);
            } else {
                this.log('info', `${pageName} loaded in ${loadTime}ms`);
            }

            return true;
        } catch (error) {
            this.log('error', `Failed to load ${pageName}: ${error.message}`);
            return false;
        }
    }

    async testInteractiveElements(page, pageName) {
        try {
            // Test common interactive elements
            const interactiveTests = [
                {
                    name: 'Navigation Menu',
                    selector: 'nav button, nav a',
                    action: 'click'
                },
                {
                    name: 'Code Blocks',
                    selector: '[data-testid="code-block"], .code-block',
                    action: 'hover'
                },
                {
                    name: 'Interactive Demos',
                    selector: '[data-testid="interactive-demo"], .interactive-demo',
                    action: 'click'
                },
                {
                    name: 'Tabs',
                    selector: '[role="tab"]',
                    action: 'click'
                }
            ];

            const results = {};

            for (const test of interactiveTests) {
                try {
                    const elements = await page.$$(test.selector);
                    if (elements.length > 0) {
                        const startTime = Date.now();
                        
                        if (test.action === 'click') {
                            await elements[0].click();
                            await page.waitForTimeout(100); // Wait for any animations
                        } else if (test.action === 'hover') {
                            await elements[0].hover();
                            await page.waitForTimeout(100);
                        }
                        
                        const responseTime = Date.now() - startTime;
                        results[test.name] = {
                            found: elements.length,
                            responseTime
                        };

                        if (responseTime > 500) {
                            this.log('warning', `${test.name} response time (${responseTime}ms) on ${pageName} is slow`);
                        } else {
                            this.log('info', `${test.name} on ${pageName} responds in ${responseTime}ms`);
                        }
                    } else {
                        results[test.name] = { found: 0, responseTime: null };
                    }
                } catch (error) {
                    this.log('warning', `Failed to test ${test.name} on ${pageName}: ${error.message}`);
                    results[test.name] = { error: error.message };
                }
            }

            this.results.interactiveElements[pageName] = results;
            return true;
        } catch (error) {
            this.log('error', `Failed to test interactive elements on ${pageName}: ${error.message}`);
            return false;
        }
    }

    async testMobileResponsiveness(page, pageName) {
        try {
            const viewports = [
                { name: 'Mobile', width: 375, height: 667 },
                { name: 'Tablet', width: 768, height: 1024 },
                { name: 'Desktop', width: 1920, height: 1080 }
            ];

            const results = {};

            for (const viewport of viewports) {
                await page.setViewport(viewport);
                await page.waitForTimeout(500); // Wait for responsive changes

                // Check for horizontal scrollbars (indicates responsive issues)
                const hasHorizontalScroll = await page.evaluate(() => {
                    return document.documentElement.scrollWidth > document.documentElement.clientWidth;
                });

                // Check if navigation is accessible
                const navAccessible = await page.evaluate(() => {
                    const nav = document.querySelector('nav');
                    if (!nav) return false;
                    const style = window.getComputedStyle(nav);
                    return style.display !== 'none' && style.visibility !== 'hidden';
                });

                results[viewport.name] = {
                    hasHorizontalScroll,
                    navAccessible,
                    viewport: viewport
                };

                if (hasHorizontalScroll) {
                    this.log('warning', `${pageName} has horizontal scroll on ${viewport.name}`);
                } else {
                    this.log('info', `${pageName} responsive on ${viewport.name}`);
                }
            }

            this.results.mobileResponsiveness[pageName] = results;
            return true;
        } catch (error) {
            this.log('error', `Failed to test mobile responsiveness on ${pageName}: ${error.message}`);
            return false;
        }
    }

    async testAccessibility(page, pageName) {
        try {
            // Basic accessibility checks
            const accessibilityIssues = await page.evaluate(() => {
                const issues = [];
                
                // Check for images without alt text
                const images = document.querySelectorAll('img');
                images.forEach((img, index) => {
                    if (!img.alt && !img.getAttribute('aria-label')) {
                        issues.push(`Image ${index + 1} missing alt text`);
                    }
                });

                // Check for buttons without accessible names
                const buttons = document.querySelectorAll('button');
                buttons.forEach((button, index) => {
                    const hasText = button.textContent.trim().length > 0;
                    const hasAriaLabel = button.getAttribute('aria-label');
                    const hasAriaLabelledBy = button.getAttribute('aria-labelledby');
                    
                    if (!hasText && !hasAriaLabel && !hasAriaLabelledBy) {
                        issues.push(`Button ${index + 1} missing accessible name`);
                    }
                });

                // Check for proper heading hierarchy
                const headings = Array.from(document.querySelectorAll('h1, h2, h3, h4, h5, h6'));
                let previousLevel = 0;
                headings.forEach((heading, index) => {
                    const level = parseInt(heading.tagName.charAt(1));
                    if (level > previousLevel + 1) {
                        issues.push(`Heading level skip: ${heading.tagName} after h${previousLevel}`);
                    }
                    previousLevel = level;
                });

                return issues;
            });

            this.results.accessibility[pageName] = {
                issues: accessibilityIssues,
                issueCount: accessibilityIssues.length
            };

            if (accessibilityIssues.length > 0) {
                this.log('warning', `${pageName} has ${accessibilityIssues.length} accessibility issues`);
                accessibilityIssues.forEach(issue => {
                    this.log('warning', `  - ${issue}`);
                });
            } else {
                this.log('info', `${pageName} passed basic accessibility checks`);
            }

            return true;
        } catch (error) {
            this.log('error', `Failed to test accessibility on ${pageName}: ${error.message}`);
            return false;
        }
    }

    async runTests() {
        console.log('🚀 Starting BlazeMetrics Frontend Performance Tests...');
        console.log('=' * 60);

        let browser;
        try {
            browser = await puppeteer.launch({
                headless: true,
                args: ['--no-sandbox', '--disable-setuid-sandbox']
            });

            const page = await browser.newPage();
            
            // Set a reasonable viewport
            await page.setViewport({ width: 1920, height: 1080 });

            // Test pages (assuming dev server is running on localhost:5173)
            const baseUrl = process.env.TEST_URL || 'http://localhost:5173';
            const testPages = [
                { url: `${baseUrl}/`, name: 'Homepage' },
                { url: `${baseUrl}/docs/getting-started`, name: 'Getting Started' },
                { url: `${baseUrl}/docs/metrics`, name: 'Metrics Guide' },
                { url: `${baseUrl}/docs/llm-integration`, name: 'LLM Integration' },
                { url: `${baseUrl}/use-cases`, name: 'Use Cases' },
                { url: `${baseUrl}/benchmarks`, name: 'Benchmarks' }
            ];

            console.log(`\n📄 Testing ${testPages.length} pages...`);
            
            for (const testPage of testPages) {
                console.log(`\n🔍 Testing ${testPage.name}...`);
                
                // Test page load performance
                const loadSuccess = await this.testPageLoad(page, testPage.url, testPage.name);
                if (!loadSuccess) continue;

                // Test interactive elements
                await this.testInteractiveElements(page, testPage.name);

                // Test mobile responsiveness
                await this.testMobileResponsiveness(page, testPage.name);

                // Test accessibility
                await this.testAccessibility(page, testPage.name);
            }

        } catch (error) {
            this.log('error', `Test execution failed: ${error.message}`);
        } finally {
            if (browser) {
                await browser.close();
            }
        }

        // Generate summary report
        this.generateReport();
    }

    generateReport() {
        console.log('\n' + '=' * 60);
        console.log('📊 PERFORMANCE TEST SUMMARY');
        console.log('=' * 60);

        // Page load summary
        console.log('\n📈 Page Load Performance:');
        Object.entries(this.results.pageLoads).forEach(([page, metrics]) => {
            console.log(`  ${page}: ${metrics.totalLoadTime}ms`);
        });

        // Interactive elements summary
        console.log('\n🎮 Interactive Elements:');
        Object.entries(this.results.interactiveElements).forEach(([page, elements]) => {
            const elementCount = Object.values(elements).reduce((sum, el) => sum + (el.found || 0), 0);
            console.log(`  ${page}: ${elementCount} interactive elements found`);
        });

        // Mobile responsiveness summary
        console.log('\n📱 Mobile Responsiveness:');
        Object.entries(this.results.mobileResponsiveness).forEach(([page, viewports]) => {
            const issues = Object.values(viewports).filter(v => v.hasHorizontalScroll).length;
            console.log(`  ${page}: ${issues > 0 ? `${issues} viewport issues` : 'Responsive'}`);
        });

        // Accessibility summary
        console.log('\n♿ Accessibility:');
        Object.entries(this.results.accessibility).forEach(([page, results]) => {
            console.log(`  ${page}: ${results.issueCount} issues found`);
        });

        // Overall summary
        if (this.errors.length > 0) {
            console.log(`\n❌ ${this.errors.length} errors found`);
        }
        
        if (this.warnings.length > 0) {
            console.log(`⚠️  ${this.warnings.length} warnings found`);
        }

        if (this.errors.length === 0 && this.warnings.length === 0) {
            console.log('\n✅ All performance tests passed!');
        }

        // Save detailed results
        const reportPath = path.join(__dirname, 'performance-report.json');
        fs.writeFileSync(reportPath, JSON.stringify({
            timestamp: new Date().toISOString(),
            results: this.results,
            errors: this.errors,
            warnings: this.warnings
        }, null, 2));

        console.log(`\n📄 Detailed report saved to: ${reportPath}`);
    }
}

// Run tests if called directly
if (require.main === module) {
    const validator = new PerformanceValidator();
    validator.runTests().catch(console.error);
}

module.exports = PerformanceValidator;