# What to Eat - 前端專案

## 專案架構

```
frontend/
├── components/
│   ├── dashboard/           # 儀表板頁面元件
│   │   ├── StoreList.tsx           # 店家列表
│   │   ├── MenuManagement.tsx      # 菜單管理
│   │   ├── BusinessHours.tsx       # 營業時間管理
│   │   ├── UserManagement.tsx      # 使用者管理
│   │   ├── DataAnalytics.tsx       # 資料分析
│   │   ├── SystemSettings.tsx      # 系統設定
│   │   └── RecommendationSystem.tsx # 推薦系統
│   ├── Navigator.tsx       # 左側導航元件
│   ├── Header.tsx          # 頂部標題元件
│   └── Paperbase.tsx       # 主要儀表板容器
├── pages/                  # Next.js 路由頁面
│   ├── index.tsx           # 首頁
│   ├── paperbase.tsx       # 儀表板頁面
│   ├── _app.tsx            # 應用程式入口
│   ├── _document.tsx       # 文件模板
│   ├── api/                # API 路由
│   └── fonts/              # 字體檔案
├── public/                 # 靜態資源
├── styles/                 # 樣式檔案
└── package.json
```

## 技術棧

- **Next.js 15** - React 框架
- **React 18** - 前端框架
- **TypeScript** - 型別安全
- **Material-UI (MUI) v6** - UI 元件庫
- **Tailwind CSS** - 原子化 CSS 框架
- **Emotion** - CSS-in-JS

## 功能模組

### 1. 店家列表 (StoreList)
- 顯示所有合作店家
- 新增、編輯、查看店家資訊
- 搜尋和篩選功能

### 2. 菜單管理 (MenuManagement)
- 管理各店家的菜單內容
- 新增、編輯菜單項目
- 菜單狀態管理

### 3. 營業時間管理 (BusinessHours)
- 設定店家營業時間
- 批量編輯功能
- 營業狀態顯示

### 4. 使用者管理 (UserManagement)
- 系統使用者管理
- 角色權限控制
- 使用者狀態管理

### 5. 資料分析 (DataAnalytics)
- 系統使用統計
- 熱門店家排行
- 使用者行為分析

### 6. 系統設定 (SystemSettings)
- 通知設定
- 安全設定
- 資料庫設定
- 一般設定

### 7. 推薦系統 (RecommendationSystem)
- AI 推薦演算法設定
- 個人化程度調整
- 推薦統計分析

## 開發指南

### 啟動開發伺服器
```bash
cd frontend
npm install
npm run dev
```

### 建置專案
```bash
npm run build
```

### 程式碼檢查
```bash
npm run lint
```

## 頁面路由

- `/` - 首頁（包含登入按鈕）
- `/paperbase` - 主要儀表板

## 元件說明

### 核心元件
- **Paperbase.tsx** - 主要儀表板容器，處理路由切換
- **Navigator.tsx** - 左側導航，處理頁面切換
- **Header.tsx** - 頂部標題欄，包含通知和設定

### 頁面元件
所有頁面元件都位於 `components/dashboard/` 目錄下，每個元件都是獨立的，包含：
- 完整的 UI 介面
- 模擬資料
- 事件處理函數
- 響應式設計

## 設計原則

1. **模組化** - 每個功能都是獨立的元件
2. **可擴展** - 易於添加新功能和頁面
3. **一致性** - 統一的設計語言和互動模式
4. **響應式** - 適配不同螢幕尺寸
5. **可維護** - 清晰的程式碼結構和註解

## 後續開發

- 連接後端 API
- 實作真實的資料處理
- 添加更多互動功能
- 優化效能和載入速度
- 添加單元測試
