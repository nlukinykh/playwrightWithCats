import test, { expect } from "@playwright/test";

const TEST_USER_EMAIL = "test@test.ru";
const TEST_USER_PASSWORD = "Qwerty";
const API_URL = "http://localhost:3001/api";

test.describe("Auth", () => {
  let createUserEmail: string | null = null;
  test.afterAll(async ({ request }) => {
    if (!createUserEmail) return;
    await request.delete(`${API_URL}/users/by-email`, {
      data: { email: createUserEmail },
    });

    createUserEmail = null;
  });

  test("Sign in", async ({ page }) => {
    await page.goto("http://localhost:5173/");
    await page.getByTestId("signInButton").click();
    await page.getByLabel("Email:").fill(TEST_USER_EMAIL);
    await page.getByLabel("Пароль:").fill(TEST_USER_PASSWORD);
    await page.getByTestId("signInOrSignUpButton").click();

    expect(await page.getByTestId("signOutButton")).toBeVisible();
  });

  test("Sign up", async ({ page }) => {
    createUserEmail = `${Date.now()}_test@test.ru`;

    await page.goto("http://localhost:5173/");
    await page.getByTestId("signInButton").click();
    await page.getByTestId("registerButton").click();
    await page.getByLabel("Имя").fill("TEST");
    await page.getByLabel("Email").fill(createUserEmail);
    await page.getByLabel("Пароль:", { exact: true }).fill(TEST_USER_PASSWORD);
    await page
      .getByLabel("Повторите пароль:", { exact: true })
      .fill(TEST_USER_PASSWORD);
    await page.getByTestId("signInOrSignUpButton").click();

    await expect(await page.getByTestId("signOutButton")).toBeVisible();
  });
});

test.describe("Orders", () => {
    test.describe.configure({mode: "serial"});
  test.beforeEach(async ({ request }) => {
    await request.delete(`${API_URL}/orders/by-email`, {
      data: { enail: TEST_USER_EMAIL },
    });
  });

  test.afterEach(async ({ request }) => {
    await request.delete(`${API_URL}/orders/by-email`, {
      data: { enail: TEST_USER_EMAIL },
    });
  });

  test("Make order with login", async ({ page }) => {
    await page.goto("http://localhost:5173/");
    await page.getByTestId("catCard_0").getByTestId("addToCardButton").click();
    await page.getByTestId("catModalAddToCartButton").click();
    await page.getByTestId("openCartButton").click();
    await page.getByTestId("goToCartPageButton").click();
    await page.getByTestId("makeOrderButton").click();
    await page.getByLabel("Email:").fill(TEST_USER_EMAIL);
    await page.getByLabel("Пароль:").fill(TEST_USER_PASSWORD);
    await page.getByTestId("signInOrSignUpButton").click();

    await page.getByLabel("Город").fill("Moscow");
    await page.getByLabel("Улица").fill("Central");
    await page.getByLabel("Дом").fill("1");
    await page.getByLabel("Квартира:").fill("1");
    await page.getByLabel("Комментарий курьеру").fill("Comment");
    await page.getByTestId("approveOrder").click();
    await expect(page.getByTestId("modalTitle")).toHaveText("Заказ оформлен");

    await page.getByTestId("closeSubmittedModalButton").click();
    await page.getByTestId("openOrderButton").click();
    await expect(
      await page.getByTestId("ordersList").getByRole("listitem").first(),
    ).toBeVisible();
  });

  test("Make order", async ({ page }) => {
    await page.goto("http://localhost:5173/");
    await page.getByTestId("signInButton").click();
    await page.getByLabel("Email:").fill(TEST_USER_EMAIL);
    await page.getByLabel("Пароль:").fill(TEST_USER_PASSWORD);
    await page.getByTestId("signInOrSignUpButton").click();

    expect(await page.getByTestId("signOutButton")).toBeVisible();

    await page.getByTestId("catCard_0").getByTestId("addToCardButton").click();
    await page.getByTestId("catModalAddToCartButton").click();
    await page.getByTestId("openCartButton").click();
    await page.getByTestId("goToCartPageButton").click();
    await page.getByTestId("makeOrderButton").click();

    await page.getByLabel("Город").fill("Moscow");
    await page.getByLabel("Улица").fill("Central");
    await page.getByLabel("Дом").fill("1");
    await page.getByLabel("Квартира:").fill("1");
    await page.getByLabel("Комментарий курьеру").fill("Comment");
    await page.getByTestId("approveOrder").click();
    await expect(page.getByTestId("modalTitle")).toHaveText("Заказ оформлен");

    await page.getByTestId("closeSubmittedModalButton").click();
    await page.getByTestId("openOrderButton").click();
    await expect(
      await page.getByTestId("ordersList").getByRole("listitem").first(),
    ).toBeVisible();
  });
});
