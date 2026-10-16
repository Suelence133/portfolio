// 后台仪表盘：内容数量概览
import { useEffect, useState } from 'react';
import { getSkills } from '../api/skills';
import { getWorks } from '../api/works';
import { getPosts } from '../api/posts';
import { getTimeline } from '../api/profile';
import { resetAll } from '../api/client';

export default function Dashboard() {
  const [counts, setCounts] = useState({ skills: 0, works: 0, posts: 0, timeline: 0 });

  const load = () => {
    setCounts({
      skills: getSkills().length,
      works: getWorks().length,
      posts: getPosts().length,
      timeline: getTimeline().length,
    });
  };

  useEffect(load, []);

  const handleReset = () => {
    if (!window.confirm('确定要恢复默认内容吗？你做过的修改将被覆盖。')) return;
    resetAll();
    load();
  };

  const items = [
    { label: '技能条目', value: counts.skills },
    { label: '作品数量', value: counts.works },
    { label: '随笔篇数', value: counts.posts },
    { label: '经历条目', value: counts.timeline },
  ];

  return (
    <div className="pt-4">
      <h1 className="text-2xl font-bold">仪表盘</h1>
      <p className="mt-1 text-sm text-muted">在这里可以看到当前网站的内容概况。</p>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {items.map((it) => (
          <div key={it.label} className="rounded-xl border border-line bg-section p-5">
            <p className="text-sm text-muted">{it.label}</p>
            <p className="mt-2 text-3xl font-bold text-brand">{it.value}</p>
          </div>
        ))}
      </div>

      <div className="mt-8 rounded-xl border border-line bg-page p-5">
        <h2 className="text-base font-semibold">使用说明</h2>
        <ul className="mt-3 list-disc space-y-1 pl-5 text-sm leading-6 text-muted">
          <li>在左侧菜单进入对应页面即可增删改内容</li>
          <li>保存后回到前台刷新页面，就能看到最新内容</li>
          <li>数据保存在当前浏览器本地，换浏览器或清缓存后会恢复默认</li>
        </ul>
        <button
          type="button"
          onClick={handleReset}
          className="mt-4 rounded-lg border border-line px-4 py-2 text-sm text-muted transition-colors duration-200 hover:bg-section hover:text-ink"
        >
          恢复默认内容
        </button>
      </div>
    </div>
  );
}
