import { test as base } from "@playwright/test";
import { LoginPage } from "../pages/login/login-page";
export const test = base.extend({
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
});
export { expect } from "@playwright/test";
