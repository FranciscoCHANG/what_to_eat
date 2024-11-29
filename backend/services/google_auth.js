const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;

// Google 登入處理
exports.login = passport.authenticate("google", { scope: ["profile", "email"] });

// Google 登入回調處理
exports.callback = passport.authenticate("google", { failureRedirect: "/" }), (req, res) => {
    res.redirect("/dashboard");
};
