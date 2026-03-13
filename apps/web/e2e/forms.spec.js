import { test, expect } from '@playwright/test';

const BASE = 'http://localhost:5173';
const MOCK_JWT = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6InRlc3QtdXNlci0xIiwibmFtZSI6IlRlc3QgVXNlciIsImVtYWlsIjoidEB0LmNvbSIsInJvbGUiOiJib3Jyb3dlciIsImlhdCI6MTcwMDAwMDAwMCwiZXhwIjo5OTk5OTk5OTk5fQ.mock_signature';

async function setupAuth(page) {
  await page.goto(BASE);
  await page.evaluate((token) => localStorage.setItem('token', token), MOCK_JWT);
}

test.describe('Exhaustive Form Testing', () => {
  
  test('Create Loan Form - Step-by-Step Validation', async ({ page }) => {
    await page.goto(`${BASE}/create-loan`);
    await page.waitForSelector('button:has-text("Continue")');
    
    // Step 1
    const nextBtn = page.locator('button', { hasText: /continue/i });
    await nextBtn.click();
    await expect(page.locator('span.text-red-500')).toBeVisible(); // Validation error
    
    await page.locator('input[name="amount"]').fill('25000');
    await page.locator('select[name="repaymentPeriod"]').selectOption('24');
    await nextBtn.click();
    
    // Step 2
    await expect(page.locator('input[name="purpose"]')).toBeVisible();
    await page.locator('button', { hasText: /almost done/i }).click();
    await expect(page.locator('span.text-red-500')).toBeVisible(); // Purpose is required
    
    await page.locator('input[name="purpose"]').fill('Scaling my home bakery business');
    await page.locator('textarea[name="collateral"]').fill('Baking equipment and oven');
    await page.locator('button', { hasText: /almost done/i }).click();
    
    // Step 3
    await expect(page.locator('button[type="submit"]')).toBeVisible();
    await expect(page.locator('text=₹25,000')).toBeVisible();
  });

  test('Repayment Form Interaction', async ({ page }) => {
    await setupAuth(page);
    await page.goto(`${BASE}/repayments`);
    await page.waitForTimeout(500);
    
    const makePaymentBtn = page.locator('button', { hasText: /make payment/i });
    if (await makePaymentBtn.count() > 0) {
      await makePaymentBtn.click();
      const amountInput = page.locator('input[placeholder="0.00"]');
      await amountInput.fill('5000');
      
      const recordBtn = page.locator('button', { hasText: /record payment/i });
      await expect(recordBtn).toBeVisible();
      await expect(recordBtn).toBeEnabled();
    }
  });

  test('Offer Submission Form Interaction', async ({ page }) => {
    await setupAuth(page);
    await page.goto(`${BASE}/marketplace/test-loan-id`);
    
    const amountInput = page.locator('input[placeholder*="e.g. 10000"]');
    if (await amountInput.count() > 0) {
      await amountInput.fill('15000');
      await page.locator('input[placeholder*="e.g. 12"]').fill('15');
      
      const submitBtn = page.locator('button', { hasText: /submit offer/i });
      await expect(submitBtn).toBeVisible();
    }
  });
});
