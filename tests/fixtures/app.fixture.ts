/* eslint-disable react-hooks/rules-of-hooks */
import {test as base} from '@playwright/test'
import { HomePage } from '../pom/pages/HomePage';
import { AuthModal } from '../pom/pages/AuthModal';
import { CheckoutPage } from '../pom/pages/CheckOutPage';
import { OrdersPage } from '../pom/pages/OrdersPage';

type MyFixtures = {
    homePage: HomePage;
    authPage: AuthModal;
    checkoutPage: CheckoutPage;
    ordersPage: OrdersPage;
}

export const test = base.extend<MyFixtures>({
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
    }
})