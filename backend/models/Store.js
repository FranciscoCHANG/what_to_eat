const pool = require("../config/db");

const Store = {
  async getAllStores() {
    const [rows] = await pool.query("SELECT * FROM stores");
    return rows;
  },

  async getStoreByName(storeName) {
      // 拆分關鍵字，並去除空白字符
      const keywords = storeName.split('').map(word => word.trim()).filter(word => word);
    
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
  

  async addStore(name, address) {
    const [result] = await pool.query("INSERT INTO stores (name, address) VALUES (?, ?)", [name, address]);
    return result.insertId;
  }
};

module.exports = Store;
