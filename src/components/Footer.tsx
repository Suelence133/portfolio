// 页脚
export default function Footer() {
  return (
    <footer className="mt-16 border-t border-line bg-section">
      <div className="mx-auto max-w-content px-4 py-8 sm:px-6">
        <p className="text-sm text-muted">
          © {new Date().getFullYear()} 晏夙萱 · 用 React + TypeScript + Vite 搭的小站
        </p>
        <p className="mt-1 text-xs text-muted">记录生活、展示兴趣、分享日常想法。</p>
      </div>
    </footer>
  );
}
