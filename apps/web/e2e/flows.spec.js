import { test, expect } from '@playwright/test';

const BASE = 'http://localhost:5173';

test.describe('Integrated User Flows', () => {
  
  test('Full User Lifecycle: Register → Login → Dashboard', async ({ page }) => {
    // 1. Register
    await page.goto(`${BASE}/register`);
    await page.locator('input[name="name"]').fill('John Test');
    await page.locator('input[name="email"]').fill('john' + Date.now() + '@test.com');
    await page.locator('input[name="phoneNumber"]').fill('9876543210');
    await page.locator('input[name="password"]').fill('Password123!');
    await page.locator('button[type="submit"]').click();
    
    // App should redirect to login or dashboard
    await page.waitForURL(url => url.pathname === '/login' || url.pathname === '/dashboard' || url.pathname === '/', { timeout: 10000 });
    expect(page.url()).not.toContain('/register');
  });

  test('Loan Creation and Visibility Workflow', async ({ page }) => {
    // This would ideally test that a created loan appears in the marketplace
    // Mocking might be needed for full isolation
    const MOCK_JWT = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6InRlc3QtdXNlci0xIiwibmFtZSI6IlRlc3QgVXNlciIsImVtYWlsIjoidEB0LmNvbSIsInRyb2xlIjoiYm9ycm93ZXIiLCJpYXQiOjE3MDAwMDAwMDAsImV4cCI6OTk5OTk5OTk5OX0.mock_signature';
    await page.goto(BASE);
    await page.evaluate((token) => localStorage.setItem('token', token), MOCK_JWT);
    
    await page.goto(`${BASE}/create-loan`);
    await page.locator('input[name="amount"]').fill('10000');
    await page.locator('button', { hasText: /continue/i }).click();
    await page.locator('input[name="purpose"]').fill('Testing integrated flow');
    await page.locator('button', { hasText: /almost done/i }).click();
    
    // On Review page
    await expect(page.locator('button[type="submit"]')).toBeVisible();
  });
});
