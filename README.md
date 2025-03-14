# what-to-eat
What would you like to eat or drink?

# what you need to install
backend/
    npm install express axios passport passport-google-oauth20 passport-facebook passport-line dotenv cors mysql2
# 啟動

- npm install 下載套件
- npm run dev 開啟server
-  npm install react-beautiful-dnd 拖移套件
- npm install @mui/material @emotion/react @emotion/styled 下載Mui套件
- npm install next-iron-session 後端用 
- npm install mysql2 後端用
- npm install google-auth-library 後端用
- npm install dotenv

- cd frontend 進入前端 再npm run dev
- cd backend 進入後端 再npm run dev

# 使用套件

- css:
    - scss: 可以使用 Easy Less 幫忙編譯，如果要換 scss or postcss 也可以

- icon:
    - material icon [連結](https://react-icons.github.io/react-icons/icons?name=md)

- sidebar:
    - [連結](https://www.npmjs.com/package/react-pro-sidebar)

- Mui:
    - [連結](https://mui.com/material-ui/getting-started/)

# 說明

- global.d.ts 共用的型態直接放全域，component專屬直接放component內

- API如果是post body
    - config 可以省略
    - 細節內容多到說不完，建議ctrl + 左鍵點 post 可以觀看有哪些設定
      ```js
      API.post("URL_PATH", /* body 內容 */, config);
      ```

--------------------------------------------------------------------
This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.tsx`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.ts`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
