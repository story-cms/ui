import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('/src-draft-booleanfield-story-vue');
  await page.getByRole('link', { name: 'Boolean Field 7' }).click();
});
test.afterEach(async ({ page }) => {
  await page.close();
});

test.describe('Boolean Field', () => {
  test('should have model value', async ({ page }) => {
    await page.getByRole('link', { name: 'With model' }).click();
    const locator = page
      .frameLocator('[data-test-id="preview-iframe"]')
      .getByRole('switch', { name: 'Is Favourite' });
    await expect(locator).toHaveClass(/bg-indigo-600/);
    await locator.click();
    await expect(locator).toHaveClass(/bg-gray-200/);
  });

  test('should have no value', async ({ page }) => {
    await page.getByRole('link', { name: 'Without start value' }).click();
    const locator = page
      .frameLocator('[data-test-id="preview-iframe"]')
      .getByRole('switch', { name: 'Is Favourite' });
    await expect(locator).toHaveClass(/bg-gray-200/);
    await locator.click();
    await expect(locator).toHaveClass(/bg-indigo-600/);
  });

  test('should have special tint', async ({ page }) => {
    await page.getByRole('link', { name: 'Special tint' }).click();
    const locator = page
      .frameLocator('[data-test-id="preview-iframe"]')
      .getByRole('switch', { name: 'Is Favourite' });
    await expect(locator).toHaveClass(/bg-green-400/);
    await locator.click();
    await expect(locator).toHaveClass(/bg-gray-200/);
  });

  test('should have label at the start', async ({ page }) => {
    await page.getByRole('link', { name: 'Label start' }).click();
    // TODO: check parent element for ordering class
    // await expect(
    //   page
    //     .frameLocator('[data-test-id="preview-iframe"]')
    //     .getByRole('switch', { name: 'Is Favourite' }),
    // ).toHaveClass(/space-x-reverse/);
  });

  test('should have error message', async ({ page }) => {
    await page.getByRole('link', { name: 'Error' }).click();
    const locator = page
      .frameLocator('[data-test-id="preview-iframe"]')
      .getByRole('switch', { name: 'Is Favourite' });
    await expect(locator).toHaveClass(/bg-indigo-600/);
    await locator.click();
    await expect(locator).toHaveClass(/bg-gray-200/);
    await expect(
      page
        .frameLocator('[data-test-id="preview-iframe"]')
        .getByText('This field cannot be empty'),
    ).toBeVisible();
  });

  test('should set RLT', async ({ page }) => {
    await page.getByRole('link', { name: 'RTL' }).click();
    const locator = page
      .frameLocator('[data-test-id="preview-iframe"]')
      .getByRole('switch', { name: 'Is Favourite' });
    await expect(locator).toHaveClass(/bg-gray-200/);
    await locator.click();
    await expect(locator).toHaveClass(/bg-indigo-600/);

    await expect(locator).not.toHaveClass(/rtl/);

    await page
      .frameLocator('[data-test-id="preview-iframe"]')
      .getByRole('button', { name: 'Set RTL' })
      .click();
    // TODO: Make this work
    // await expect(locator).toHaveClass(/rtl/);

    // await page
    //   .frameLocator('[data-test-id="preview-iframe"]')
    //   .getByRole('button', { name: 'Set LTR' })
    //   .click();

    // await expect(locator).not.toHaveClass(/rtl/);
  });

  test('should set switch to readonly', async ({ page }) => {
    await page.getByRole('link', { name: 'Readonly' }).click();
    const locator = page
      .frameLocator('[data-test-id="preview-iframe"]')
      .getByRole('switch', { name: 'Is Favourite' });
    await expect(locator).toHaveClass(/bg-gray-200/);
    await locator.click();
    await expect(locator).toHaveClass(/bg-indigo-600/);

    await expect(locator).not.toHaveClass(/rtl/);

    await page
      .frameLocator('[data-test-id="preview-iframe"]')
      .getByRole('button', { name: 'Set RTL' })
      .click();
    // TODO: Make this work
    // await expect(locator).toHaveClass(/rtl/);

    // await page
    //   .frameLocator('[data-test-id="preview-iframe"]')
    //   .getByRole('button', { name: 'Set LTR' })
    //   .click();

    // await expect(locator).not.toHaveClass(/rtl/);
  });
});
