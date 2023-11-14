import { test as setup } from "../../src/fixtures/login-page-fixture";
import pageUrls from "../../src/utils/page-urls";

const authFile = "playwright/.auth/user.json";

setup("authenticate", async ({ loginPage, page }) => {
  await page.goto(pageUrls.login);
  await loginPage.doLoginAsAdmin();

  await page.context().storageState({ path: authFile });
});
