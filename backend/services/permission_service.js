const pool = require('../config/db');

// 只與資料庫互動，不包含任何硬編碼權限邏輯
const PermissionService = {
  // 回傳是否擁有特定權限（permission_name）
  async hasPermission(userNo, permissionName) {
    const [rows] = await pool.query(
      `SELECT EXISTS(
         SELECT 1
         FROM what_to_eat.users AS u
         JOIN what_to_eat.user_roles AS ur  ON u.user_no = ur.user_no
         JOIN what_to_eat.roles AS r        ON ur.role_no = r.role_no
         JOIN what_to_eat.role_permissions AS rps ON r.role_no = rps.role_no
         JOIN what_to_eat.permissions AS ps  ON rps.permission_no = ps.permission_no
         WHERE u.user_no = ?
           AND ps.permission_name = ?
       ) AS allowed`,
      [userNo, permissionName]
    );
    return !!rows?.[0]?.allowed;
  },

  // 取得使用者全部權限名稱（去重）
  async getUserPermissions(userNo) {
    const [rows] = await pool.query(
      `SELECT DISTINCT ps.permission_name AS permissionName
       FROM what_to_eat.users AS u
       JOIN what_to_eat.user_roles AS ur  ON u.user_no = ur.user_no
       JOIN what_to_eat.roles AS r        ON ur.role_no = r.role_no
       JOIN what_to_eat.role_permissions AS rps ON r.role_no = rps.role_no
       JOIN what_to_eat.permissions AS ps  ON rps.permission_no = ps.permission_no
       WHERE u.user_no = ?
       ORDER BY ps.permission_name`,
      [userNo]
    );
    return rows.map(r => r.permissionName);
  }
};

module.exports = PermissionService;


