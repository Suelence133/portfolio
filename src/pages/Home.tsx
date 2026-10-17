// 前台首页：单页滚动，包含 Hero / 关于我 / 技能 / 作品 / 随笔 / 联系 六个区块
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import type { Profile, TimelineItem, Skill, Work, Post } from '../types';
import { getProfile, getTimeline } from '../api/profile';
import { getSkills } from '../api/skills';
import { getWorks } from '../api/works';
import { getPosts } from '../api/posts';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Card from '../components/Card';

/** 头像：颜色值渲染为 SVG 色块，图片路径/URL 渲染为 img */
function Avatar({ color, name, size = 96 }: { color: string; name: string; size?: number }) {
  const initial = name.trim().charAt(0) || '·';
  const isImage = /^https?:\/\//.test(color) || color.startsWith('/');
  if (isImage) {
    return (
      <img
        src={color}
        alt={`${name} 的头像`}
        width={size}
        height={size}
        className="rounded-full object-cover"
        style={{ width: size, height: size }}
      />
    );
  }
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" role="img" aria-label={`${name} 的头像`}>
      <defs>
        <linearGradient id="av-g" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={color} />
          <stop offset="100%" stopColor="#F2CC8F" />
        </linearGradient>
      </defs>
      <circle cx="50" cy="50" r="50" fill="url(#av-g)" />
      <text
        x="50"
        y="50"
        textAnchor="middle"
        dominantBaseline="central"
        fontSize="42"
        fill="#FFFFFF"
        fontFamily="system-ui, sans-serif"
      >
        {initial}
      </text>
    </svg>
  );
}

/** 作品封面：用 CSS 渐变色块代替图片，避免外部资源依赖 */
function Cover({ color, title }: { color: string; title: string }) {
  return (
    <div
      className="flex h-36 items-end rounded-lg p-3"
      style={{ background: `linear-gradient(135deg, ${color} 0%, #F2CC8F 100%)` }}
      role="img"
      aria-label={`${title} 的封面`}
    >
      <span className="rounded bg-white/70 px-2 py-1 text-xs font-medium text-ink">
        {title}
      </span>
    </div>
  );
}

