import { Page, Locator } from "playwright";

export class AdminAccountsManagerPage {
  readonly pageTitle: Locator;
  readonly searchByNameInput: Locator;
  readonly searchByIdInput: Locator;
  readonly addNewAdminButton: Locator;
  readonly filterByOrganizationDropdown: Locator;
  readonly filterByStatusDropdown: Locator;
  readonly filterByRoleDropdown: Locator;

  constructor(public readonly page: Page) {
    this.pageTitle = page.locator("//h3");
    this.searchByNameInput = page.getByPlaceholder("Search by Name");
    this.searchByIdInput = page.getByPlaceholder("Search by ID");
    this.addNewAdminButton = page.getByRole("button", {
      name: "Add New Admin",
    });
    this.filterByOrganizationDropdown = page.locator(
      "//p[text()='Filter by Organization']/following-sibling::div//div[contains(@class, 'css-qiwgdb')]"
    );
    this.filterByStatusDropdown = page.locator(
      "//p[text()='Filter by Status']/following-sibling::div//div[contains(@class, 'css-qiwgdb')]"
    );
    this.filterByRoleDropdown = page.locator(
      "//p[text()='Filter by Role']/following-sibling::div//div[contains(@class, 'css-qiwgdb')]"
    );
  }
}
