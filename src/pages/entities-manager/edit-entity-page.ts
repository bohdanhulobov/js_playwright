import { Page, Locator } from "playwright";

export class EditEntityPage {
  readonly pageTitle: Locator;
  readonly entityTypeDropdown: Locator;
  readonly titleInputField: Locator;
  readonly descriptionInputField: Locator;
  readonly entityTypeDropdownOptionByName: (typeName: string) => Locator;
  readonly changeParentEntityButton: Locator;
  readonly saveChangesButton: Locator;

  constructor(public readonly page: Page) {
    this.pageTitle = page.getByRole("heading", { name: "Entity:" });
    this.entityTypeDropdown = page.locator("//div[@id='select']");
    this.titleInputField = page.getByPlaceholder("Title");
    this.descriptionInputField = page.getByPlaceholder("Position");
    this.entityTypeDropdownOptionByName = (typeName: string) =>
      page.getByRole("option", {
        name: typeName,
      });
    this.changeParentEntityButton = page.getByRole("button", {
      name: "Change Parent Entity",
    });
    this.saveChangesButton = page.getByRole("button", { name: "Save changes" });
  }

  //Actions

  async clickEntityTypeDropdown(): Promise<void> {
    await this.entityTypeDropdown.click();
  }

  async clickEntityTypeDropdownOptionByName(typeName: string): Promise<void> {
    await this.entityTypeDropdownOptionByName(typeName).click();
  }

  async selectEntityTypeByName(typeName: string): Promise<void> {
    await this.clickEntityTypeDropdown();
    await this.clickEntityTypeDropdownOptionByName(typeName);
  }

  async typeEntityTitle(title: string): Promise<void> {
    await this.titleInputField.fill(title);
  }

  async typeEntityDescription(description: string): Promise<void> {
    await this.descriptionInputField.fill(description);
  }
}
