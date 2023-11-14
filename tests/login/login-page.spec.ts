import { test, expect } from "../../src/fixtures/login-page-fixture";
import { faker } from "@faker-js/faker";
import pageUrls from "../../src/utils/page-urls";

const adminUsername: string | undefined = process.env.ADMIN_USERNAME;
const adminPassword: string | undefined = process.env.ADMIN_PASSWORD;

test.use({ storageState: { cookies: [], origins: [] } });

test.beforeEach(async ({ page }) => {
  await page.goto(pageUrls.login);
});

test.describe("Login page tests", () => {
  test("UI elements visibility", async ({ loginPage }) => {
    await expect(
      loginPage.loginHeading,
      "The header should be visible"
    ).toBeVisible();
    await expect(
      loginPage.usernameInput,
      'The "Your Username/Email" input field should be visible'
    ).toBeVisible();
    await expect(
      loginPage.passwordInput,
      'The "Your password" input field should be visible'
    ).toBeVisible();
    await expect(
      loginPage.submitButton,
      'The "SUBMIT" button should be visible'
    ).toBeVisible();

    await expect(
      loginPage.page,
      "The visual changes are founded"
    ).toHaveScreenshot();
  });

  // The "Your Username/Email" input field tests

  test("LU-LOGIN-1 - The username input placeholder wording", async ({
    loginPage,
  }) => {
    await expect(
      loginPage.usernameInputLabel,
      'The "Your Username/Email" placeholder should be shown'
    ).toHaveText("Your Username/Email");
  });

  test("LU-LOGIN-3 - Set the caret in the username input field", async ({
    loginPage,
  }) => {
    await loginPage.usernameInput.click();

    await expect(
      loginPage.usernameInputLabel,
      'The "Your Username/Email" should be highlighted'
    ).toHaveClass(/Mui-focused/);
  });

  test("LU-LOGIN-4 - Insert 0-4 symbols in to the username input field and click the 'Submit' button.", async ({
    loginPage,
  }) => {
    await loginPage.typeUsername(
      faker.string.alphanumeric({ length: { min: 0, max: 4 } })
    );
    await loginPage.clickSubmitButton();

    await expect(
      loginPage.usernameMinimumCharactersError,
      'The "Minimum 5 characters" error message should be visible'
    ).toBeVisible();
  });

  test("LU-LOGIN-5 - Insert special characters and click the 'Submit' button.", async ({
    loginPage,
  }) => {
    await loginPage.typeUsername(faker.string.symbol({ min: 1, max: 10 }));
    await loginPage.clickSubmitButton();

    await expect(
      loginPage.notAValidUsernameError,
      'The "Not a valid username or email" error message should be visible'
    ).toBeVisible();
  });

  test("LU-LOGIN-6 - Click the 'Submit' button with no input", async ({
    loginPage,
  }) => {
    await loginPage.clickSubmitButton();

    await expect(
      loginPage.usernameMinimumCharactersError,
      'The "Minimum 5 characters" error message should be visible'
    ).toBeVisible();
  });

  // The "Your password" input field tests

  test("LU-LOGIN-7 - The password input placeholder wording", async ({
    loginPage,
  }) => {
    await expect(
      loginPage.passwordInputLabel,
      'The "Your password" placeholder should be shown'
    ).toHaveText("Your password");
  });

  test("LU-LOGIN-9 - Set the caret in the password input field", async ({
    loginPage,
  }) => {
    await loginPage.passwordInput.click();

    await expect(
      loginPage.passwordInputLabel,
      'The "Your password" should be highlighted'
    ).toHaveClass(/Mui-focused/);
  });

  test("LU-LOGIN-10 - Insert 1-3 symbols in to the password input field and click the 'Submit' button.", async ({
    loginPage,
  }) => {
    await loginPage.typePassword(
      faker.string.alphanumeric({ length: { min: 1, max: 3 } })
    );
    await loginPage.clickSubmitButton();

    await expect(
      loginPage.passwordMinimumCharactersError,
      'The "Min 4 symbols" error message should be visible'
    ).toBeVisible();
  });

  test("LU-LOGIN-11 - Click the 'Submit' button with no input", async ({
    loginPage,
  }) => {
    await loginPage.clickSubmitButton();

    await expect(
      loginPage.passwordRequiredFieldError,
      'The "Required field" error message should be visible'
    ).toBeVisible();
  });

  // The login actions tests

  test("LU-LOGIN-14 - Login action", async ({ loginPage }) => {
    await loginPage.doLogin(adminUsername, adminPassword, pageUrls.home);
  });

  test("LU-LOGIN-16 - Login with unmatched password", async ({ loginPage }) => {
    await loginPage.doLogin(
      adminUsername,
      faker.string.alphanumeric({ length: { min: 4, max: 8 } }),
      pageUrls.login
    );

    await expect(
      loginPage.alertMessage,
      'The "Sorry, provided username or email does not exist in the system." error message should be shown'
    ).toBeVisible();

    await expect(
      loginPage.alertMessage,
      "The error message wording doesn't match to the requirements"
    ).toHaveText("Password is in-correct please try again?");
  });

  test("LU-LOGIN-19 - Login with valid but unregistered credentials", async ({
    loginPage,
    page,
  }) => {
    await loginPage.doLogin(
      faker.internet.email(),
      faker.internet.password({ length: 5 }),
      pageUrls.login
    );

    await expect(
      loginPage.alertMessage,
      'The "Sorry, provided username or email does not exist in the system." error message should be shown'
    ).toBeVisible();

    await expect(
      loginPage.alertMessage,
      "The error message wording doesn't match to the requirements"
    ).toHaveText(
      "Sorry, provided username or email does not exist in the system."
    );

    await expect(page, "The visual changes are founded").toHaveScreenshot({
      mask: [loginPage.usernameInput, loginPage.passwordInput],
    });
  });

  test("LU-LOGIN-22 - Login with no input", async ({ page, loginPage }) => {
    await loginPage.clickSubmitButton();

    await expect(loginPage.usernameInput).toHaveAttribute(
      "aria-invalid",
      "true"
    );
    await expect(
      loginPage.usernameMinimumCharactersError,
      'The "Minimum 5 characters" error message should be visible'
    ).toBeVisible();

    await expect(loginPage.passwordInput).toHaveAttribute(
      "aria-invalid",
      "true"
    );
    await expect(
      loginPage.passwordRequiredFieldError,
      'The "Required field" error message should be visible'
    ).toBeVisible();

    await expect(page, "The visual changes are founded").toHaveScreenshot();
  });
});
