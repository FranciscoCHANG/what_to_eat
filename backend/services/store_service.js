const Store = require("../models/Store");

const StoreService = {
  async getAllStores() {
    return await Store.getAllStores();
  },

  async getStoreById(storeId) {
    return await Store.getStoreById(storeId);
  },

  async addStore(name, address) {
    return await Store.addStore(name, address);
  }
};

module.exports = StoreService;
