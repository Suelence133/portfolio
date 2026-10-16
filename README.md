# 个人展示网站（Portfolio）

一个暖色系的个人展示网站，前台展示个人介绍、技能、作品与生活随笔，后台登录后可直接修改这些内容。

## 技术栈

React 18 + TypeScript + Vite + Tailwind CSS + React Router v6

## 本地运行

```bash
npm install
npm run dev      # 开发预览 http://localhost:5173
npm run build    # 构建产物输出到 dist
```

## 后台入口

- 地址：`/admin`
- 演示账号：`admin` ／ 密码：`admin123`
- 未登录访问后台会自动跳转到登录页

## 数据说明

数据保存在浏览器 localStorage 中，后台保存后回到前台刷新即可看到更新。更换浏览器或清除缓存后恢复默认内容。

## 文档

- `PRD.md` —— 产品需求文档
- `TECH_DESIGN.md` —— 技术设计文档
- `AGENTS.md` —— AI 开发规范
