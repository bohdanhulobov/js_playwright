import { test, expect } from "../../src/fixtures/entity-manager-fixture";
import {
  areAllValuesSoughtValues,
  isNumbersArraySortedDescending,
  isNumbersArraySortedAscending,
  isTextArraySortedAscending,
  isTextArraySortedDescending,
} from "../../src/utils/table-utils";
import entityTypes from "../../src/utils/entity-types";
import rowsPerPage from "../../src/utils/rows-per-page";
import tableColumnNames from "../../src/utils/table-column-names";
import pageUrls from "../../src/utils/page-urls";

test.describe("Entity Manager tests", () => {
  test("UI elements check @smoke", async ({
    paginationWidget,
    header,
    pageTable,
    entityManagerPage,
  }) => {
    await expect(
      entityManagerPage.pageTitle,
      "The page title should be visible"
    ).toBeVisible();

    await expect(
      entityManagerPage.filterByTypeDropdown,
      'The "Filter by Type" drop-down menu should be visible'
    ).toBeVisible();

    await expect(
      entityManagerPage.searchByNameInput,
      'The "Search by Name" input field should be visible'
    ).toBeVisible();

    await expect(
      entityManagerPage.searchByIdInput,
      'The "Search by ID" input field should be visible'
    ).toBeVisible();

    await expect(
      entityManagerPage.addEntityButton,
      'The "+ Add Entity" button should be visible'
    ).toBeVisible();

    await expect(
      entityManagerPage.page,
      "The visual changes are founded"
    ).toHaveScreenshot({
      mask: [
        pageTable.tableContent,
        header.entireHeader,
        paginationWidget.entirePaginationWidget,
      ],
    });
  });

  test("Filter by Type - System", async ({ entityManagerPage, pageTable }) => {
    const type = entityTypes.system;

    await entityManagerPage.selectFilterByTypeOption(type);

    const areEntitiesFiltered = areAllValuesSoughtValues(
      await pageTable.tableCellsArrayByName(type).allInnerTexts(),
      type.toUpperCase()
    );

    expect(
      areEntitiesFiltered,
      `Only ${type} type entities should be shown`
    ).toBeTruthy();
  });

  test("Filter by Type - State", async ({ entityManagerPage, pageTable }) => {
    const type = entityTypes.state;

    await entityManagerPage.selectFilterByTypeOption(type);

    const areEntitiesFiltered = areAllValuesSoughtValues(
      await pageTable.tableCellsArrayByName(type).allInnerTexts(),
      type.toUpperCase()
    );

    expect(
      areEntitiesFiltered,
      `Only ${type} type entities should be shown`
    ).toBeTruthy();
  });

  test("Filter by Type - District", async ({
    entityManagerPage,
    pageTable,
  }) => {
    const type = entityTypes.district;

    await entityManagerPage.selectFilterByTypeOption(type);

    const areEntitiesFiltered = areAllValuesSoughtValues(
      await pageTable.tableCellsArrayByName(type).allInnerTexts(),
      type.toUpperCase()
    );

    await expect(
      areEntitiesFiltered,
      `Only ${type} type entities should be shown`
    ).toBeTruthy();
  });

  test("Filter by Type - School", async ({ entityManagerPage, pageTable }) => {
    const type = entityTypes.school;

    await entityManagerPage.selectFilterByTypeOption(type);

    const areEntitiesFiltered = areAllValuesSoughtValues(
      await pageTable.tableCellsArrayByName(type).allInnerTexts(),
      type.toUpperCase()
    );

    await expect(
      areEntitiesFiltered,
      `Only ${type} type entities should be shown`
    ).toBeTruthy();
  });

  test("Filter by Type - Cohort", async ({ entityManagerPage, pageTable }) => {
    const type = entityTypes.cohort;

    await entityManagerPage.selectFilterByTypeOption(type);

    const areEntitiesFiltered = areAllValuesSoughtValues(
      await pageTable.tableCellsArrayByName(type).allInnerTexts(),
      type.toUpperCase()
    );

    expect(
      areEntitiesFiltered,
      `Only ${type} type entities should be shown`
    ).toBeTruthy();
  });

  test("Filter by Type - Other", async ({ entityManagerPage, pageTable }) => {
    const type = entityTypes.other;

    await entityManagerPage.selectFilterByTypeOption(type);

    const areEntitiesFiltered = areAllValuesSoughtValues(
      await pageTable.tableCellsArrayByName(type).allInnerTexts(),
      type.toUpperCase()
    );

    expect(
      areEntitiesFiltered,
      `Only ${type} type entities should be shown`
    ).toBeTruthy();
  });

  test("Sorting by ID - Descending", async ({ entityManagerPageTable }) => {
    const columnName = tableColumnNames.id;

    await entityManagerPageTable.sortColumnByName(columnName.toUpperCase());

    const areTableRowsSorted = isNumbersArraySortedDescending(
      await entityManagerPageTable
        .tableCellsArrayByName(columnName)
        .allInnerTexts()
    );

    expect(
      areTableRowsSorted,
      "The list should be sorted in descending order"
    ).toBeTruthy();
  });

  test("Sorting by ID - Default (Ascending)", async ({
    entityManagerPageTable,
  }) => {
    const columnName = tableColumnNames.id;

    await entityManagerPageTable.tableContent.waitFor(); // this wait was added to let finish the table update

    const areTableRowsSorted = isNumbersArraySortedAscending(
      await entityManagerPageTable
        .tableCellsArrayByName(columnName)
        .allInnerTexts()
    );

    expect(
      areTableRowsSorted,
      "The list should be sorted in ascending order"
    ).toBeTruthy();
  });

  test("Sorting by Type - Ascending", async ({ entityManagerPageTable }) => {
    let columnName: string | undefined = tableColumnNames.entityTitle;

    await entityManagerPageTable.sortColumnByName(columnName);

    columnName = columnName.toLowerCase().split(" ").pop();

    const areTableRowsSorted = isTextArraySortedAscending(
      await entityManagerPageTable
        .tableCellsArrayByName(columnName)
        .allInnerTexts()
    );
    expect(
      areTableRowsSorted,
      "The list should be sorted in ascending order"
    ).toBeTruthy();
  });

  test("Sorting by Type - Descending", async ({ entityManagerPageTable }) => {
    let columnName: string | undefined = tableColumnNames.entityTitle;

    await entityManagerPageTable.sortColumnByName(columnName);
    await entityManagerPageTable.sortColumnByName(columnName); // second click to make reverse sorting

    columnName = columnName.toLowerCase().split(" ").pop();

    const areTableRowsSorted = isTextArraySortedDescending(
      await entityManagerPageTable
        .tableCellsArrayByName(columnName)
        .allInnerTexts()
    );
    expect(
      areTableRowsSorted,
      "The list should be sorted in descending order"
    ).toBeTruthy();
  });

  test("Select 75 rows per page", async ({
    entityManagerPageTable,
    paginationWidget,
  }) => {
    const rowsCount = rowsPerPage.seventyFive;

    await paginationWidget.selectRowsPerPage(rowsCount);
    await entityManagerPageTable.tableScrollToBottom();

    await expect(
      entityManagerPageTable.tableRowByIndex(rowsCount - 1),
      `The ${rowsCount}th element should be shown`
    ).toBeVisible();
  });

  test("Select 50 rows per page", async ({
    entityManagerPageTable,
    paginationWidget,
  }) => {
    const rowsCount = rowsPerPage.fifty;

    await paginationWidget.selectRowsPerPage(rowsCount);
    await entityManagerPageTable.tableScrollToBottom();

    await expect(
      entityManagerPageTable.tableRowByIndex(rowsCount - 1),
      `The ${rowsCount}th element should be shown`
    ).toBeVisible();
  });

  test("Select 25 rows per page", async ({
    entityManagerPageTable,
    paginationWidget,
  }) => {
    const rowsCount = rowsPerPage.twentyFive;

    await paginationWidget.selectRowsPerPage(rowsCount);
    await entityManagerPageTable.tableScrollToBottom();

    await expect(
      entityManagerPageTable.tableRowByIndex(rowsCount - 1),
      `The ${rowsCount}th element should be shown`
    ).toBeVisible();
  });

  test("Delete Entity - Cancel", async ({ entityManagerPageTable }) => {
    await entityManagerPageTable.clickRandomDeleteIcon();

    await expect(
      entityManagerPageTable.areYouSureYouWantToDeleteModal,
      "The 'Are you sure you want to delete' modal window should be visible"
    ).toBeVisible();

    await entityManagerPageTable.clickCancelButton();

    await expect(
      entityManagerPageTable.areYouSureYouWantToDeleteModal,
      "The 'Are you sure you want to delete' modal window should not be visible"
    ).not.toBeVisible();
  });

  test("Delete Entity - Yes, Delete", async ({ entityManagerPageTable }) => {
    await entityManagerPageTable.clickRandomDeleteIcon();

    await expect(
      entityManagerPageTable.areYouSureYouWantToDeleteModal,
      "The 'Are you sure you want to delete' modal window should be visible"
    ).toBeVisible();

    await entityManagerPageTable.clickDeleteButton();

    await expect(
      entityManagerPageTable.areYouSureYouWantToDeleteModal,
      "The 'Are you sure you want to delete' modal window should not be visible"
    ).not.toBeVisible();
  });

  test("Edit Entity", async ({ entityManagerPageTable }) => {
    await entityManagerPageTable.clickRandomEditIcon();

    await expect(entityManagerPageTable.page).toHaveURL(/.+\/edit/);
  });
});
