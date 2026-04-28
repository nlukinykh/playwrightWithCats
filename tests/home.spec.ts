import { test, expect } from '@playwright/test';

test('Check header', async ({ page }) => {
  await page.goto('');
  // const header = page.getByRole('heading', {name: 'Заказ котиков'});
  const header = page.getByTestId('homePageHeader');
  await expect(header).toBeVisible();
 });
