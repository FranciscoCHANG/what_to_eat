const pool = require("../config/db");

const Menu = {
  async getAllMenus() {
    const [rows] = await pool.query("SELECT * FROM menus");
    return rows;
  },

  async getMenuByStoreId(storeId) {
    const [rows] = await pool.query("SELECT * FROM menus WHERE store_id = ?", [storeId]);
    if (rows.length === 0) return null;

    const [items] = await pool.query("SELECT * FROM menu_items WHERE menu_id = ?", [rows[0].id]);
    return { ...rows[0], items };
  },

  async addMenu(storeId, storeName) {
    const [result] = await pool.query("INSERT INTO menus (store_id, store_name) VALUES (?, ?)", [storeId, storeName]);
    return result.insertId;
  },

  async addMenuItem(menuId, name, price) {
    const [result] = await pool.query("INSERT INTO menu_items (menu_id, name, price) VALUES (?, ?, ?)", [menuId, name, price]);
    return result.insertId;
  },

  async updateMenuItem(itemId, name, price) {
    await pool.query("UPDATE menu_items SET name = ?, price = ? WHERE id = ?", [name, price, itemId]);
  },

  async deleteMenuItem(itemId) {
    await pool.query("DELETE FROM menu_items WHERE id = ?", [itemId]);
  }
};

module.exports = Menu;
