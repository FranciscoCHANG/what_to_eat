const passport = require("passport");
const LineStrategy = require("passport-line").Strategy;

// LINE 登入處理
exports.login = passport.authenticate("line");

// LINE 登入回調處理
exports.callback = passport.authenticate("line", { failureRedirect: "/" }), (req, res) => {
    res.redirect("/dashboard");
};
