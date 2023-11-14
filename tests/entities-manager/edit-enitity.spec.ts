import { test, expect } from "../../src/fixtures/entity-manager-fixture";

test.describe("Edit Entity tests", () => {
  test("UI elements check @smoke", async ({ editEntityPage }) => {
    await expect(
      editEntityPage.pageTitle,
      "The page title should be visible"
    ).toBeVisible();

    await expect(
      editEntityPage.entityTypeDropdown,
      'The "Entity Type" drop-down menu should be visible'
    ).toBeVisible();

    await expect(
      editEntityPage.titleInputField,
      'The "Title" input field should be visible'
    ).toBeVisible();

    await expect(
      editEntityPage.descriptionInputField,
      'The "Description" input field should be visible'
    ).toBeVisible();
  });
});
