import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('/src-draft-numberfield-story-vue');
  await page.getByRole('link', { name: 'Number Field 6' }).click();
});
test.afterEach(async ({ page }) => {
  await page.close();
});

test.describe('Number Field', () => {
  test('should have model value', async ({ page }) => {
    await page.getByRole('link', { name: 'With model' }).click();

    const locator = page
      .frameLocator('[data-test-id="preview-iframe"]')
      .getByRole('spinbutton');

    await expect(locator).toBeVisible();
    await expect(locator).toHaveValue('20');
    await locator.press('ArrowUp');
    await locator.press('ArrowUp');
    await expect(locator).toHaveValue('22');
    await locator.press('ArrowDown');
    await expect(locator).toHaveValue('21');
    await locator.fill('203');
    await expect(locator).not.toHaveValue('21');
    await expect(locator).toHaveValue('203');
  });

  test('should have empty value', async ({ page }) => {
    await page.getByRole('link', { name: 'Empty' }).click();

    const locator = page
      .frameLocator('[data-test-id="preview-iframe"]')
      .getByRole('spinbutton');

    await expect(locator).toBeVisible();
    await expect(locator).not.toHaveValue('20');
    await locator.press('ArrowUp');
    await locator.press('ArrowUp');
    await expect(locator).toHaveValue('2');
    await locator.press('ArrowDown');
    await expect(locator).toHaveValue('1');
    await locator.fill('203');
    await expect(locator).not.toHaveValue('21');
    await expect(locator).toHaveValue('203');
  });
  test('should show error message', async ({ page }) => {
    await page.getByRole('link', { name: 'Error' }).click();

    const locator = page
      .frameLocator('[data-test-id="preview-iframe"]')
      .getByRole('spinbutton');

    await expect(locator).toBeVisible();
    await expect(
      page
        .frameLocator('[data-test-id="preview-iframe"]')
        .getByText('Please enter a number'),
    ).toBeVisible();
  });
});
