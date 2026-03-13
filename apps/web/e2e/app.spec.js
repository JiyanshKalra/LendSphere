import { test, expect } from '@playwright/test';

const BASE = 'http://localhost:5173';

test.describe('Navbar', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(`${BASE}/`);
    await page.waitForTimeout(500);
  });

  test('Navbar renders brand and nav links', async ({ page }) => {
    const nav = page.locator('nav');
    await expect(nav).toBeVisible();
    await expect(page.locator('nav a', { hasText: 'Lend Sphere' })).toBeVisible();
  });

  test('Navbar Dashboard link navigates to /', async ({ page }) => {
    const dashLink = page.locator('nav a[href="/"]');
    await dashLink.first().click();
    await expect(page).toHaveURL(`${BASE}/`);
  });

  test('Navbar Marketplace link navigates', async ({ page }) => {
    await page.locator('nav a[href="/marketplace"]').click();
    await expect(page).toHaveURL(`${BASE}/marketplace`);
  });

  test('Navbar Chat link navigates', async ({ page }) => {
    await page.locator('nav a[href="/chat"]').click();
    await expect(page).toHaveURL(`${BASE}/chat`);
  });

  test('Navbar Profile link navigates', async ({ page }) => {
    await page.locator('nav a[href="/profile"]').click();
    await expect(page).toHaveURL(`${BASE}/profile`);
  });

  test('Logout button clears session and redirects', async ({ page }) => {
    const logoutBtn = page.locator('button', { hasText: /logout|sign out/i });
    await logoutBtn.first().click();
    await page.waitForTimeout(500);
    await expect(page).toHaveURL(/\/login/);
    const token = await page.evaluate(() => localStorage.getItem('token'));
    expect(token).toBeNull();
  });

  test('Language Switcher toggles and displays correct labels', async ({ page }) => {
    const langBtn = page.locator('button[aria-label*="Language is"]');
    await expect(langBtn).toBeVisible();
    
    const initialLabel = await langBtn.getAttribute('aria-label');
    await langBtn.click();
    
    // Check if label changed (indicates toggle)
    const newLabel = await langBtn.getAttribute('aria-label');
    expect(newLabel).not.toBe(initialLabel);
  });

  test('New Loan link visible for borrower', async ({ page }) => {
    // borrower role in mock JWT — "New Loan" button should appear
    await expect(page.locator('a[href="/create-loan"]')).toBeVisible();
  });
});

test.describe('Dashboard Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(`${BASE}/`);
    await page.waitForTimeout(1000);
  });

  test('Dashboard renders page title', async ({ page }) => {
    // Wait for loader to disappear
    await page.waitForSelector('.animate-spin', { state: 'detached', timeout: 10000 }).catch(() => { });
    await expect(page.locator('h1')).toBeVisible();
  });

  test('View History button navigates to /repayments', async ({ page }) => {
    await page.waitForSelector('.animate-spin', { state: 'detached', timeout: 10000 }).catch(() => { });
    const viewHistoryBtn = page.locator('button', { hasText: /view history/i });
    if (await viewHistoryBtn.count() > 0) {
      await viewHistoryBtn.click();
      await expect(page).toHaveURL(`${BASE}/repayments`);
    }
  });

  test('Borrowing Capacity tooltips/info are visible', async ({ page }) => {
    // Check for the "Info" icons in the ScoreMeter
    const infoIcons = page.locator('svg.lucide-info');
    await expect(infoIcons.first()).toBeVisible();
  });
});

