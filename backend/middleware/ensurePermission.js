const PermissionService = require('../services/permission_service');

// 極薄中介層：不寫任何權限規則，僅詢問資料庫
function requirePermission(permissionName) {
  return async function (req, res, next) {
    try {
      const userNo = req?.user?.user_no ?? req?.session?.guestUserNo;
      if (!userNo) {
        return res.status(401).json({ success: false, message: '未登入' });
      }

      const allowed = await PermissionService.hasPermission(userNo, permissionName);
      if (allowed) return next();

      return res.status(403).json({ success: false, message: '無權限', permission: permissionName });
    } catch (err) {
      console.error('權限檢查錯誤:', err);
      return res.status(500).json({ success: false, message: '權限檢查失敗' });
    }
  };
}

module.exports = { requirePermission };



