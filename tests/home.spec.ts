import { test, expect } from '@playwright/test';

test('Check header', async ({ page }) => {
  await page.goto('');
  // const header = page.getByRole('heading', {name: 'Заказ котиков'});
  const header = page.getByTestId('homePageHeader');
  await expect(header).toBeVisible();
 });

 test('Check card list items', async ({ page }) => {
  await page.goto('');
  const fisrtCard = page.getByTestId('catCard_0');
  const cardListItems = page.getByTestId(/catCard/)
  await expect(fisrtCard).toBeVisible();
 });
