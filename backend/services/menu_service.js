const Menu = require("../models/Menu");

const MenuService = {
  async getAllMenus() {
    return await Menu.getAllMenus();
  },

  async getMenuByStoreId(storeId) {
    return await Menu.getMenuByStoreId(storeId);
  },

  async addMenu(storeId, storeName) {
    return await Menu.addMenu(storeId, storeName);
  },

  async addMenuItem(menuId, name, price) {
    return await Menu.addMenuItem(menuId, name, price);
  },

  async updateMenuItem(itemId, name, price) {
    await Menu.updateMenuItem(itemId, name, price);
  },

  async deleteMenuItem(itemId) {
    await Menu.deleteMenuItem(itemId);
  }
};

module.exports = MenuService;
