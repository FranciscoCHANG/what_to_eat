const StoreHour = require("../models/StoreHour");

const StoreHourService = {
  async getStoreHours(store_no) {
    return await StoreHour.getStoreHours(store_no);
  },
};

module.exports = StoreHourService;
