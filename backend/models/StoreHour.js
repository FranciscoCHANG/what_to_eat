const pool = require("../config/db");

const StoreHour = {
    // search all
    async getStoreHours(store_no) {
      const [rows] = await pool.query("SELECT * FROM store_hours WHERE store_no = ?", [store_no]);
      return rows;
    },

};

module.exports = StoreHour;
