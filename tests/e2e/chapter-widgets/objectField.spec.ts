import { test, expect } from '@playwright/test';
import {
  objectSpec,
  objectModel,
  listInObjectSpec,
  listInObjectModel,
} from '@/helpers/mocks';

test.beforeEach(async ({ page }) => {
  await page.goto('/src-draft-objectfield-story-vue');
  await page.getByRole('link', { name: 'ObjectField 9' }).click();
});
test.afterEach(async ({ page }) => {
  await page.close();
});

test.describe('Object Field', () => {
  test('should show default fields', async ({ page }) => {
    await page.getByRole('link', { name: 'Default' }).click();

    for (const item of objectSpec.fields) {
      if (item.widget === 'string') {
        await expect(
          page
            .frameLocator('[data-test-id="preview-iframe"]')
            .locator(`input[name=${item.label}]`),
        ).toHaveValue(objectModel.address[item.name]);
      }
      if (item.widget === 'scripture') {
        await expect(
          page
            .frameLocator('[data-test-id="preview-iframe"]')
            .getByPlaceholder('John 1 or John 1:3-4'),
        ).toHaveValue(objectModel.address.favoriteScripture.reference);
        await expect(
          page.frameLocator('[data-test-id="preview-iframe"]').getByPlaceholder('Verse'),
        ).toHaveValue(objectModel.address.favoriteScripture.verse);
      }
    }
  });
  test('should make fields readonly', async ({ page }) => {
    await page.getByRole('link', { name: 'Readonly' }).click();

    for (const item of objectSpec.fields) {
      if (item.widget === 'string') {
        await expect(
          page
            .frameLocator('[data-test-id="preview-iframe"]')
            .locator(`input[name=${item.label}]`),
        ).toHaveValue(objectModel.address[item.name]);
        await expect(
          page
            .frameLocator('[data-test-id="preview-iframe"]')
            .locator(`input[name=${item.label}]`),
        ).toHaveAttribute('readonly', '');
      }
      if (item.widget === 'scripture') {
        await expect(
          page
            .frameLocator('[data-test-id="preview-iframe"]')
            .getByPlaceholder('John 1 or John 1:3-4'),
        ).toHaveValue(objectModel.address.favoriteScripture.reference);
        await expect(
          page.frameLocator('[data-test-id="preview-iframe"]').getByPlaceholder('Verse'),
        ).toHaveValue(objectModel.address.favoriteScripture.verse);
        await expect(
          page
            .frameLocator('[data-test-id="preview-iframe"]')
            .getByPlaceholder('John 1 or John 1:3-4'),
        ).toHaveAttribute('readonly', '');
        await expect(
          page.frameLocator('[data-test-id="preview-iframe"]').getByPlaceholder('Verse'),
        ).toHaveAttribute('readonly', '');
      }
    }
  });
  test('should show error message', async ({ page }) => {
    await page.getByRole('link', { name: 'Error', exact: true }).click();

    await expect(
      page
        .frameLocator('[data-test-id="preview-iframe"]')
        .getByText('required validation failed'),
    ).toBeVisible();
  });
  test('should list in object @test', async ({ page }) => {
    await page.getByRole('link', { name: 'List in Object', exact: true }).click();
    for (const item of listInObjectSpec.fields as any) {
      if (item.widget === 'string') {
        await expect(
          page
            .frameLocator('[data-test-id="preview-iframe"]')
            .locator(`input[name='${item.label}']`),
        ).toHaveValue(listInObjectModel.spread.scriptureReference);
      }

      if (item.widget === 'list') {
        const listLocator = page
          .frameLocator('[data-test-id="preview-iframe"]')
          .getByRole('listitem');

        const count = await listLocator.count();
        expect(count).toEqual(listInObjectModel.spread.notes.length);

        for (const field of listInObjectSpec.fields as any) {
          if (field.widget === 'list') {
            for (const item of field.fields) {
              if (item.widget === 'string') {
                await expect(
                  listLocator
                    .filter({
                      hasText: 'Frame typeFrame content|xxxxxxxxxx `grace` is a noun.',
                    })
                    .locator(`input[name='${item.label}']`),
                ).toHaveValue(listInObjectModel.spread.notes[0].type);
                await expect(
                  listLocator
                    .filter({
                      hasText:
                        'Frame typeFrame content|xxxxxxxxxx paragraph **1**paragraph **2**paragraph **3**',
                    })
                    .locator(`input[name='${item.label}']`),
                ).toHaveValue(listInObjectModel.spread.notes[1].type);
              }
              if (item.widget === 'markdown') {
                await expect(
                  listLocator.getByText('`grace` is a noun.', { exact: true }),
                ).toBeVisible();
                await expect(
                  listLocator.getByText('paragraph **1**', { exact: true }),
                ).toBeVisible();
                await expect(
                  listLocator.getByText('paragraph **2**', { exact: true }),
                ).toBeVisible();
                await expect(
                  listLocator.getByText('paragraph **3**', { exact: true }),
                ).toBeVisible();
              }
            }
          }
        }
      }
    }
  });
});
