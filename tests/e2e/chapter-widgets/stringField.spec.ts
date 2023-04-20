import { test, expect } from '@playwright/test';
import { objectModel } from '@/helpers/mocks';

test.beforeEach(async ({ page }) => {
  await page.goto('/src-draft-stringfield-story-vue');
  await page.getByRole('link', { name: 'String Field 4' }).click();
});
test.afterEach(async ({ page }) => {
  await page.close();
});

test.describe('String Field', () => {
  test('should show input field from model', async ({ page }) => {
    await page.getByRole('link', { name: 'With model' }).click();
    await expect(
      page
        .frameLocator('[data-test-id="preview-iframe"]')
        .getByText('Name', { exact: true }),
    ).toBeVisible();
    await expect(
      page.frameLocator('[data-test-id="preview-iframe"]').getByRole('textbox'),
    ).toHaveValue(objectModel.name);
  });

  test('should show error message', async ({ page }) => {
    await page.getByRole('link', { name: 'Error' }).click();
    await expect(
      page
        .frameLocator('[data-test-id="preview-iframe"]')
        .getByText('Name', { exact: true }),
    ).toBeVisible();
    await expect(
      page.frameLocator('[data-test-id="preview-iframe"]').getByRole('textbox'),
    ).toHaveValue(objectModel.name);
    await expect(
      page
        .frameLocator('[data-test-id="preview-iframe"]')
        .getByText('This field cannot be empty'),
    ).toBeVisible();
  });
});
