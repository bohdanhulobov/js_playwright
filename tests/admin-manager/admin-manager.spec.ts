import {
  test,
  expect,
} from "../../src/fixtures/admin-accounts-manager-fixture";
import tableColumnNames from "../../src/utils/table-column-names";
import {
  isNumbersArraySortedDescending,
  isNumbersArraySortedAscending,
} from "../../src/utils/table-utils";

test.describe("Admin Manager tests", () => {
  test("UI elements check @smoke", async ({
    paginationWidget,
    header,
    pageTable,
    adminAccountsManagerPage,
  }) => {
    await expect(
      adminAccountsManagerPage.pageTitle,
      "The page title should be visible"
    ).toBeVisible();
    await expect(
      adminAccountsManagerPage.searchByNameInput,
      'The "Search by Name" input field should be visible'
    ).toBeVisible();
    await expect(
      adminAccountsManagerPage.searchByIdInput,
      'The "Search by ID" input field should be visible'
    ).toBeVisible();
    await expect(
      adminAccountsManagerPage.addNewAdminButton,
      'The "+ Add New Admin" button should be visible'
    ).toBeVisible();
    await expect(
      adminAccountsManagerPage.filterByOrganizationDropdown,
      "The 'Filter by Organization' drop-down menu should be visible"
    ).toBeVisible();
    await expect(
      adminAccountsManagerPage.filterByStatusDropdown,
      "The 'Filter by Status' drop-down menu should be visible"
    ).toBeVisible();
    await expect(
      adminAccountsManagerPage.filterByRoleDropdown,
      "The 'Filter by Status' drop-down menu should be visible"
    ).toBeVisible();

    await expect(
      adminAccountsManagerPage.page,
      "The visual changes are founded"
    ).toHaveScreenshot({
      mask: [
        pageTable.tableContent,
        header.entireHeader,
        paginationWidget.entirePaginationWidget,
      ],
    });
  });

  test("Sorting by ID – Descending", async ({
    adminAccountsManagerPageTable,
  }) => {
    const columnName = tableColumnNames.id;

    await adminAccountsManagerPageTable.sortColumnByName(
      columnName.toUpperCase()
    );

    const areTableRowsSorted = isNumbersArraySortedDescending(
      await adminAccountsManagerPageTable
        .tableCellsArrayByName(columnName)
        .allInnerTexts()
    );

    expect(
      areTableRowsSorted,
      "The list should be sorted in descending order"
    ).toBeTruthy();
  });

  test("Sorting by ID - Default (Ascending)", async ({
    adminAccountsManagerPageTable,
  }) => {
    const columnName = tableColumnNames.id;

    await adminAccountsManagerPageTable.tableContent.waitFor();

    const areTableRowsSorted = isNumbersArraySortedAscending(
      await adminAccountsManagerPageTable
        .tableCellsArrayByName(columnName)
        .allInnerTexts()
    );

    expect(
      areTableRowsSorted,
      "The list should be sorted in descending order"
    ).toBeTruthy();
  });
});
