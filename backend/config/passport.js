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
                user = { user_no, displayName: profile.displayName, email };
            }
            // 新增第三方驗證記錄
            const normalizedUserNo = user.user_no ?? user.no;
            if (normalizedUserNo) {
                await User.linkProviderToUser(normalizedUserNo, provider, provider_id);
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
                // 使用 Access Token 向 LINE API 請求使用者資料
                const userInfo = await getLineUserEmail(accessToken);

                // 將 email 和圖片資料加入 profile
                profile.emails = userInfo.email ? [{ value: userInfo.email }] : [];
                profile.photos = userInfo.pictureUrl ? [{ value: userInfo.pictureUrl }] : [];
                profile.displayName = userInfo.displayName || profile.displayName;

                // 調用 handleAuthentication，傳入帶有完整資料的 profile
                handleAuthentication("line", profile.id, profile, done);
            } catch (err) {
                console.error("Error fetching user info from LINE:", err);
                done(err);
            }
        }
    )
);

// 函數：使用 Access Token 取得 LINE 的使用者資料
async function getLineUserEmail(accessToken) {
    try {
        const response = await axios.get("https://api.line.me/v2/profile", {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });

        // LINE 的 email 資料需要額外請求
        const profile = response.data;
        
        // 嘗試獲取 email（需要額外的 API 調用）
        try {
            const emailResponse = await axios.get("https://api.line.me/oauth2/v2.1/userinfo", {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });
            return { 
                email: emailResponse.data.email || null,
                displayName: profile.displayName,
                pictureUrl: profile.pictureUrl
            };
        } catch (emailErr) {
            // 如果無法獲取 email，至少回傳基本資料
            console.warn("無法獲取 LINE email:", emailErr.message);
            return { 
                email: null,
                displayName: profile.displayName,
                pictureUrl: profile.pictureUrl
            };
        }
    } catch (err) {
        console.error("Error fetching LINE profile:", err);
        throw err;
    }
}


// 序列化用戶到 session
passport.serializeUser((user, done) => {
    const normalizedUserNo = user?.user_no ?? user?.no;
    if (!normalizedUserNo) {
        // 確保用戶數據有必要的屬性
        return done(new Error("User data is invalid during serialization."));
    }
    done(null, normalizedUserNo); // 存入 user_no 作為 session 的標識
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