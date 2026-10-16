// 后台布局：侧边栏 + 顶栏 + 内容区
import { useState } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { logout } from '../api/auth';

const MENU = [
  { to: '/admin', label: '仪表盘', end: true },
  { to: '/admin/profile', label: '个人信息', end: false },
  { to: '/admin/skills', label: '技能管理', end: false },
  { to: '/admin/works', label: '作品管理', end: false },
  { to: '/admin/posts', label: '随笔管理', end: false },
];

export default function AdminLayout() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const handleLogout = () => {
    if (!window.confirm('确定要退出登录吗？')) return;
    logout();
    navigate('/admin/login', { replace: true });
  };

  return (
    <div className="min-h-screen bg-page text-ink">
      {/* 顶栏 */}
      <header className="fixed inset-x-0 top-0 z-30 flex h-14 items-center justify-between border-b border-line bg-page/90 px-4 backdrop-blur-md sm:px-6">
        <div className="flex items-center gap-3">
          <button
            type="button"
            aria-label="切换菜单"
            onClick={() => setOpen((v) => !v)}
            className="rounded-lg border border-line p-2 lg:hidden"
          >
            <svg width="18" height="18" viewBox="0 0 20 20" fill="none" aria-hidden="true">
              <path d="M3 6h14M3 10h14M3 14h14" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
            </svg>
          </button>
          <span className="font-semibold">后台管理</span>
        </div>
        <div className="flex items-center gap-3">
          <a href="/" target="_blank" rel="noreferrer" className="text-sm text-muted hover:text-ink">
            查看前台 ↗
          </a>
          <button
            type="button"
            onClick={handleLogout}
            className="rounded-lg border border-line px-3 py-1.5 text-sm text-muted transition-colors duration-200 hover:bg-section hover:text-ink"
          >
            退出登录
          </button>
        </div>
      </header>

      {/* 侧边栏：移动端折叠为顶部横向菜单 */}
      <aside
        className={
          'fixed left-0 top-14 z-20 w-52 border-r border-line bg-page px-3 py-4 lg:block ' +
          (open ? 'block' : 'hidden')
        }
      >
        <nav className="flex flex-col gap-1">
          {MENU.map((m) => (
            <NavLink
              key={m.to}
              to={m.to}
              end={m.end}
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                'rounded-lg px-3 py-2 text-sm transition-colors duration-200 ' +
                (isActive ? 'bg-section font-medium text-brand' : 'text-muted hover:bg-section hover:text-ink')
              }
            >
              {m.label}
            </NavLink>
          ))}
        </nav>
      </aside>

      <main className="px-4 pb-16 pt-20 sm:px-6 lg:pl-56">
        <div className="mx-auto max-w-content">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
