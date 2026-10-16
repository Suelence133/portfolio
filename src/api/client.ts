// 本地存储基础读写封装：所有 api 模块都通过这里访问 storage，页面组件不允许直接调用 localStorage
import {
  defaultProfile,
  defaultTimeline,
  defaultSkills,
  defaultWorks,
  defaultPosts,
} from '../data/defaults';

const PREFIX = 'portfolio:';

export const STORAGE_KEYS = {
  profile: PREFIX + 'profile',
  timeline: PREFIX + 'timeline',
  skills: PREFIX + 'skills',
  works: PREFIX + 'works',
  posts: PREFIX + 'posts',
  auth: PREFIX + 'auth',
} as const;

/** 读取，解析失败时回退到默认值 */
export function read<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    if (raw === null) return fallback;
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

/** 写入 */
export function write<T>(key: string, value: T): void {
  localStorage.setItem(key, JSON.stringify(value));
}

/** 删除 */
export function remove(key: string): void {
  localStorage.removeItem(key);
}

/** 生成简单唯一 id */
export function uid(): string {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
}

/**
 * 首次访问时写入默认数据，保证页面不空白。
 * 只补缺失的键，避免覆盖用户已经改过的内容。
 */
export function ensureSeed(): void {
  if (localStorage.getItem(STORAGE_KEYS.profile) === null) {
    write(STORAGE_KEYS.profile, defaultProfile);
  }
  if (localStorage.getItem(STORAGE_KEYS.timeline) === null) {
    write(STORAGE_KEYS.timeline, defaultTimeline);
  }
  if (localStorage.getItem(STORAGE_KEYS.skills) === null) {
    write(STORAGE_KEYS.skills, defaultSkills);
  }
  if (localStorage.getItem(STORAGE_KEYS.works) === null) {
    write(STORAGE_KEYS.works, defaultWorks);
  }
  if (localStorage.getItem(STORAGE_KEYS.posts) === null) {
    write(STORAGE_KEYS.posts, defaultPosts);
  }
}

/** 恢复出厂数据（后台仪表盘可用） */
export function resetAll(): void {
  remove(STORAGE_KEYS.profile);
  remove(STORAGE_KEYS.timeline);
  remove(STORAGE_KEYS.skills);
  remove(STORAGE_KEYS.works);
  remove(STORAGE_KEYS.posts);
  ensureSeed();
}
