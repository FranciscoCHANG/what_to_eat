// 認證保護中間件
const requireAuth = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    } else {
        return res.status(401).json({
            success: false,
            message: "需要登入才能訪問此資源",
            authenticated: false
        });
    }
};

// 管理員權限檢查中間件
const requireAdmin = (req, res, next) => {
    if (req.isAuthenticated()) {
        if (req.user.role === 'admin') {
            return next();
        } else {
            return res.status(403).json({
                success: false,
                message: "需要管理員權限才能訪問此資源",
                requiredRole: 'admin',
                userRole: req.user.role || 'user'
            });
        }
    } else {
        return res.status(401).json({
            success: false,
            message: "需要登入才能訪問此資源",
            authenticated: false
        });
    }
};

// 可選認證中間件（登入與否都可以訪問，但會提供使用者資訊）
const optionalAuth = (req, res, next) => {
    // 不管是否登入都繼續執行，但會在 req.user 中提供使用者資訊
    next();
};

// 檢查使用者狀態中間件
const checkUserStatus = (req, res, next) => {
    if (req.isAuthenticated()) {
        if (req.user.status === 'inactive') {
            return res.status(403).json({
                success: false,
                message: "您的帳號已被停用，請聯繫管理員",
                userStatus: req.user.status
            });
        }
        if (req.user.status === 'banned') {
            return res.status(403).json({
                success: false,
                message: "您的帳號已被封鎖",
                userStatus: req.user.status
            });
        }
    }
    next();
};

module.exports = {
    requireAuth,
    requireAdmin,
    optionalAuth,
    checkUserStatus
};
