const pool = require("../config/db");

const Store = {
  async getAllStores() {
    const [rows] = await pool.query("SELECT * FROM stores");
    return rows;
  },

  async getStoreByName(store_name) {
    const [rows] = await pool.query("SELECT * FROM stores WHERE store_name LIKE ?", [`%${store_name}%`]);
    return rows[0] || null;
  },

  async addStore(name, address) {
    const [result] = await pool.query("INSERT INTO stores (name, address) VALUES (?, ?)", [name, address]);
    return result.insertId;
  }
};

module.exports = Store;
