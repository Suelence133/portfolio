// 登录态接口：只保存令牌，密码不明文落地
import type { AuthState } from '../types';
import { STORAGE_KEYS, read, write, remove, uid } from './client';

/** 演示用单用户账号（本期范围，仅用于作业演示） */
export const DEMO_ACCOUNT = 'admin';
export const DEMO_PASSWORD = 'admin123';

const TTL = 2 * 60 * 60 * 1000; // 登录态有效期 2 小时

export interface LoginResult {
  ok: boolean;
  message: string;
}

export function login(account: string, password: string): LoginResult {
  if (account.trim() !== DEMO_ACCOUNT || password !== DEMO_PASSWORD) {
    return { ok: false, message: '账号或密码不正确，请重试' };
  }
  const state: AuthState = {
    token: 'tk_' + uid() + uid(),
    expires: Date.now() + TTL,
  };
  write(STORAGE_KEYS.auth, state);
  return { ok: true, message: '登录成功' };
}

/** 令牌是否有效，过期则自动清除 */
export function isAuthed(): boolean {
  const state = read<AuthState | null>(STORAGE_KEYS.auth, null);
  if (!state || !state.token) return false;
  if (state.expires < Date.now()) {
    remove(STORAGE_KEYS.auth);
    return false;
  }
  return true;
}

export function logout(): void {
  remove(STORAGE_KEYS.auth);
}
