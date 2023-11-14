import { test, expect } from "../../src/fixtures/entity-manager-fixture";
import { faker } from "@faker-js/faker";
import entityTypes from "../../src/utils/entity-types";

test.describe("Create New Entity tests", () => {
  test("UI elements check @smoke", async ({ createNewEntityPage, header }) => {
    await expect(
      createNewEntityPage.pageTitle,
      "The page title should be visible"
    ).toBeVisible();

    await expect(
      createNewEntityPage.page,
      "The visual changes are founded"
    ).toHaveScreenshot({
      mask: [header.entireHeader, header.accountIcon],
    });
  });

  test("Submit with no input", async ({ createNewEntityPage }) => {
    await createNewEntityPage.clickCreateNewEntityButton();

    await expect(
      createNewEntityPage.pleaseChooseAnEntityAndTitleErrorMessage,
      "The 'Please choose an Entity type and title to create a new Entity' error message should be shown"
    ).toBeVisible();
  });

  test("Create the 'System' entity - description - no parent", async ({
    createNewEntityPage,
  }) => {
    const entityType = entityTypes.system;

    await createNewEntityPage.selectEntityTypeByName(entityType);

    await createNewEntityPage.typeEntityTitle(
      `${faker.company.name()} ${faker.commerce.department()}`
    );

    await createNewEntityPage.typeEntityDescription(
      faker.string.alphanumeric({ length: { min: 1, max: 50 } })
    );

    await createNewEntityPage.clickCreateNewEntityButton();

    await expect(
      createNewEntityPage.entityIsCreatedModalHeader,
      "The modal with entity ID should be shown"
    ).toBeVisible();

    await expect(
      createNewEntityPage.entityIsCreatedModalOkButton,
      "The 'OK' button should be shown on the modal window"
    ).toBeVisible();
  });
});
