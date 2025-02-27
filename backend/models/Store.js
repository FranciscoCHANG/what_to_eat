const pool = require("../config/db");
const { closeStore } = require("../services/store_service");

const Store = {
  // search all
  async getAllStores() {
    const [rows] = await pool.query("SELECT * FROM stores");
    return rows;
  },

  // search
  async getStoreByName(store_name) {
      // 拆分關鍵字，並去除空白字符
      const keywords = store_name.split('').map(word => word.trim()).filter(word => word);
    
      // 構建 SQL 查詢，為每個關鍵字創建 LIKE 條件
      let query = "SELECT * FROM stores WHERE ";
      const conditions = keywords.map(keyword => {
        return "store_name LIKE ?";
      });
      
      query += conditions.join(" AND ");
    
      // 傳入查詢條件，並且對每個條件進行 %包裝
      const values = keywords.map(keyword => `%${keyword}%`);
    
      // 執行查詢
      const [rows] = await pool.query(query, values);
      return rows;
    },
  
  // insert
  async addStore(store_name, type, branch, address, phone, social_media_links, descriptions) {
    const [result] = await pool.query(`
      INSERT INTO stores 
      (store_name, type, branch, address, phone, social_media_links, descriptions, create_at) 
      VALUES (?, ?, ?, ?, ?, ?, ?, now())
      `,[store_name, type, branch, address, phone, JSON.stringify(social_media_links), descriptions]
    );
    return result.insertId;
  },
  
  // update
  async updateStore(store_no, store_name, type, branch, address, phone, social_media_links, descriptions) {
    const [result] = await pool.query(
      `UPDATE stores 
       SET store_name = COALESCE(?, store_name), 
           type = COALESCE(?, type), 
           branch = COALESCE(?, branch), 
           address = COALESCE(?, address), 
           phone = COALESCE(?, phone), 
           social_media_links = COALESCE(?, social_media_links), 
           descriptions = COALESCE(?, descriptions), 
           update_at = NOW()
       WHERE store_no = ?`,
      [store_name, type, branch, address, phone, social_media_links, descriptions, store_no]
    );
    return result;
  },

  async closeStore(store_no){
    const [result] = await pool.query("UPDATE stores SET status = 'closed' WHERE store_no = ?", [store_no]);
    return result;
  },

  async reopenStore(store_no){
    const [result] = await pool.query("UPDATE stores SET status = 'open' WHERE store_no = ?", [store_no]);
    return result;
  },
};

module.exports = Store;
