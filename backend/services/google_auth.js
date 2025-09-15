const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;

// Google 登入處理
exports.login = passport.authenticate("google", { scope: ["profile", "email"] });

// Google 登入回調處理
exports.callback = [
    passport.authenticate("google", { 
        failureRedirect: "/",
        failureMessage: true 
    }),
    (req, res) => {
        try {
            // 成功登入後，重定向到前端頁面
            const redirect = process.env.CLIENT_REDIRECT_SUCCESS || "http://localhost:3000/paperbase";
            res.redirect(redirect);
        } catch (err) {
            console.error("Google 登入回調錯誤:", err);
            res.redirect("/?error=login_failed");
        }
    }
];
