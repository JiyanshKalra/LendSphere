/**
 * Lend Sphere E2E Tests — Auth Flow
 * Tests: Login page, Register page, protected route redirect
 */
import { test, expect } from '@playwright/test';

const BASE = 'http://localhost:5173';
const TEST_USER = { email: 'lender@test.com', password: 'Test1234!' };

test.describe('Authentication — Exhaustive Element Audit', () => {
  test('Login Page - All Interactive Elements', async ({ page }) => {
    await page.goto(`${BASE}/login`);
    
    // Title and subtext
    await expect(page.locator('h1')).toHaveText(/login/i);
    await expect(page.locator('.text-center p.text-gray-500').first()).toBeVisible();

    // Icons and decorations
    await expect(page.locator('.bg-teal-50')).toBeVisible(); // Icon container

    // Form Labels
    await expect(page.locator('label', { hasText: 'Email Address' })).toBeVisible();
    await expect(page.locator('label', { hasText: 'Password' })).toBeVisible();

    // Inputs
    const emailInput = page.locator('input[name="email"]');
    const passwordInput = page.locator('input[name="password"]');
    await expect(emailInput).toBeVisible();
    await expect(passwordInput).toBeVisible();
    
    // Interactions
    await emailInput.fill('test@example.com');
    await expect(emailInput).toHaveValue('test@example.com');
    await passwordInput.fill('password123');
    await expect(passwordInput).toHaveValue('password123');

    // Submit Button
    const submitBtn = page.locator('button[type="submit"]');
    await expect(submitBtn).toBeVisible();
    await expect(submitBtn).toBeEnabled();
    await expect(submitBtn).toHaveText(/sign in/i);

    // Navigation Links
    const registerLink = page.locator('a[href="/register"]');
    await expect(registerLink).toBeVisible();
    await expect(registerLink).toHaveText(/create one now/i);
  });

  test('Register Page - All Interactive Elements', async ({ page }) => {
    await page.goto(`${BASE}/register`);
    
    // Title and subtext
    await expect(page.locator('h1')).toHaveText(/register/i);
    await expect(page.locator('.text-center p.text-gray-500').first()).toBeVisible();

    // Form Labels
    await expect(page.locator('label', { hasText: 'Full Name' })).toBeVisible();
    await expect(page.locator('label', { hasText: 'I want to...' })).toBeVisible();
    await expect(page.locator('label', { hasText: 'Email Address' })).toBeVisible();
    await expect(page.locator('label', { hasText: 'Phone Number' })).toBeVisible();
    await expect(page.locator('label', { hasText: 'Secure Password' })).toBeVisible();

    // Inputs & Selects
    await expect(page.locator('input[name="name"]')).toBeVisible();
    await expect(page.locator('select[name="role"]')).toBeVisible();
    await expect(page.locator('input[name="email"]')).toBeVisible();
    await expect(page.locator('input[name="phoneNumber"]')).toBeVisible();
    await expect(page.locator('input[name="password"]')).toBeVisible();
    
    // Role matching
    const roleSelect = page.locator('select[name="role"]');
    await roleSelect.selectOption('lender');
    await expect(roleSelect).toHaveValue('lender');

    // Submit Button
    const submitBtn = page.locator('button[type="submit"]');
    await expect(submitBtn).toBeVisible();
    await expect(submitBtn).toHaveText(/create account/i);

    // Navigation Links
    const loginLink = page.locator('a[href="/login"]');
    await expect(loginLink).toBeVisible();
    await expect(loginLink).toHaveText(/sign in here/i);
  });

  test('Form Validation - Login', async ({ page }) => {
    await page.goto(`${BASE}/login`);
    await page.locator('button[type="submit"]').click();
    
    // Check for validation messages (SaaS UI style)
    await expect(page.locator('span.text-red-500').first()).toBeVisible();
  });

  test('Form Validation - Register', async ({ page }) => {
    await page.goto(`${BASE}/register`);
    await page.locator('button[type="submit"]').click();
    
    // Check for validation messages
    await expect(page.locator('span.text-red-500').first()).toBeVisible();
  });
});
