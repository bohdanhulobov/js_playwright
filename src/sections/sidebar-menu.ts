import { Page, Locator } from "playwright";
import pageUrl from "../utils/page-urls.js";

export class SidebarMenu {
  readonly entitiesManagerButton: Locator;
  readonly adminManagerButton: Locator;
  readonly organizationManagerButton: Locator;
  readonly loginManagerButton: Locator;
  readonly configurationsManagerButton: Locator;

  constructor(public readonly page: Page) {
    this.entitiesManagerButton = page.getByRole("button", {
      name: "Entities Manager",
    });
    this.adminManagerButton = page.getByRole("button", {
      name: "Admin Manager",
    });
    this.organizationManagerButton = page.getByRole("button", {
      name: "Organization Manager",
    });
    this.loginManagerButton = page.getByRole("button", {
      name: "Login Manager",
    });
    this.configurationsManagerButton = page.getByRole("button", {
      name: "Configurations Manager",
    });
  }

  async entitiesManagerButtonClick(): Promise<void> {
    await this.entitiesManagerButton.click();
  }

  async clickAdminManagerButton(): Promise<void> {
    await this.adminManagerButton.click();
  }

  async openAdminAccountsManagerPage(): Promise<void> {
    await this.page.goto(pageUrl.home);
    await this.clickAdminManagerButton();
  }

  async openEntityManagerPage(): Promise<void> {
    await this.page.goto(pageUrl.home);
    await this.entitiesManagerButtonClick();
  }
}
