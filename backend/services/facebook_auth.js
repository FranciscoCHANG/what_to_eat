const passport = require("passport");
const FacebookStrategy = require("passport-facebook").Strategy;

// Facebook 登入處理
exports.login = passport.authenticate("facebook", { scope: ["email"] });

// Facebook 登入回調處理
exports.callback = [
  passport.authenticate("facebook", { 
    failureRedirect: "/",
    failureMessage: true 
  }),
  (req, res) => {
    try {
      const redirect = process.env.CLIENT_REDIRECT_SUCCESS || "http://localhost:3000/paperbase";
      res.redirect(redirect);
    } catch (err) {
      console.error("Facebook 登入回調錯誤:", err);
      res.redirect("/?error=login_failed");
    }
  }
];
