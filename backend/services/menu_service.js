const Menu = require("../models/Menu");

const MenuService = {
  async getAllMenus() {
    return await Menu.getAllMenus();
  },

  async getMenuByStoreNo(storeNo) {
    return await Menu.getMenuByStoreNo(storeNo);
  },

  async addMenu(storeNo, storeName) {
    return await Menu.addMenu(storeNo, storeName);
  },

  async addMenuItem(menuNo, name, price) {
    return await Menu.addMenuItem(menuNo, name, price);
  },

  async updateMenuItem(itemNo, name, price) {
    await Menu.updateMenuItem(itemNo, name, price);
  },

  async deleteMenuItem(itemNo) {
    await Menu.deleteMenuItem(itemNo);
  }
};

module.exports = MenuService;
