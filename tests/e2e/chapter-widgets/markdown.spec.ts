import { test, expect } from '@playwright/test';
// import { objectModel } from '@/helpers/mocks';

test.beforeEach(async ({ page }) => {
  await page.goto('/src-draft-markdownfield-story-vue');
  await page.getByRole('link', { name: 'Markdown Field 8' }).click();
});
test.afterEach(async ({ page }) => {
  await page.close();
});

test.describe('Markdown Field', () => {
  test('should show markdown field', async ({ page }) => {
    await page.getByRole('link', { name: 'With model' }).click();

    // await expect(
    //   page.frameLocator('[data-test-id="preview-iframe"]').locator('.CodeMirror'),
    // ).toContainText(objectModel.notes);

    await expect(
      page
        .frameLocator('[data-test-id="preview-iframe"]')
        .getByText('Notes', { exact: true }),
    ).toBeVisible();
  });

  test('should show markdown toolbar buttons', async ({ page }) => {
    await page.getByRole('link', { name: 'With custom toolbar buttons' }).click();

    await expect(
      page
        .frameLocator('[data-test-id="preview-iframe"]')
        .getByRole('button', { name: 'Bold' }),
    ).toBeVisible();
    await expect(
      page
        .frameLocator('[data-test-id="preview-iframe"]')
        .getByRole('button', { name: 'Italic' }),
    ).toBeVisible();
    await expect(
      page
        .frameLocator('[data-test-id="preview-iframe"]')
        .getByRole('button', { name: 'Heading' }),
    ).toBeVisible();
    await expect(
      page
        .frameLocator('[data-test-id="preview-iframe"]')
        .getByRole('button', { name: 'Footnote Button' }),
    ).toBeVisible();
  });
  test('should show error', async ({ page }) => {
    await page.getByRole('link', { name: 'Error' }).click();
    await expect(
      page
        .frameLocator('[data-test-id="preview-iframe"]')
        .getByText('This field cannot be empty'),
    ).toBeVisible();
  });

  test('should hide toolbar buttons', async ({ page }) => {
    await page.getByRole('link', { name: 'Without Toolbar buttons' }).click();
    await expect(
      page
        .frameLocator('[data-test-id="preview-iframe"]')
        .getByRole('button', { name: 'Bold' }),
    ).not.toBeVisible();
    await expect(
      page
        .frameLocator('[data-test-id="preview-iframe"]')
        .getByRole('button', { name: 'Italic' }),
    ).not.toBeVisible();
    await expect(
      page
        .frameLocator('[data-test-id="preview-iframe"]')
        .getByRole('button', { name: 'Heading' }),
    ).not.toBeVisible();
    await expect(
      page
        .frameLocator('[data-test-id="preview-iframe"]')
        .getByRole('button', { name: 'Footnote Button' }),
    ).not.toBeVisible();
  });

  test('should set RTL', async ({ page }) => {
    await page.getByRole('link', { name: 'RTL' }).click();

    // const locator = page
    //   .frameLocator('[data-test-id="preview-iframe"]')
    //   .locator('.CodeMirror-scroll');

    const locator = page
      .frameLocator('[data-test-id="preview-iframe"]')
      .getByText('Notes');

    await page
      .frameLocator('[data-test-id="preview-iframe"]')
      .getByRole('button', { name: 'Set RTL' })
      .click();

    await expect(locator).toHaveClass(/rtl/);
  });

  test('should be readonly', async ({ page }) => {
    await page.getByRole('link', { name: 'Readonly' }).click();

    // const locator = page
    //   .frameLocator('[data-test-id="preview-iframe"]')
    //   .locator('.CodeMirror');

    // const locator = page
    //   .frameLocator('[data-test-id="preview-iframe"]')
    //   .getByText('Notes');

    // await page
    //   .frameLocator('[data-test-id="preview-iframe"]')
    //   .getByRole('button', { name: 'Set RTL' })
    //   .click();

    // await expect(locator).toHaveAttribute('readonly', '');
  });
});
