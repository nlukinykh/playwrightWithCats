import { test } from "../../fixtures/app.fixture";
import { CleanupApi } from "../api/CleanupApi";
import { testAddress, testUsers } from "../data/testData";

test.describe.serial("Orders", () => {
  test.beforeEach(async ({ request }) => {
    const cleanupApi = new CleanupApi(request);
    await cleanupApi.deleteOrdersByEmail(testUsers.existing.email);
  });

  test.afterEach(async ({ request }) => {
    const cleanupApi = new CleanupApi(request);
    await cleanupApi.deleteOrdersByEmail(testUsers.existing.email);
  });

  test("Make order with login in checkout", async ({ homePage, orderPage, checkoutPage }) => {
    await homePage.open();
    await homePage.addFirstCatToCart();
    await homePage.goToCheckoutFromCart();
    await checkoutPage.signInInCheckout(testUsers.existing.email, testUsers.existing.password);
    await checkoutPage.fillAddress(testAddress);
    await checkoutPage.submit();
    await orderPage.open();
    await orderPage.assertHasOrder();
  });

  test("Make order after login", async ({ homePage, orderPage, checkoutPage, authPage }) => {
    await homePage.open();
    await authPage.signIn(testUsers.existing.email, testUsers.existing.password);
    await homePage.addFirstCatToCart();
    await homePage.goToCheckoutFromCart();
    await checkoutPage.fillAddress(testAddress);
    await checkoutPage.submit();
    await orderPage.open();
    await orderPage.assertHasOrder();
  });
});
