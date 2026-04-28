// Authorization
// Regirstation
// Create order for authorizated user
// Create order for unauthorizated user

import test, { expect } from "@playwright/test";

test('test', async ({ page }) => {
  await page.goto('http://localhost:5173/');
  await page.getByTestId('signInButton').click();
  await page.getByLabel('Email:').fill('test@test.ru');
  await page.getByLabel('Пароль:').fill('Qwerty');
  await page.getByTestId('signInOrSignUpButton').click();

  expect(await page.getByTestId('signOutButton')).toBeVisible();
});


test('test2', async ({ page }) => {
  await page.goto('http://localhost:5173/');
  await page.getByTestId('signInButton').click();
  await page.getByTestId('registerButton').click();
  await page.getByLabel('Имя').fill('TEST');
  await page.getByLabel('Email').fill(`${Date.now()}_test@test.ru`);
  await page.getByLabel('Пароль:', { exact: true }).fill('Qwerty');
  await page.getByLabel('Повторите пароль:', {exact: true}).fill('Qwerty');
  await page.getByTestId('signInOrSignUpButton').click();

  await expect(await page.getByTestId('signOutButton')).toBeVisible();
});