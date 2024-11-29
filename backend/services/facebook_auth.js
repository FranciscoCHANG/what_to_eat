const passport = require("passport");
const FacebookStrategy = require("passport-facebook").Strategy;

// Facebook 登入處理
exports.login = passport.authenticate("facebook", { scope: ["email"] });

// Facebook 登入回調處理
exports.callback = passport.authenticate("facebook", { failureRedirect: "/" }), (req, res) => {
    res.redirect("/dashboard");
};
