import { Page, Locator } from "playwright";

export class PaginationWidget {
  readonly entirePaginationWidget: Locator;
  readonly rowsPerPageDropdown: Locator;
  readonly nextPageIcon: Locator;
  readonly previousPageIcon: Locator;
  readonly rowsPerPageOptionByNumber: (number: number) => Locator;

  constructor(public readonly page: Page) {
    this.entirePaginationWidget = page.locator(
      "//div[contains(@class, 'css-1yy0dv2')]"
    );

    this.rowsPerPageDropdown = page.locator(
      "//div[@variant='standard']//div[@aria-haspopup='listbox']"
    );

    this.nextPageIcon = page.getByLabel("Go to next page");
    this.previousPageIcon = page.getByLabel("Go to previous page");

    this.rowsPerPageOptionByNumber = (number: number) =>
      page.getByRole("option", { name: number.toString() });
  }

  async clickRowsPerPageDropdown(): Promise<void> {
    await this.rowsPerPageDropdown.click();
  }

  async clickRowsPerPageOptionByNumber(number: number): Promise<void> {
    await this.rowsPerPageOptionByNumber(number).click();
  }

  async selectRowsPerPage(number: number): Promise<void> {
    await this.clickRowsPerPageDropdown();
    await this.clickRowsPerPageOptionByNumber(number);
  }
}
