import { Page, Locator, expect } from "@playwright/test";
import pageUrl from "../../utils/page-urls";

export class LoginPage {
  readonly loginHeading: Locator;
  readonly usernameInput: Locator;
  readonly usernameInputLabel: Locator;
  readonly passwordInput: Locator;
  readonly passwordInputLabel: Locator;
  readonly submitButton: Locator;
  readonly usernameMinimumCharactersError: Locator;
  readonly notAValidUsernameError: Locator;
  readonly passwordMinimumCharactersError: Locator;
  readonly passwordRequiredFieldError: Locator;
  readonly alertMessage: Locator;

  constructor(public readonly page: Page) {
    this.loginHeading = page.getByRole("heading", { name: "Login" });
    this.usernameInput = page.getByLabel("Your Username/Email");
    this.usernameInputLabel = page.locator(
      "//label[text()='Your Username/Email']"
    );
    this.passwordInput = page.getByLabel("Your Password");
    this.passwordInputLabel = page.locator("//label[text()='Your password']");
    this.submitButton = page.getByRole("button", { name: "Submit" });
    this.usernameMinimumCharactersError = page.getByText(
      "Minimum 5 characters"
    );
    this.notAValidUsernameError = page.getByLabel("Your Username/Email");
    this.passwordMinimumCharactersError = page.getByText("Min 4 symbols");
    this.passwordRequiredFieldError = page.getByText("Required field");
    this.alertMessage = page.getByRole("alert");
  }

  async typeUsername(username: string): Promise<void> {
    await this.usernameInput.fill(username);
    await expect(
      this.usernameInput,
      "The username should be inputted"
    ).toHaveValue(username);
  }

  async typePassword(password: string): Promise<void> {
    await this.passwordInput.fill(password);
    await expect(
      this.passwordInput,
      "The password should be inputted"
    ).toHaveValue(password);
  }

  async clickSubmitButton(): Promise<void> {
    await this.submitButton.click();
  }

  async doLogin(
    username: string,
    password: string,
    resultPage: string
  ): Promise<void> {
    await this.typeUsername(username);
    await this.typePassword(password);
    await this.clickSubmitButton();
    await expect(this.page, "The wrong page was opened").toHaveURL(resultPage);
  }

  async doLoginAsAdmin(): Promise<void> {
    await this.typeUsername(process.env.ADMIN_USERNAME || "");
    await this.typePassword(process.env.ADMIN_PASSWORD || "");
    await this.clickSubmitButton();
    await expect(this.page, "The wrong page was opened").toHaveURL(
      pageUrl.home
    );
  }
}
