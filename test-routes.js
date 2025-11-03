#!/usr/bin/env node

/**
 * Comprehensive route and link testing for BlazeMetrics frontend
 * Tests all routes return 200 and all internal links are valid
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const baseUrl = 'http://localhost:8080/blazemetrics';
const routes = [
  '/',
  '/docs',
  '/docs/getting-started',
  '/docs/architecture',
  '/docs/api',
  '/docs/metrics',
  '/docs/guardrails',
  '/docs/advanced-evaluators',
  '/docs/analytics',
  '/docs/production',
  '/docs/llm-integration',
  '/docs/llm-use-cases',
  '/docs/llm-safety',
  '/learning-paths',
  '/benchmarks',
  '/use-cases',
  '/llm-usage',
  '/blog',
  '/about',
  '/nonexistent-page-404-test'
];

// Extract all routes from App.tsx
function extractRoutesFromApp() {
  const appPath = path.join(__dirname, 'src', 'App.tsx');
  const content = fs.readFileSync(appPath, 'utf8');
  const routeMatches = content.match(/path="([^"]+)"/g);
  const routes = routeMatches ? routeMatches.map(m => m.match(/"([^"]+)"/)[1]) : [];
  return routes;
}

// Extract all links from source files
function extractLinksFromFiles(dir, extensions = ['.tsx', '.ts', '.jsx', '.js']) {
  const links = new Set();
  
  function walkDir(currentPath) {
    const entries = fs.readdirSync(currentPath, { withFileTypes: true });
    
    for (const entry of entries) {
      const fullPath = path.join(currentPath, entry.name);
      
      if (entry.isDirectory()) {
        if (!entry.name.startsWith('.') && entry.name !== 'node_modules') {
          walkDir(fullPath);
        }
      } else if (entry.isFile()) {
        const ext = path.extname(entry.name);
        if (extensions.includes(ext)) {
          const content = fs.readFileSync(fullPath, 'utf8');
          
          // Find all Link to= and href= patterns
          const linkMatches = [
            ...content.matchAll(/to=["']([^"']+)["']/g),
            ...content.matchAll(/href=["']([^"']+)["']/g)
          ];
          
          linkMatches.forEach(match => {
            const link = match[1];
            // Only include internal links (not external URLs)
            if (link && !link.startsWith('http') && !link.startsWith('//') && !link.startsWith('#')) {
              links.add(link);
            }
          });
        }
      }
    }
  }
  
  walkDir(dir);
  return Array.from(links);
}

// Test routes using fetch (when server is running)
async function testRoutes() {
  console.log('🚀 Testing BlazeMetrics Frontend Routes\n');
  console.log(`Base URL: ${baseUrl}\n`);
  
  const results = {
    passed: [],
    failed: [],
    errors: []
  };
  
  for (const route of routes) {
    const url = `${baseUrl}${route}`;
    try {
      const response = await fetch(url, { 
        method: 'GET',
        redirect: 'follow',
        headers: {
          'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8'
        }
      });
      
      if (response.ok || response.status === 200) {
        results.passed.push({ route, status: response.status });
        console.log(`✅ ${route.padEnd(40)} → ${response.status}`);
      } else if (route.includes('404') && response.status === 404) {
        results.passed.push({ route, status: response.status });
        console.log(`✅ ${route.padEnd(40)} → ${response.status} (Expected 404)`);
      } else {
        results.failed.push({ route, status: response.status });
        console.log(`❌ ${route.padEnd(40)} → ${response.status}`);
      }
    } catch (error) {
      results.errors.push({ route, error: error.message });
      console.log(`⚠️  ${route.padEnd(40)} → Error: ${error.message}`);
    }
  }
  
  return results;
}

// Verify route definitions match
function verifyRouteDefinitions() {
  console.log('\n📋 Verifying Route Definitions\n');
  
  const appRoutes = extractRoutesFromApp();
  const expectedRoutes = routes.filter(r => !r.includes('404'));
  
  const missingInApp = expectedRoutes.filter(r => !appRoutes.includes(r));
  const extraInApp = appRoutes.filter(r => !expectedRoutes.includes(r) && r !== '*');
  
  if (missingInApp.length > 0) {
    console.log('⚠️  Routes missing in App.tsx:');
    missingInApp.forEach(r => console.log(`   - ${r}`));
  }
  
  if (extraInApp.length > 0) {
    console.log('⚠️  Extra routes in App.tsx:');
    extraInApp.forEach(r => console.log(`   - ${r}`));
  }
  
  if (missingInApp.length === 0 && extraInApp.length === 0) {
    console.log('✅ All routes properly defined in App.tsx');
  }
  
  return { missingInApp, extraInApp };
}

// Check for broken links in source code
function checkBrokenLinks() {
  console.log('\n🔗 Checking for Broken Links\n');
  
  const srcDir = path.join(__dirname, 'src');
  const allLinks = extractLinksFromFiles(srcDir);
  const routePaths = routes.filter(r => !r.includes('404')).map(r => r.replace(/^\//, ''));
  
  const brokenLinks = [];
  const validLinks = [];
  
  allLinks.forEach(link => {
    // Remove leading slash and base path
    const cleanLink = link.replace(/^\/blazemetrics/, '').replace(/^\//, '');
    
    if (link.startsWith('/blazemetrics/') || link.startsWith('/')) {
      // Check if it's a valid route
      if (routePaths.includes(cleanLink) || cleanLink === '' || cleanLink.startsWith('docs/')) {
        validLinks.push(link);
      } else if (!link.includes('http') && !link.includes('mailto:') && !link.includes('#')) {
        // Check if it's a relative path that might be valid
        const potentialRoutes = routePaths.filter(r => r.includes(cleanLink) || cleanLink.includes(r));
        if (potentialRoutes.length === 0 && cleanLink !== '') {
          brokenLinks.push(link);
        } else {
          validLinks.push(link);
        }
      } else {
        validLinks.push(link); // External links, anchors, etc.
      }
    } else {
      validLinks.push(link); // Relative paths without leading slash
    }
  });
  
  if (brokenLinks.length > 0) {
    console.log('❌ Potential broken links found:');
    brokenLinks.forEach(link => console.log(`   - ${link}`));
  } else {
    console.log('✅ No broken internal links detected');
  }
  
  console.log(`\n📊 Link Statistics:`);
  console.log(`   Valid links: ${validLinks.length}`);
  console.log(`   Broken links: ${brokenLinks.length}`);
  
  return { brokenLinks, validLinks };
}

// Main execution
async function main() {
  console.log('='.repeat(60));
  console.log('BlazeMetrics Frontend - Comprehensive Route Testing');
  console.log('='.repeat(60));
  
  // Verify route definitions
  verifyRouteDefinitions();
  
  // Check for broken links
  const linkResults = checkBrokenLinks();
  
  // Test routes (if server is running)
  console.log('\n🌐 Testing Routes (Server must be running on port 8080)');
  console.log('   Start server with: npm run dev\n');
  
  try {
    const routeResults = await testRoutes();
    
    console.log('\n' + '='.repeat(60));
    console.log('📊 Test Results Summary');
    console.log('='.repeat(60));
    console.log(`✅ Passed: ${routeResults.passed.length}`);
    console.log(`❌ Failed: ${routeResults.failed.length}`);
    console.log(`⚠️  Errors: ${routeResults.errors.length}`);
    console.log(`🔗 Broken Links: ${linkResults.brokenLinks.length}`);
    
    if (routeResults.failed.length > 0) {
      console.log('\n❌ Failed Routes:');
      routeResults.failed.forEach(({ route, status }) => {
        console.log(`   ${route} → ${status}`);
      });
    }
    
    if (routeResults.errors.length > 0) {
      console.log('\n⚠️  Errors:');
      routeResults.errors.forEach(({ route, error }) => {
        console.log(`   ${route}: ${error}`);
      });
    }
    
    const allPassed = routeResults.failed.length === 0 && 
                     routeResults.errors.length === 0 && 
                     linkResults.brokenLinks.length === 0;
    
    if (allPassed) {
      console.log('\n🎉 All tests passed! No errors found.');
      process.exit(0);
    } else {
      console.log('\n⚠️  Some tests failed. Please review the output above.');
      process.exit(1);
    }
  } catch (error) {
    if (error.code === 'ECONNREFUSED') {
      console.log('\n⚠️  Could not connect to server.');
      console.log('   Please start the dev server with: npm run dev');
      console.log('\n✅ Static analysis complete:');
      console.log(`   Broken Links Found: ${linkResults.brokenLinks.length}`);
      if (linkResults.brokenLinks.length === 0) {
        console.log('   All links appear valid!');
        process.exit(0);
      } else {
        process.exit(1);
      }
    } else {
      console.error('\n❌ Unexpected error:', error);
      process.exit(1);
    }
  }
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  main();
}

export { testRoutes, verifyRouteDefinitions, checkBrokenLinks };

