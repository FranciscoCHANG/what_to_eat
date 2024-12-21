const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const FacebookStrategy = require("passport-facebook").Strategy;
const LineStrategy = require("passport-line").Strategy;
const User = require("../models/User");
// 通用驗證邏輯
async function handleAuthentication(provider, provider_no, profile, done) {
    try {
        // 檢查是否已存在該第三方登入記錄
        let user = await User.findUserByProvider(provider, provider_no);
        if (!user) {
            // 如果該第三方登入記錄不存在，檢查 email 是否已存在
            const email = profile.emails?.[0]?.value;
            user = email ? await User.findUserByEmail(email) : null;
            if (!user) {
                // 如果 email 不存在，創建新使用者
                const user_no = await User.createUser(
                    profile.displayName,
                    email || null,
                    profile.photos?.[0]?.value || null
                );
                user = { no: user_no, displayName: profile.displayName, email };
            }
            // 新增第三方驗證記錄
            await User.linkProviderToUser(user.no, provider, provider_no);
        }
        return done(null, user); // 成功驗證
    } catch (err) {
        return done(err, null); // 驗證失敗
    }
}
// Google Strategy
passport.use(
    new GoogleStrategy(
        {
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: process.env.GOOGLE_CALLBACK_URL,
        },
        (accessToken, refreshToken, profile, done) => {
            handleAuthentication("google", profile.id, profile, done);
        }
    )
);
// Facebook Strategy
passport.use(
    new FacebookStrategy(
        {
            clientID: process.env.FB_APP_ID,
            clientSecret: process.env.FB_APP_SECRET,
            callbackURL: process.env.FB_CALLBACK_URL,
            profileFields: ["id", "displayName", "email"],
        },
        (accessToken, refreshToken, profile, done) => {
            handleAuthentication("facebook", profile.id, profile, done);
        }
    )
);
// LINE Strategy
passport.use(
    new LineStrategy(
        {
            channelID: process.env.LINE_CHANNEL_ID,
            channelSecret: process.env.LINE_CHANNEL_SECRET,
            callbackURL: process.env.LINE_CALLBACK_URL,
        },
        (accessToken, refreshToken, profile, done) => {
            handleAuthentication("line", profile.id, profile, done);
        }
    )
);
// 序列化與反序列化
passport.serializeUser((user, done) => {
    done(null, user.id);
});
passport.deserializeUser(async (id, done) => {
    try {
        const user = await User.findUserById(id);
        done(null, user);
    } catch (err) {
        done(err, null);
    }
});
module.exports = passport;