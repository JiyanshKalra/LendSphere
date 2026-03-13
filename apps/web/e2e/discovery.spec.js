import { test } from '@playwright/test';
import fs from 'fs';

const BASE = 'http://localhost:5173';

async function discoverElements(page, path) {
  console.log(`\n--- Discovering elements on: ${path} ---`);
  await page.goto(`${BASE}${path}`);
  await page.waitForTimeout(1000); // Wait for animations/loads

  const elements = await page.evaluate(() => {
    const interactive = [];
    const selectors = ['button', 'a', 'select', 'input[type="submit"]', 'input[type="button"]'];
    
    selectors.forEach(selector => {
      document.querySelectorAll(selector).forEach(el => {
        interactive.push({
          tag: el.tagName.toLowerCase(),
          text: el.innerText.trim() || el.value || el.getAttribute('aria-label') || 'no-text',
          href: el.getAttribute('href'),
          id: el.id,
          classes: el.className,
          rect: el.getBoundingClientRect()
        });
      });
    });
    return interactive;
  });

  console.log(`Found ${elements.length} components:`);
  elements.forEach((el, i) => {
    console.log(`${i+1}. [${el.tag}] "${el.text}" ${el.href ? '(Link: ' + el.href + ')' : ''}`);
  });
  
  return { path, elements };
}

test('Discover all interactive elements', async ({ page }) => {
  const results = [];
  
  // Public pages
  results.push(await discoverElements(page, '/login'));
  results.push(await discoverElements(page, '/register'));
  
  // Auth required pages
  
  const authPages = [
    '/',
    '/marketplace',
    '/chat',
    '/profile',
    '/repayments',
    '/create-loan'
  ];
  
  for (const path of authPages) {
    results.push(await discoverElements(page, path));
  }
  
  // Loan details (requires an ID, let's try to find one from marketplace or use a dummy)
  // For now, let's assume we can hit /marketplace/some-id
  results.push(await discoverElements(page, '/marketplace/test-loan-id'));

  fs.writeFileSync('discovery_results.json', JSON.stringify(results, null, 2));
});
