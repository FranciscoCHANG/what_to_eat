const express = require("express");
const router = express.Router();

// 導入 Google、LINE、Facebook 的認證邏輯
const facebookAuth = require("../services/facebook_auth");
const googleAuth = require("../services/google_auth");
const lineAuth = require("../services/line_auth");
const PermissionService = require("../services/permission_service");

// 統一錯誤處理函數
const handleAuthError = (err, res, operation = "認證") => {
    console.error(`${operation}錯誤:`, err);
    
    let message = "認證失敗";
    let statusCode = 500;
    
    if (err.message) {
        message = err.message;
    } else if (err.response && err.response.data) {
        message = err.response.data.error || err.response.data.message || message;
        statusCode = err.response.status || 500;
    }
    
    res.status(statusCode).json({
        success: false,
        message: message,
        error: process.env.NODE_ENV === 'development' ? err.stack : undefined
    });
};

// Google 登入路由
router.get("/google", googleAuth.login);

// Google 回調路由
router.get("/google/callback", googleAuth.callback);

// LINE 登入路由
router.get("/line", lineAuth.login);

// LINE 回調路由
router.get("/line/callback", lineAuth.callback);

// Facebook 登入路由
router.get("/facebook", facebookAuth.login);

// Facebook 回調路由
router.get("/facebook/callback", facebookAuth.callback);

// 登出處理
router.get("/logout", (req, res, next) => {
    req.logout((err) => {
        if (err) {
            return handleAuthError(err, res, "登出");
        }
        res.redirect("/");
    });
});

// 檢查登入狀態
router.get("/status", (req, res) => {
    if (req.isAuthenticated()) {
        // 使用者已登入，回傳使用者資訊
        res.json({
            success: true,
            authenticated: true,
            user: {
                user_no: req.user.user_no,
                user_name: req.user.user_name,
                email: req.user.email,
                user_picture: req.user.user_picture,
                role: req.user.role || 'user',
                status: req.user.status || 'active'
            }
        });
    } else {
        // 使用者未登入
        res.json({
            success: true,
            authenticated: false,
            user: null
        });
    }
});

// 獲取當前使用者資訊
router.get("/me", (req, res) => {
    if (!req.isAuthenticated()) {
        return res.status(401).json({
            success: false,
            message: "未登入"
        });
    }
    
    res.json({
        success: true,
        user: {
            user_no: req.user.user_no,
            user_name: req.user.user_name,
            email: req.user.email,
            user_picture: req.user.user_picture,
            role: req.user.role || 'user',
            status: req.user.status || 'active',
            create_at: req.user.create_at,
            update_at: req.user.update_at
        }
    });
});

// 取得目前用戶的權限清單（permission_name 陣列）
router.get("/permissions", async (req, res) => {
    try {
        const userNo = req?.user?.user_no ?? req?.session?.guestUserNo;
        if (!userNo) {
            return res.json({ success: true, permissions: [] });
        }

        const permissions = await PermissionService.getUserPermissions(userNo);
        return res.json({ success: true, permissions });
    } catch (err) {
        console.error("取得權限清單錯誤:", err);
        return res.status(500).json({ success: false, message: "取得權限失敗" });
    }
});

module.exports = router;
