import { Page, Locator } from "playwright";

export class Header {
  readonly entireHeader: Locator;
  readonly accountIcon: Locator;
  readonly logOutButton: Locator;

  constructor(public readonly page: Page) {
    this.entireHeader = page.locator("//div[@class='css-1o0y1dn']");
    this.accountIcon = page.getByLabel("Open settings");
    this.logOutButton = page.getByRole("menuitem", { name: "Log out" });
  }

  async clickAccountIcon(): Promise<void> {
    await this.accountIcon.click();
  }

  async clickLogOutButton(): Promise<void> {
    await this.logOutButton.click();
  }

  async doLogout(): Promise<void> {
    await this.clickAccountIcon();
    await this.clickLogOutButton();
  }
}
