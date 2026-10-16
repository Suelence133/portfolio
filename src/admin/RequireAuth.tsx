// 路由守卫：渲染前校验令牌，无效则跳转登录页
import type { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { isAuthed } from '../api/auth';

export default function RequireAuth({ children }: { children: ReactNode }) {
  if (!isAuthed()) {
    return <Navigate to="/admin/login" replace />;
  }
  return <>{children}</>;
}
