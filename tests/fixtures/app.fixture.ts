/* eslint-disable react-hooks/rules-of-hooks */
import {test as base} from '@playwright/test'
import { HomePage } from '../pom/pages/HomePage';
import { AuthModal } from '../pom/pages/AuthModal';
import { OrdersPage } from '../pom/pages/OrdersPage';
import path from 'path';
import { CheckoutPage } from '../pom/pages/CheckoutPage';
import { CartPage } from '../pom/pages/CartPage';


export const authFile = path.join(process.cwd(), 'playwright/.auth/existing-user.json');

type MyFixtures = {
    homePage: HomePage;
    authPage: AuthModal;
    checkoutPage: CheckoutPage;
    ordersPage: OrdersPage;
    cartPage: CartPage;
}

type AppOptions = {
    storageState: string | undefined;
}

const appTest = base.extend<MyFixtures>({
    homePage: async ({page}, use) => {
        const homePage = new HomePage(page);
        await use(homePage);
    },

    authPage: async ({page}, use) => {
        const authPage = new AuthModal(page);
        await use(authPage);
    },

    checkoutPage: async ({page}, use) => {
        const checkoutPage = new CheckoutPage(page);
        await use(checkoutPage);
    },

    ordersPage: async ({page}, use) => {
        const orderPage = new OrdersPage(page);
        await use(orderPage);
    },

    cartPage: async ({page}, use) => {
        const cartPage = new CartPage(page);
        await use(cartPage);
    }
});

export const guestTest = appTest;
export const authorizedTest = appTest.extend<AppOptions>({
    storageState: authFile,
});