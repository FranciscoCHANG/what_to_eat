const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const FacebookStrategy = require("passport-facebook").Strategy;
const LineStrategy = require("passport-line").Strategy;

passport.use(
    new GoogleStrategy(
        {
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: "http://localhost:4000/auth/google/callback",
        },
        (accessToken, refreshToken, profile, done) => {
            // 這裡可以寫資料庫邏輯，儲存用戶資料
            return done(null, profile);
        }
    )
);

passport.use(
    new FacebookStrategy(
        {
            clientID: process.env.FB_APP_ID,
            clientSecret: process.env.FB_APP_SECRET,
            callbackURL: "http://localhost:4000/auth/facebook/callback",
            profileFields: ["id", "displayName", "email"],
        },
        (accessToken, refreshToken, profile, done) => {
            // 這裡可以寫資料庫邏輯，儲存用戶資料
            return done(null, profile);
        }
    )
);

passport.use(
    new LineStrategy(
        {
            channelID: process.env.LINE_CHANNEL_ID,
            channelSecret: process.env.LINE_CHANNEL_SECRET,
            callbackURL: "http://localhost:4000/auth/line/callback",
        },
        (accessToken, refreshToken, profile, done) => {
            // 這裡可以寫資料庫邏輯，儲存用戶資料
            return done(null, profile);
        }
    )
);

// 設定序列化與反序列化
passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((user, done) => {
    done(null, user);
});
