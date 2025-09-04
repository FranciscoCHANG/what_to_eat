const User = require("../models/User");
const pool = require("../config/db");

const UserService = {
  // 獲取所有使用者
  async getAllUsers() {
    try {
      const [rows] = await pool.query(`
        SELECT 
          u.user_no,
          u.user_name,
          u.email,
          u.user_picture,
          u.create_at,
          u.update_at,
          u.status,
          u.role,
          GROUP_CONCAT(la.provider) as providers
        FROM users u
        LEFT JOIN linked_accounts la ON u.user_no = la.user_no
        GROUP BY u.user_no
        ORDER BY u.create_at DESC
      `);
      return rows;
    } catch (err) {
      console.error("Error getting all users: ", err);
      throw err;
    }
  },

  // 根據 ID 獲取使用者
  async getUserById(user_no) {
    try {
      const user = await User.findUserById(user_no);
      if (!user) {
        throw new Error('使用者不存在');
      }
      return user;
    } catch (err) {
      console.error("Error getting user by ID: ", err);
      throw err;
    }
  },

  // 手動創建使用者
  async createUserManually(userData) {
    try {
      const { user_name, email, phone, role = 'user', status = 'active' } = userData;
      
      // 檢查 email 是否已存在
      const existingUser = await User.findUserByEmail(email);
      if (existingUser) {
        throw new Error('此電子郵件已被使用');
      }

      // 創建使用者
      const userId = await User.createUser(user_name, email, null);
      
      // 更新額外資訊（如果資料庫支援）
      if (phone || role !== 'user' || status !== 'active') {
        await pool.query(`
          UPDATE users 
          SET phone = ?, role = ?, status = ?, update_at = now()
          WHERE user_no = ?
        `, [phone, role, status, userId]);
      }

      return userId;
    } catch (err) {
      console.error("Error creating user manually: ", err);
      throw err;
    }
  },

  // 更新使用者資訊
  async updateUser(user_no, userData) {
    try {
      const { user_name, email, phone, role, status } = userData;
      
      // 檢查使用者是否存在
      const existingUser = await User.findUserById(user_no);
      if (!existingUser) {
        throw new Error('使用者不存在');
      }

      // 如果更新 email，檢查是否已被其他使用者使用
      if (email && email !== existingUser.email) {
        const emailExists = await User.findUserByEmail(email);
        if (emailExists && emailExists.user_no !== user_no) {
          throw new Error('此電子郵件已被其他使用者使用');
        }
      }

      // 更新使用者資訊
      await pool.query(`
        UPDATE users 
        SET user_name = ?, email = ?, phone = ?, role = ?, status = ?, update_at = now()
        WHERE user_no = ?
      `, [user_name, email, phone, role, status, user_no]);

      return true;
    } catch (err) {
      console.error("Error updating user: ", err);
      throw err;
    }
  },

  // 刪除使用者
  async deleteUser(user_no) {
    try {
      // 檢查使用者是否存在
      const existingUser = await User.findUserById(user_no);
      if (!existingUser) {
        throw new Error('使用者不存在');
      }

      // 先刪除關聯的 linked_accounts
      await pool.query('DELETE FROM linked_accounts WHERE user_no = ?', [user_no]);
      
      // 刪除使用者
      await pool.query('DELETE FROM users WHERE user_no = ?', [user_no]);

      return true;
    } catch (err) {
      console.error("Error deleting user: ", err);
      throw err;
    }
  },

  // 搜尋使用者
  async searchUsers(searchTerm) {
    try {
      const [rows] = await pool.query(`
        SELECT 
          u.user_no,
          u.user_name,
          u.email,
          u.user_picture,
          u.create_at,
          u.update_at,
          u.status,
          u.role,
          u.phone,
          GROUP_CONCAT(la.provider) as providers
        FROM users u
        LEFT JOIN linked_accounts la ON u.user_no = la.user_no
        WHERE u.user_name LIKE ? OR u.email LIKE ? OR u.phone LIKE ?
        GROUP BY u.user_no
        ORDER BY u.create_at DESC
      `, [`%${searchTerm}%`, `%${searchTerm}%`, `%${searchTerm}%`]);
      
      return rows;
    } catch (err) {
      console.error("Error searching users: ", err);
      throw err;
    }
  }
};

module.exports = UserService;
