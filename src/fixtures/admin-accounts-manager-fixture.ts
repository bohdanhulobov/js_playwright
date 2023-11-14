import { test as base } from "@playwright/test";
import { AdminAccountsManagerPage } from "../pages/admin-manager/admin-accounts-manager-page";
import { SidebarMenu } from "../sections/sidebar-menu";
import { PaginationWidget } from "../sections/pagination-widget";
import { PageTable } from "../sections/page-table";
import { Header } from "../sections/header";

export const test = base.extend({
  header: async ({ page }, use) => {
    await use(new Header(page));
  },

  paginationWidget: async ({ page }, use) => {
    await use(new PaginationWidget(page));
  },

  pageTable: async ({ page }, use) => {
    await use(new PageTable(page));
  },

  adminAccountsManagerPageTable: async ({ page }, use) => {
    const sidebarMenu = new SidebarMenu(page);
    await sidebarMenu.openAdminAccountsManagerPage();

    const adminManagerPageTable = new PageTable(page);

    await use(adminManagerPageTable);
  },

  adminAccountsManagerPage: async ({ page }, use) => {
    const sidebarMenu = new SidebarMenu(page);
    await sidebarMenu.openAdminAccountsManagerPage();

    const adminAccountsManagerPage = new AdminAccountsManagerPage(page);

    await use(adminAccountsManagerPage);
  },
});

export { expect } from "@playwright/test";
