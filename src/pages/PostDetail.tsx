// 随笔详情页
import { useEffect, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import type { Post } from '../types';
import { getPostById } from '../api/posts';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function PostDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [post, setPost] = useState<Post | null>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (!id) return;
    setPost(getPostById(id) ?? null);
    setLoaded(true);
  }, [id]);

  // 数据未加载完成时不渲染内容，避免闪一下空白
  if (!loaded) return null;

  if (!post) {
    return (
      <div className="min-h-screen bg-page">
        <Navbar />
        <div className="mx-auto max-w-content px-4 pt-32 pb-20 text-center sm:px-6">
          <p className="text-muted">没有找到这篇随笔，它可能已经被删除了。</p>
          <button
            type="button"
            onClick={() => navigate('/')}
            className="mt-6 rounded-xl bg-brand px-5 py-2.5 text-sm font-medium text-white"
          >
            回到首页
          </button>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-page text-ink">
      <Navbar />
      <article className="mx-auto max-w-3xl px-4 pt-28 pb-16 sm:px-6">
        <p className="text-sm text-muted">{post.date}</p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight">{post.title}</h1>
        <p className="mt-3 text-base text-muted">{post.summary}</p>
        <div className="mt-8 whitespace-pre-wrap rounded-xl border border-line bg-section p-6 text-base leading-8">
          {post.content}
        </div>
        <Link
          to="/"
          className="mt-8 inline-block text-sm font-medium text-brand hover:underline"
        >
          ← 回到首页
        </Link>
      </article>
      <Footer />
    </div>
  );
}
