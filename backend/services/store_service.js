const Store = require("../models/Store");

const StoreService = {
  async getAllStores() {
    return await Store.getAllStores();
  },

  async getStoreByName(storeName) {
    return await Store.getStoreByName(storeName);
  },

  async addStore(store_name, type, branch, address, phone, social_media_links, descriptions) {
    return await Store.addStore(store_name, type, branch, address, phone, social_media_links, descriptions);
  },

  async updateStore(store_no, store_name, type, branch, address, phone, social_media_links, descriptions, status){
    return await Store.updateStore(store_no, store_name, type, branch, address, phone, social_media_links, descriptions, status);
  },

  async closeStore(store_no){
    return await Store.closeStore(store_no);
  },

  async reopenStore(store_no){
    return await Store.reopenStore(store_no);
  },

};

module.exports = StoreService;