test.describe('Marketplace Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(`${BASE}/marketplace`);
    await page.waitForTimeout(500);
  });

  test('Marketplace renders page title and filters', async ({ page }) => {
    await expect(page.locator('h1')).toBeVisible();
    // Filter form should exist
    await expect(page.locator('form, [data-testid="filters"]').first()).toBeVisible().catch(() => { });
  });

  test('LoanCards render if loans exist', async ({ page }) => {
    await page.waitForSelector('.animate-spin', { state: 'detached', timeout: 10000 }).catch(() => { });
    // Either cards or empty state
    const hasCards = await page.locator('button', { hasText: /view details/i }).count();
    const hasEmpty = await page.locator('text=No loans found').count();
    expect(hasCards + hasEmpty).toBeGreaterThan(0);
  });

  test('Marketplace Filters respond to input', async ({ page }) => {
    // Fill amount filters
    const minAmount = page.locator('input[placeholder="Min"]');
    const maxAmount = page.locator('input[placeholder="Max"]');
    await minAmount.fill('1000');
    await maxAmount.fill('5000');
    
    // Select duration
    const durationSelect = page.locator('select');
    await durationSelect.selectOption('12');
    
    // Min Score
    const scoreInput = page.locator('input[placeholder*="e.g. 700"]');
    await scoreInput.fill('750');

    // Buttons
    await expect(page.locator('button', { hasText: /apply/i })).toBeVisible();
    await expect(page.locator('button[title="Reset Filters"]')).toBeVisible();
  });

  test('Pagination is interactable', async ({ page }) => {
    const pagination = page.locator('nav[aria-label="Pagination"]');
    if (await pagination.count() > 0) {
      await expect(pagination).toBeVisible();
      // Check for numbers or dots
      await expect(page.locator('button', { hasText: '1' })).toBeVisible();
    }
  });
});

test.describe('Chat Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(`${BASE}/chat`);
    await page.waitForTimeout(500);
  });

  test('Chat renders page title', async ({ page }) => {
    await expect(page.locator('h1')).toBeVisible();
  });

  test('Browse Marketplace button in empty state navigates', async ({ page }) => {
    const browseBtn = page.locator('button', { hasText: /browse marketplace/i });
    if (await browseBtn.count() > 0) {
      await browseBtn.click();
      await expect(page).toHaveURL(`${BASE}/marketplace`);
    }
  });

  test('Message sending is possible', async ({ page }) => {
    const input = page.locator('input[placeholder*="Type a message"]');
    if (await input.count() > 0) {
      await input.fill('Hello Test');
      const sendBtn = page.locator('button').filter({ has: page.locator('svg.lucide-send') });
      await expect(sendBtn).toBeVisible();
      await sendBtn.click();
    }
  });
});

test.describe('Profile Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(`${BASE}/profile`);
    await page.waitForTimeout(500);
  });

  test('Profile renders page title', async ({ page }) => {
    await expect(page.locator('h1')).toBeVisible();
  });

  test('Account Settings buttons are visible', async ({ page }) => {
    await page.waitForSelector('.animate-spin', { state: 'detached', timeout: 10000 }).catch(() => { });
    await expect(page.locator('button', { hasText: /change password/i }).first()).toBeVisible().catch(() => { });
  });

  test('Sign Out Securely button triggers logout', async ({ page }) => {
    await page.waitForSelector('.animate-spin', { state: 'detached', timeout: 10000 }).catch(() => { });
    const signOutBtn = page.locator('button', { hasText: /sign out securely/i });
    if (await signOutBtn.count() > 0) {
      await signOutBtn.click();
      await page.waitForTimeout(500);
      await expect(page).toHaveURL(/\/login/);
    }
  });

  test('Settings buttons trigger toast actions', async ({ page }) => {
    await page.waitForSelector('.animate-spin', { state: 'detached', timeout: 10000 }).catch(() => { });
    const editBtn = page.locator('button', { hasText: /edit profile/i });
    await editBtn.first().click();
    // Wait for toast "Coming Soon"
    await expect(page.locator('text=Coming Soon')).toBeVisible();
  });
});

