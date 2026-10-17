// 全局数据类型定义，前后台与接口层共用同一套结构

/** 个人信息 */
export interface Profile {
  name: string; // 姓名
  tagline: string; // 一句话介绍
  bio: string; // 个人简介
  avatar: string; // 头像：可以是颜色值（渲染为 SVG），也可以是图片 URL / 相对路径
  email: string; // 邮箱
  location: string; // 所在地
  school: string; // 学校
  major: string; // 专业
}

/** 经历时间线 */
export interface TimelineItem {
  id: string;
  year: string;
  title: string;
  desc: string;
}

/** 技能 */
export interface Skill {
  id: string;
  name: string; // 技能名
  category: string; // 分类：编程 / 兴趣 / 生活
  level: number; // 熟练度 0-100
}

/** 作品 */
export interface Work {
  id: string;
  title: string;
  desc: string;
  tags: string[];
  cover: string; // 封面（存色值，渲染时用 CSS 渐变色块）
  date: string; // YYYY-MM
}

/** 随笔 */
export interface Post {
  id: string;
  title: string;
  summary: string;
  content: string;
  date: string; // YYYY-MM-DD
}

/** 登录态：仅保存令牌，不保存明文密码 */
export interface AuthState {
  token: string;
  expires: number; // 过期时间戳
}
