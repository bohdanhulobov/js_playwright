import { Page, Locator } from "@playwright/test";

export class EntityManagerPage {
  readonly page: Page;
  readonly pageTitle: Locator;
  readonly filterByTypeDropdown: Locator;
  readonly searchByNameInput: Locator;
  readonly searchByIdInput: Locator;
  readonly addEntityButton: Locator;
  readonly filterByTypeOption: (optionName: string) => Locator;

  constructor(page: Page) {
    this.page = page;
    this.pageTitle = page.locator("//h3");
    this.filterByTypeDropdown = page.locator(
      "//p[text()='Filter by Type']/following-sibling::div//div[contains(@class, 'css-qiwgdb')]"
    );
    this.searchByNameInput = page.getByPlaceholder("Search by Name");
    this.searchByIdInput = page.getByPlaceholder("Search by ID");
    this.addEntityButton = page.getByRole("button", {
      name: "Add Entity",
    });

    // There locators are created by anonymous functions to let use variables as their parts
    this.filterByTypeOption = (optionName: string) =>
      page.getByRole("option", { name: optionName });
  }

  //Actions

  async clickFilterByTypeDropdown(): Promise<void> {
    await this.filterByTypeDropdown.click();
  }

  async selectFilterByTypeOption(optionName: string): Promise<void> {
    await this.clickFilterByTypeDropdown();
    await this.filterByTypeOption(optionName).click();
  }

  async clickAddEntityButton(): Promise<void> {
    await this.addEntityButton.click();
  }
}