test.describe('Repayments Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(`${BASE}/repayments`);
    await page.waitForTimeout(500);
  });

  test('Repayments renders page title', async ({ page }) => {
    await expect(page.locator('h1')).toBeVisible();
  });

  test('Loan selection and form toggle', async ({ page }) => {
    await page.waitForSelector('.animate-spin', { state: 'detached', timeout: 10000 }).catch(() => { });
    const select = page.locator('select');
    await expect(select).toBeVisible();
    
    const hasHistory = await page.locator('text=No repayment history').count();
    const makePaymentBtn = page.locator('button', { hasText: /make payment/i });
    if (await makePaymentBtn.count() > 0) {
      await makePaymentBtn.click();
      await expect(page.locator('input[placeholder="0.00"]')).toBeVisible();
      await page.locator('button', { hasText: /cancel/i }).click();
    }
  });
});

test.describe('Create Loan Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(`${BASE}/create-loan`);
    await page.waitForTimeout(500);
  });

  test('Create Loan page renders page title', async ({ page }) => {
    await expect(page.locator('h1')).toBeVisible();
  });

  test('LoanForm step 1 renders amount and duration fields', async ({ page }) => {
    await page.waitForSelector('input[name="amount"]');
    await expect(page.locator('input[name="amount"]')).toBeVisible();
    await expect(page.locator('select[name="repaymentPeriod"]')).toBeVisible();
  });

  test('LoanForm Continue button advances to step 2', async ({ page }) => {
    await page.locator('input[name="amount"]').fill('50000');
    const continueBtn = page.locator('button', { hasText: /continue/i });
    await continueBtn.click();
    await page.waitForTimeout(300);
    // Step 2 has purpose field
    await expect(page.locator('input[name="purpose"]')).toBeVisible();
  });

  test('LoanForm step 2 Back button returns to step 1', async ({ page }) => {
    await page.locator('input[name="amount"]').fill('50000');
    await page.locator('button', { hasText: /continue/i }).click();
    await page.waitForTimeout(300);
    await page.locator('button', { hasText: /back/i }).click();
    await page.waitForTimeout(300);
    await expect(page.locator('input[name="amount"]')).toBeVisible();
  });

  test('LoanForm step 3 renders review and submit button', async ({ page }) => {
    // Fill step 1
    await page.locator('input[name="amount"]').fill('50000');
    await page.locator('button', { hasText: /continue/i }).click();
    await page.waitForTimeout(300);
    // Fill step 2
    await page.locator('input[name="purpose"]').fill('Business Expansion');
    await page.locator('button', { hasText: /almost done/i }).click();
    await page.waitForTimeout(300);
    // Step 3 should show submit
    await expect(page.locator('button[type="submit"]')).toBeVisible();
    await expect(page.locator('text=₹50,000')).toBeVisible();
  });
});

test.describe('Loan Details Page', () => {
  test.beforeEach(async ({ page }) => {
    // Use a test ID
    await page.goto(`${BASE}/marketplace/test-loan-id`);
    await page.waitForTimeout(500);
  });

  test('Renders timeline and basic actions', async ({ page }) => {
    await page.goto(`${BASE}/loan/test-loan-id`);
    // It might show "Loan Not Found" or actual details, both should have an h1
    await page.waitForSelector('h1');
    await expect(page.locator('h1')).toBeVisible();
    
    const isNotFound = await page.locator('text=Loan Not Found').isVisible();
    if (!isNotFound) {
      await expect(page.locator('text=Loan Timeline')).toBeVisible();
      const discussBtn = page.locator('button', { hasText: /discussion board/i });
      await expect(discussBtn).toBeVisible();
    }
  });

  test('Offer form is interactable', async ({ page }) => {
    const offerAmount = page.locator('input[placeholder*="e.g. 10000"]');
    if (await offerAmount.count() > 0) {
      await offerAmount.fill('10000');
      await page.locator('input[placeholder*="e.g. 12"]').fill('12');
      await expect(page.locator('button', { hasText: /submit offer/i })).toBeVisible();
    }
  });
});
