const Store = require("../models/Store");

const StoreService = {
  async getAllStores() {
    return await Store.getAllStores();
  },

  async getStoreByName(storeName) {
    return await Store.getStoreByName(storeName);
  },

  async addStore(name, address) {
    return await Store.addStore(name, address);
  }
};

module.exports = StoreService;
