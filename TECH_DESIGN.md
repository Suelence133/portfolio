# 个人展示网站 技术设计文档（TECH_DESIGN）

> 版本：v1.0
> 更新日期：2026-10-16
> 技术栈遵循课程示例：React + TypeScript + Vite + Tailwind CSS

---

## 一、技术栈选择

| 层 | 选型 | 理由 |
|---|---|---|
| 框架 | React 18 | 组件化开发，状态管理清晰 |
| 语言 | TypeScript | 类型安全，减少低级错误 |
| 构建 | Vite | 启动快、热更新快 |
| 样式 | Tailwind CSS | 快速开发，风格统一，便于响应式 |
| 路由 | React Router v6 | 前后台路由隔离，支持路由守卫 |
| 表单 | react-hook-form | 轻量表单管理 |
| 校验 | zod | 声明式校验，与表单库配合良好 |
| 数据 | localStorage 模拟 API 层 | 免后端实现完整闭环，后续可替换为真实接口 |
| 部署 | Vercel 或 Cloudflare Pages | 免费托管，支持 GitHub 自动部署 |

### 目录中的 `src/api/` 统一接口层

按课程要求，所有数据读写通过 `src/api/` 下的统一接口层完成，**先使用 localStorage 模拟**，后续替换为真实后端时只需改动这一层，页面代码不用动。

---

## 二、项目结构

```
portfolio/
├── index.html                  # Vite 入口 HTML
├── package.json
├── vite.config.ts
├── tailwind.config.js
├── tsconfig.json
├── PRD.md
├── TECH_DESIGN.md
├── AGENTS.md
└── src/
    ├── main.tsx                # 应用入口
    ├── App.tsx                 # 路由配置
    ├── index.css               # Tailwind 引入 + 全局样式变量
    ├── types/                  # TypeScript 类型定义
    │   └── index.ts
    ├── api/                    # 统一数据接口层（localStorage 实现）
    │   ├── client.ts           # 基础读写封装
    │   ├── profile.ts
    │   ├── skills.ts
    │   ├── works.ts
    │   ├── posts.ts
    │   └── auth.ts
    ├── components/             # 通用组件
    │   ├── Navbar.tsx
    │   ├── Footer.tsx
    │   └── Card.tsx
    ├── pages/                  # 前台页面
    │   ├── Home.tsx            # 单页滚动首页（含各区块）
    │   └── PostDetail.tsx      # 随笔详情
    ├── admin/                  # 后台页面
    │   ├── AdminLayout.tsx     # 侧边栏 + 顶栏
    │   ├── Login.tsx
    │   ├── Dashboard.tsx
    │   ├── ProfileManage.tsx
    │   ├── SkillsManage.tsx
    │   ├── WorksManage.tsx
    │   ├── PostsManage.tsx
    │   └── RequireAuth.tsx     # 路由守卫
    └── data/
        └── defaults.ts         # 首次加载的默认数据
```

---

## 三、数据模型

所有数据以 JSON 形式存放在浏览器本地存储，后台写入、前台读取，共用同一份。

### 3.1 个人信息（Profile）

```ts
interface Profile {
  name: string;        // 姓名
  tagline: string;     // 一句话介绍
  bio: string;         // 个人简介
  avatar: string;      // 头像（内联 SVG 或占位）
  email: string;       // 邮箱
  location: string;    // 所在地
  school: string;      // 学校
  major: string;       // 专业
}
```

### 3.2 经历时间线（TimelineItem）

```ts
interface TimelineItem {
  id: string;
  year: string;
  title: string;
  desc: string;
}
```

### 3.3 技能（Skill）

```ts
interface Skill {
  id: string;
  name: string;        // 技能名
  category: string;    // 分类：编程 / 兴趣 / 生活
  level: number;       // 熟练度 0–100
}
```

### 3.4 作品（Work）

```ts
interface Work {
  id: string;
  title: string;
  desc: string;
  tags: string[];
  cover: string;       // 封面（占位色块或内联 SVG）
  date: string;        // YYYY-MM
}
```

### 3.5 随笔（Post）

```ts
interface Post {
  id: string;
  title: string;
  summary: string;
  content: string;
  date: string;        // YYYY-MM-DD
}
```

### 3.6 登录态（Auth）

```ts
interface AuthState {
  token: string;       // 登录后生成的令牌（非明文密码）
  expires: number;     // 过期时间戳
}
```

> 安全：密码不明文存储，仅保存令牌；令牌过期后需重新登录。

---

## 四、关键技术点

### 4.1 路由设计

| 路径 | 说明 |
|---|---|
| `/` | 前台首页（单页滚动） |
| `/posts/:id` | 随笔详情 |
| `/admin/login` | 后台登录 |
| `/admin` | 仪表盘 |
| `/admin/profile` | 个人信息管理 |
| `/admin/skills` | 技能管理 |
| `/admin/works` | 作品管理 |
| `/admin/posts` | 随笔管理 |

后台路由统一挂在 `/admin` 下，与前台隔离；通过 `RequireAuth` 组件实现路由守卫。

### 4.2 数据同步（后台改 → 前台读）

- 所有读写走 `src/api/`，前后台共用同一套接口
- 后台保存时写入 localStorage，前台加载时读取，刷新即可看到更新
- 首次访问若本地无数据，从 `src/data/defaults.ts` 写入一份默认数据

### 4.3 路由守卫实现

- `RequireAuth` 组件在渲染前检查本地存储中的令牌是否有效
- 无令牌或已过期 → 重定向到 `/admin/login`
- 登录成功 → 写入令牌，跳转 `/admin`

### 4.4 表单与校验

- 使用 `react-hook-form` 管理表单状态
- 使用 `zod` 定义校验规则：必填校验、熟练度数值范围、邮箱格式
- 校验失败时在对应字段下方显示中文错误提示
- 所有删除操作弹出二次确认

### 4.5 暖色系主题实现

- 在 `tailwind.config.js` 中扩展自定义颜色（暖白、米色、陶土橙、暖黄、暖褐）
- 全局 CSS 变量定义在 `index.css` 的 `:root` 中，便于统一调整
- 组件统一使用圆角 `rounded-xl`、柔和阴影 `shadow-sm`

### 4.6 响应式实现

- Tailwind 断点：`sm:640px`、`md:768px`、`lg:1024px`
- 卡片网格：`grid-cols-1 md:grid-cols-2 lg:grid-cols-3`
- 后台侧边栏在移动端折叠为顶部横向菜单

---

## 五、非功能性需求

| 类型 | 要求 |
|---|---|
| 性能 | 首屏加载 < 3s，交互无明显卡顿 |
| 兼容 | Chrome / Edge 110+，移动端 Safari |
| 可维护 | 数据操作集中在 `src/api/`，页面不直接操作 localStorage |
| 安全 | 密码不明文存储；后台入口令牌校验 |
| 易用 | 后台表单即时反馈，错误提示通俗易懂 |

---

## 六、部署方案

1. 项目推送到 GitHub 仓库
2. Vercel（或 Cloudflare Pages）选择「Import from GitHub」
3. 框架预设自动识别为 **Vite**，构建命令 `npm run build`，输出目录 `dist`
4. 部署完成后平台分配访问域名
5. 后续每次推送 GitHub，平台自动触发重新部署

---

## 七、开发命令

```bash
# 安装依赖
npm install

# 本地开发
npm run dev

# 构建产物
npm run build
```
