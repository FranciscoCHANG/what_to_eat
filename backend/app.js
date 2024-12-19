require('dotenv').config(); // 加载 .env 文件
const express = require('express');
const session = require('express-session');
const cors = require('cors');
const passport = require('./config/passport');
const authRoutes = require('./routes/auth');

const app = express();

// 解構環境變數
const { SESSION_SECRET } = process.env;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 配置CORS
app.use(cors({
    origin: 'http://localhost:3000',  // 根據你的前端應用配置
    credentials: true
}));

// 配置 Session 中間件
app.use(session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: process.env.NODE_ENV === 'production',  // 在生產環境中設置為 true
        maxAge: 1000 * 60 * 60 * 24,  // 有效期為一天
    },
}));

// // 使用 Passport 中間件
// app.use(passport.initialize());
// app.use(passport.session());

// API 路由
app.use('/api/auth', authRoutes);  // 認證相關路由

// 404 錯誤處理
app.use((req, res, next) => {
    res.status(404).send('Not Found');
});

// 全域錯誤處理
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

// 啟動伺服器
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
