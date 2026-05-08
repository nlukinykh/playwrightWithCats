import { expect, type Page } from "playwright/test";
import { CatsApi } from "../api/mockApi/CatsApi";
import { CartApi } from "../api/mockApi/CartApi";

export class HomePage {
  constructor(private page: Page) {
    this.page = page;
  }

  async open() {
    await this.page.goto("/");
  }

  async setupApiEmptyCart() {
    const catApi = new CatsApi(this.page);
    const cartApi = new CartApi(this.page);

    await cartApi.setEmptyCart();
    await catApi.setCatsItems();
  }

  async setupApiCartWithItem() {
    const catApi = new CatsApi(this.page);
    const cartApi = new CartApi(this.page);

    await cartApi.setCartWithOneItem();
    await catApi.setCatsItems();
  }

  private getModalLocator() {
    return this.page.getByTestId("modal");
  }

  async addFirstCatToCart() {
    await this.openItemDetailModal();

    await this.page.getByTestId("catModalAddToCartButton").click();
    await this.page
      .getByTestId("catModalAddToCartButton")
      .waitFor({ state: "detached" });

    //await expect(this.page.getByTestId("openCartButton")).toContainText(/\(\d+\)/);
  }

  async openItemDetailModal() {
    await this.page
      .getByTestId("catCard_0")
      .getByTestId("addToCardButton")
      .click();
  }

  async openCart() {
    await this.page.getByTestId("openCartButton").click();
  }

  async goToCartPage() {
    await this.page.getByTestId("goToCartPageButton").click();
  }

  async goToCheckoutFromCart() {
    await this.openCart();
    await this.goToCartPage();
    await this.page.getByTestId("makeOrderButton").click();
  }

  async assertLoaded() {
    await expect(this.page).toHaveURL("/");
    await expect(this.page.getByTestId("homePageHeader")).toBeVisible();
  }

  async assertCardsVisible() {
    const cards = this.page.getByTestId(/catCard/);
    await expect(cards.first()).toBeVisible();
    await expect(cards).toHaveCount(9);
  }

  async assertCartBadgeCount(count: number) {
    await expect(this.page.getByTestId("openCartButton")).toContainText(
      `(${count})`,
    );
  }

  async assertCartPageOpened() {
    await expect(this.page).toHaveURL(/\/cart$/);
    await expect(
      this.page.getByRole("heading", { name: "Корзина" }),
    ).toBeVisible();
  }

  async assertCorrectPageViewWithItems() {
    await expect(this.page).toHaveScreenshot("homePageWithItems.png");
  }

  async assertCorrectPageViewWithOpenDetailModal() {
    await expect(this.getModalLocator()).toHaveScreenshot(
      "detailItemModal.png",
    );
  }

  async assertCorrectPageViewWithOpenCartEmptyDrawer() {
    await expect(this.getModalLocator()).toHaveScreenshot(
      "cartEmptyDrawer.png",
    );
  }

  async assertCorrectPageViewWithOpenCartDrawerWithOneItem() {
    await expect(this.getModalLocator()).toHaveScreenshot(
      "cartDrawerWithOneItem.png",
    );
  }
}
