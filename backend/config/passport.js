const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const FacebookStrategy = require("passport-facebook").Strategy;
const LineStrategy = require("passport-line").Strategy;
const axios = require("axios");
const User = require("../models/User");

// 通用驗證邏輯
async function handleAuthentication(provider, provider_id, profile, done) {
    try {
        // 檢查是否已存在該第三方登入記錄
        let user = await User.findUserByProvider(provider, provider_id);
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
            if (user.user_no) {
                await User.linkProviderToUser(user.user_no, provider, provider_id);
            } else {
                throw new Error("Failed to create or find user_no");
            }        
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
            scope: ['profile', 'openid', 'email'], // 確保請求 email 權限
        },
        async (accessToken, refreshToken, profile, done) => {
            try {
                // 使用 Access Token 向 LINE OpenID Token Endpoint 請求 email
                const userInfo = await getLineUserEmail(accessToken);

                // 將 email 資料加入 profile
                profile.emails = [{ value: userInfo.email }]; // LINE 回傳的 email 格式

                // 調用 handleAuthentication，傳入帶有 email 的 profile
                handleAuthentication("line", profile.id, profile, done);
            } catch (err) {
                console.error("Error fetching email from LINE:", err);
                done(err);
            }
        }
    )
);

// 函數：使用 Access Token 取得 LINE 的 email 資料
async function getLineUserEmail(accessToken) {
    try {
        const response = await axios.get("https://api.line.me/oauth2/v2.1/verify", {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });

        // LINE 的 email 資料位於 token payload 中
        const data = response.data;
        return { email: data.email }; // 回傳 email 資料
    } catch (err) {
        console.error("Error fetching LINE email:", err);
        throw err;
    }
}


// 序列化用戶到 session
passport.serializeUser((user, done) => {
    if (!user || !user.user_no) {
        // 確保用戶數據有必要的屬性
        return done(new Error("User data is invalid during serialization."));
    }
    done(null, user.user_no); // 存入 user_no 作為 session 的標識
});

// 從 session 中反序列化用戶
passport.deserializeUser(async (user_no, done) => {
    try {
        // 查找用戶數據
        const user = await User.findUserById(user_no); // 這裡需要實現 `findUserById`
        if (!user) {
            return done(new Error("User not found during deserialization."));
        }
        done(null, user); // 將用戶數據傳遞到請求物件
    } catch (err) {
        done(err);
    }
});

module.exports = passport;