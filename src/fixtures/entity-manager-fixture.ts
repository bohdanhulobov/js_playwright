import { test as base } from "@playwright/test";
import { EntityManagerPage } from "../pages/entities-manager/entity-manager-page";
import { CreateNewEntityPage } from "../pages/entities-manager/create-new-entity-page";
import { EditEntityPage } from "../pages/entities-manager/edit-entity-page";
import { Header } from "../sections/header";
import { PaginationWidget } from "../sections/pagination-widget";
import { SidebarMenu } from "../sections/sidebar-menu";
import { PageTable } from "../sections/page-table";

export const test = base.extend({
  header: async ({ page }, use: any) => {
    await use(new Header(page));
  },

  paginationWidget: async ({ page }, use) => {
    await use(new PaginationWidget(page));
  },

  pageTable: async ({ page }, use) => {
    await use(new PageTable(page));
  },

  entityManagerPageTable: async ({ page }, use) => {
    const sidebarMenu = new SidebarMenu(page);
    await sidebarMenu.openEntityManagerPage();

    const entityManagerPageTable = new PageTable(page);

    await use(entityManagerPageTable);
  },

  entityManagerPage: async ({ page }, use) => {
    const sidebarMenu = new SidebarMenu(page);
    await sidebarMenu.openEntityManagerPage();

    const entityManagerPage = new EntityManagerPage(page);

    await use(entityManagerPage);
  },

  createNewEntityPage: async ({ page }, use) => {
    const sidebarMenu = new SidebarMenu(page);
    await sidebarMenu.openEntityManagerPage();

    const entityManagerPage = new EntityManagerPage(page);
    await entityManagerPage.clickAddEntityButton();

    const createNewEntityPage = new CreateNewEntityPage(page);
    await use(createNewEntityPage);
  },

  editEntityPage: async ({ page }, use) => {
    const sidebarMenu = new SidebarMenu(page);
    await sidebarMenu.openEntityManagerPage();

    const entityManagerPageTable = new PageTable(page);
    await entityManagerPageTable.clickRandomEditIcon();

    const editEntityPage = new EditEntityPage(page);
    await use(editEntityPage);
  },
});

export { expect } from "@playwright/test";
