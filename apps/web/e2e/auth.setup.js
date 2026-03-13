import { test as setup, expect } from '@playwright/test';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
const authFile = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../playwright/.auth/user.json');

setup('authenticate', async ({ page }) => {
  console.log('Starting authentication setup...');
  const testEmail = `testuser_${Date.now()}@example.com`;
  
  console.log('Navigating to /register...');
  await page.goto('/register');
  
  console.log('Filling form...');
  await page.fill('input[name="name"]', 'Test User');
  await page.fill('input[name="email"]', testEmail);
  await page.fill('input[name="phoneNumber"]', '1234567890');
  await page.fill('input[name="password"]', 'Password123!');
  await page.selectOption('select[name="role"]', 'borrower');
  
  console.log('Submitting form...');
  await page.click('button[type="submit"]');

  console.log('Waiting for navigation...');
  // Wait for navigation to dashboard or success state
  await page.waitForURL(url => {
    console.log('Current URL:', url.pathname);
    return url.pathname === '/' || url.pathname === '/dashboard';
  }, { timeout: 30000 });
  
  console.log('Authenticated! Saving storage state...');
  // Verify we are logged in
  await expect(page.locator('nav')).toBeVisible();

  // Save storage state for all other tests
  await page.context().storageState({ path: authFile });
  console.log('Storage state saved.');
});
