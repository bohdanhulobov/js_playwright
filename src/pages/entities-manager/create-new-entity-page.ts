import { Page, Locator } from "playwright";

export class CreateNewEntityPage {
  readonly pageTitle: Locator;
  readonly entityTypeDropdown: Locator;
  readonly titleInputField: Locator;
  readonly descriptionInputField: Locator;
  readonly addIdOfNewParentEntityInputField: Locator;
  readonly createNewEntityButton: Locator;
  readonly cancelButton: Locator;
  readonly pleaseChooseAnEntityAndTitleErrorMessage: Locator;
  readonly entityIsCreatedModalHeader: Locator;
  readonly entityIsCreatedModalOkButton: Locator;
  readonly entityTypeDropdownOptionByName: (typeName: string) => Locator;

  constructor(public readonly page: Page) {
    this.pageTitle = page.getByRole("heading", { name: "Create New Entity" });
    this.entityTypeDropdown = page.locator("//div[@id='select']");
    this.titleInputField = page.getByPlaceholder("Title");
    this.descriptionInputField = page.getByPlaceholder("Description");
    this.addIdOfNewParentEntityInputField = page.getByPlaceholder("Parent ID");
    this.createNewEntityButton = page.getByRole("button", {
      name: "Create New Entity",
    });
    this.cancelButton = page.getByRole("button", {
      name: "Cancel",
    });
    this.pleaseChooseAnEntityAndTitleErrorMessage = page.getByText(
      "Please choose an Entity type and title to create a new Entity"
    );
    this.entityIsCreatedModalHeader = page.getByRole("heading", {
      name: /New Entity with ID \d+ is created/,
    });
    this.entityIsCreatedModalOkButton = page.getByRole("button", {
      name: "Ok",
    });

    this.entityTypeDropdownOptionByName = (typeName: string) =>
      page.getByRole("option", {
        name: typeName,
      });
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

  async clickCreateNewEntityButton(): Promise<void> {
    await this.createNewEntityButton.click();
  }
}
