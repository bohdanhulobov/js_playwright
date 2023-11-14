import { Page, Locator } from "playwright";
import { faker } from "@faker-js/faker";

export class PageTable {
  readonly tableContent: Locator;
  readonly columnByTitle: (columnName: string) => Locator;
  readonly columnSortButton: (columnTitle: string) => Locator;
  readonly tableRowByIndex: (rowIndex: string) => Locator;
  readonly tableCellsArrayByName: (columnTitle: string) => Locator;
  readonly randomEditIcon: Locator;
  readonly randomDeleteIcon: Locator;
  //Delete Entity Modal
  readonly areYouSureYouWantToDeleteModal: Locator;
  readonly deleteButton: Locator;
  readonly cancelButton: Locator;

  constructor(public readonly page: Page) {
    this.tableContent = page.locator(
      '//div[contains(@class, "MuiDataGrid-main") and contains(@class, "css-opb0c2")]'
    );
    this.columnByTitle = (columnName: string) =>
      page.getByText(columnName, { exact: true });
    this.columnSortButton = (columnTitle: string) =>
      page
        .getByRole("columnheader", { name: `${columnTitle} Sort` })
        .getByLabel("Sort");
    this.tableRowByIndex = (rowIndex: string) =>
      page.locator(`//div[@data-rowindex='${rowIndex}']`);
    this.tableCellsArrayByName = (columnTitle: string) =>
      page.locator(
        `//div[@data-field='${columnTitle}']/div[@class='MuiDataGrid-cellContent']`
      );
    this.randomEditIcon = page.getByLabel("edit");
    this.randomDeleteIcon = page.getByLabel("delete");

    //Delete Entity Modal

    this.areYouSureYouWantToDeleteModal = page.getByRole("heading", {
      name: "Are you sure you want to delete:",
    });
    this.deleteButton = page.getByRole("button", { name: "Delete" });
    this.cancelButton = page.getByRole("button", { name: "Cancel" });
  }

  //Actions

  async hoverColumnTitleByName(name: string): Promise<void> {
    await this.columnByTitle(name).hover();
  }

  async clickColumnSortIcon(name: string): Promise<void> {
    await this.columnSortButton(name).click();
  }

  async sortColumnByName(name: string): Promise<void> {
    await this.hoverColumnTitleByName(name);
    await this.clickColumnSortIcon(name);
    await this.tableContent.waitFor(); // this wait was added to let finish the table update
  }

  async tableScrollToBottom(): Promise<void> {
    await this.tableContent.hover();
    await this.page.mouse.wheel(0, 5000);
    // probably should be changed to scroll bar state check
  }

  async clickRandomEditIcon(): Promise<void> {
    await this.randomEditIcon
      .nth(faker.number.int({ min: 1, max: 10 }))
      .click();
  }

  async clickRandomDeleteIcon(): Promise<void> {
    await this.randomDeleteIcon
      .nth(faker.number.int(faker.number.int({ min: 1, max: 10 })))
      .click();
  }

  //Delete Entity Modal

  async clickDeleteButton(): Promise<void> {
    await this.deleteButton.click();
  }

  async clickCancelButton(): Promise<void> {
    await this.cancelButton.click();
  }
}
