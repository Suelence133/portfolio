// 前台顶部导航：吸顶 + 毛玻璃 + 锚点高亮 + 移动端汉堡菜单
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export const SECTIONS = [
  { id: 'home', label: '首页' },
  { id: 'about', label: '关于我' },
  { id: 'skills', label: '技能' },
  { id: 'works', label: '作品' },
  { id: 'posts', label: '随笔' },
  { id: 'contact', label: '联系' },
];

export default function Navbar() {
  const [active, setActive] = useState('home');
  const [open, setOpen] = useState(false);

  // 滚动时判断当前所处区块，用于导航高亮
  useEffect(() => {
    const onScroll = () => {
      let current = SECTIONS[0].id;
      for (const s of SECTIONS) {
        const el = document.getElementById(s.id);
        if (el && el.getBoundingClientRect().top <= 140) current = s.id;
      }
      setActive(current);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-40 border-b border-line bg-page/80 backdrop-blur-md">
      <nav className="mx-auto flex h-16 max-w-content items-center justify-between px-4 sm:px-6">
        <a href="#home" className="text-lg font-semibold tracking-tight text-ink">
          晏夙萱<span className="text-brand">.</span>
        </a>

        {/* 桌面端菜单 */}
        <ul className="hidden items-center gap-1 md:flex">
          {SECTIONS.map((s) => (
            <li key={s.id}>
              <a
                href={'#' + s.id}
                className={
                  'rounded-lg px-3 py-2 text-sm transition-colors duration-200 ' +
                  (active === s.id
                    ? 'bg-section text-brand font-medium'
                    : 'text-muted hover:bg-section hover:text-ink')
                }
              >
                {s.label}
              </a>
            </li>
          ))}
          <li>
            <Link
              to="/admin"
              className="ml-2 rounded-lg bg-brand px-3 py-2 text-sm font-medium text-white transition-opacity duration-200 hover:opacity-90"
            >
              后台管理
            </Link>
          </li>
        </ul>

        {/* 移动端汉堡按钮 */}
        <button
          type="button"
          aria-label="打开菜单"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="rounded-lg border border-line p-2 text-ink md:hidden"
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
            <path d="M3 6h14M3 10h14M3 14h14" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          </svg>
        </button>
      </nav>

      {/* 移动端展开面板 */}
      {open && (
        <div className="border-t border-line bg-page px-4 pb-4 md:hidden">
          <ul className="flex flex-col gap-1 py-2">
            {SECTIONS.map((s) => (
              <li key={s.id}>
                <a
                  href={'#' + s.id}
                  onClick={() => setOpen(false)}
                  className={
                    'block rounded-lg px-3 py-2 text-sm transition-colors duration-200 ' +
                    (active === s.id ? 'bg-section text-brand font-medium' : 'text-muted')
                  }
                >
                  {s.label}
                </a>
              </li>
            ))}
            <li>
              <Link
                to="/admin"
                onClick={() => setOpen(false)}
                className="mt-1 block rounded-lg bg-brand px-3 py-2 text-sm font-medium text-white"
              >
                后台管理
              </Link>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
