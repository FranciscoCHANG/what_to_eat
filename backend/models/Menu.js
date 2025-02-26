const pool = require("../config/db");

const Menu = {
  async getAllMenus() {
    const [rows] = await pool.query("SELECT * FROM menus");
    return rows;
  },

  async getMenuByStoreNo(storeNo) {
    const [rows] = await pool.query("SELECT * FROM menu_items WHERE store_no = ?", [storeNo]);
    if (rows.length === 0) return null;

    const [items] = await pool.query("SELECT * FROM menu_items WHERE item_no = ?", [rows[0].No]);
    return { ...rows[0], items };
  },

  async addMenu(storeNo, storeName) {
    const [result] = await pool.query("INSERT INTO menu_items (store_no, store_name) VALUES (?, ?)", [storeNo, storeName]);
    return result.insertNo;
  },

  async addMenuItem(menuNo, name, price) {
    const [result] = await pool.query("INSERT INTO menu_items (item_no, name, price) VALUES (?, ?, ?)", [menuNo, name, price]);
    return result.insertNo;
  },

  async updateMenuItem(itemNo, name, price) {
    await pool.query("UPDATE menu_items SET name = ?, price = ? WHERE No = ?", [name, price, itemNo]);
  },

  async deleteMenuItem(itemNo) {
    await pool.query("DELETE FROM menu_items WHERE No = ?", [itemNo]);
  }
};

module.exports = Menu;