export default function Home() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [timeline, setTimeline] = useState<TimelineItem[]>([]);
  const [skills, setSkills] = useState<Skill[]>([]);
  const [works, setWorks] = useState<Work[]>([]);
  const [posts, setPosts] = useState<Post[]>([]);
  const [copied, setCopied] = useState(false);

  // 进入页面时统一从接口层读取，保证后台改动能同步显示
  useEffect(() => {
    setProfile(getProfile());
    setTimeline(getTimeline());
    setSkills(getSkills());
    setWorks(getWorks());
    setPosts(getPosts());
  }, []);

  if (!profile) return null;

  // 技能按分类分组展示
  const grouped: Record<string, Skill[]> = {};
  for (const s of skills) {
    if (!grouped[s.category]) grouped[s.category] = [];
    grouped[s.category].push(s);
  }

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      window.prompt('复制以下邮箱：', profile.email);
    }
  };

  return (
    <div className="min-h-screen bg-page text-ink">
      <Navbar />

      {/* Hero */}
      <section id="home" className="scroll-mt-20 bg-section pt-28 pb-16">
        <div className="mx-auto max-w-content px-4 sm:px-6">
          <div className="flex flex-col items-center gap-6 text-center sm:flex-row sm:items-center sm:text-left">
            <div className="shrink-0 overflow-hidden rounded-full shadow-soft">
              <Avatar color={profile.avatar} name={profile.name} size={104} />
            </div>
            <div>
              <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">{profile.name}</h1>
              <p className="mt-2 text-base text-muted sm:text-lg">{profile.tagline}</p>
              <div className="mt-5 flex flex-wrap justify-center gap-3 sm:justify-start">
                <a
                  href="#works"
                  className="rounded-xl bg-brand px-5 py-2.5 text-sm font-medium text-white transition-opacity duration-200 hover:opacity-90"
                >
                  看看我的作品
                </a>
                <a
                  href="#contact"
                  className="rounded-xl border border-line bg-page px-5 py-2.5 text-sm font-medium text-ink transition-colors duration-200 hover:bg-section"
                >
                  联系我
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 关于我 */}
      <section id="about" className="scroll-mt-20 py-16">
        <div className="mx-auto max-w-content px-4 sm:px-6">
          <h2 className="text-2xl font-bold">关于我</h2>
          <p className="mt-4 max-w-3xl leading-7 text-muted">{profile.bio}</p>

          <div className="mt-8 grid gap-6 md:grid-cols-2">
            <Card>
              <h3 className="text-lg font-semibold">教育背景</h3>
              <p className="mt-3 text-sm text-muted">{profile.school}</p>
              <p className="mt-1 text-sm text-muted">{profile.major}</p>
              <p className="mt-3 text-sm text-muted">所在地：{profile.location}</p>
            </Card>
            <Card>
              <h3 className="text-lg font-semibold">经历时间线</h3>
              <ol className="mt-3 space-y-4">
                {timeline.map((t) => (
                  <li key={t.id} className="flex gap-3">
                    <span className="mt-0.5 shrink-0 rounded bg-accent/40 px-2 py-0.5 text-xs font-medium text-ink">
                      {t.year}
                    </span>
                    <div>
                      <p className="text-sm font-medium">{t.title}</p>
                      <p className="mt-0.5 text-sm text-muted">{t.desc}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </Card>
          </div>
        </div>
      </section>

      {/* 技能 */}
      <section id="skills" className="scroll-mt-20 bg-section py-16">
        <div className="mx-auto max-w-content px-4 sm:px-6">
          <h2 className="text-2xl font-bold">我会的一些事</h2>
          <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {Object.keys(grouped).map((cat) => (
              <Card key={cat}>
                <h3 className="text-lg font-semibold">{cat}</h3>
                <ul className="mt-4 space-y-4">
                  {grouped[cat].map((s) => (
                    <li key={s.id}>
                      <div className="flex items-center justify-between text-sm">
                        <span>{s.name}</span>
                        <span className="text-muted">{s.level}</span>
                      </div>
                      <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-line">
                        <div
                          className="h-full rounded-full bg-brand transition-all duration-300"
                          style={{ width: `${s.level}%` }}
                        />
                      </div>
                    </li>
                  ))}
                </ul>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* 作品 */}
      <section id="works" className="scroll-mt-20 py-16">
        <div className="mx-auto max-w-content px-4 sm:px-6">
          <h2 className="text-2xl font-bold">作品与记录</h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {works.map((w) => (
              <Card key={w.id} className="flex flex-col">
                <Cover color={w.cover} title={w.title} />
                <h3 className="mt-4 text-base font-semibold">{w.title}</h3>
                <p className="mt-2 flex-1 text-sm leading-6 text-muted">{w.desc}</p>
                <div className="mt-4 flex flex-wrap items-center gap-2">
                  {w.tags.map((t) => (
                    <span key={t} className="rounded bg-accent/40 px-2 py-0.5 text-xs text-ink">
                      {t}
                    </span>
                  ))}
                  <span className="ml-auto text-xs text-muted">{w.date}</span>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* 随笔 */}
      <section id="posts" className="scroll-mt-20 bg-section py-16">
        <div className="mx-auto max-w-content px-4 sm:px-6">
          <h2 className="text-2xl font-bold">生活随笔</h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((p) => (
              <Card key={p.id} className="flex flex-col">
                <p className="text-xs text-muted">{p.date}</p>
                <h3 className="mt-2 text-base font-semibold">{p.title}</h3>
                <p className="mt-2 flex-1 text-sm leading-6 text-muted">{p.summary}</p>
                <Link
                  to={`/posts/${p.id}`}
                  className="mt-4 inline-block text-sm font-medium text-brand hover:underline"
                >
                  阅读全文 →
                </Link>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* 联系 */}
      <section id="contact" className="scroll-mt-20 py-16">
        <div className="mx-auto max-w-content px-4 sm:px-6">
          <h2 className="text-2xl font-bold">联系我</h2>
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            <Card>
              <h3 className="text-lg font-semibold">邮箱</h3>
              <p className="mt-2 text-sm text-muted">{profile.email}</p>
              <button
                type="button"
                onClick={copyEmail}
                className="mt-4 rounded-xl bg-brand px-4 py-2 text-sm font-medium text-white transition-opacity duration-200 hover:opacity-90"
              >
                {copied ? '已复制 ✓' : '一键复制邮箱'}
              </button>
            </Card>
            <Card>
              <h3 className="text-lg font-semibold">小提示</h3>
              <p className="mt-2 text-sm leading-6 text-muted">
                这个网站的内容都由我自己在后台维护。想修改展示的信息，点右上角「后台管理」登录即可。
              </p>
            </Card>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
