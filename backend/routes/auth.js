const express = require("express");
const passport = require("passport");
const router = express.Router();

// 導入 Google、LINE、Facebook 的認證邏輯
const facebookAuth = require("../services/facebook_auth");
const googleAuth = require("../services/google_auth");
const lineAuth = require("../services/line_auth");

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
router.get("/logout", (req, res) => {
    req.logout((err) => {
        if (err) return next(err);
        res.redirect("/");
    });
});

module.exports = router;
