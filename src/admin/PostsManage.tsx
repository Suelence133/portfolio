// 随笔管理：增删改 + 删除二次确认
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import type { Post } from '../types';
import { getPosts, addPost, updatePost, deletePost } from '../api/posts';

const schema = z.object({
  title: z.string().min(1, '请输入标题'),
  summary: z.string().min(1, '请输入摘要'),
  content: z.string().min(1, '请输入正文'),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, '日期格式应为 YYYY-MM-DD'),
});

type FormValues = z.infer<typeof schema>;

const inputCls =
  'mt-1 w-full rounded-lg border border-line bg-page px-3 py-2 text-sm outline-none focus:border-brand';

export default function PostsManage() {
  const [list, setList] = useState<Post[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      title: '',
      summary: '',
      content: '',
      date: new Date().toISOString().slice(0, 10),
    },
  });

  useEffect(() => {
    setList(getPosts());
  }, []);

  const emptyForm = () => ({
    title: '',
    summary: '',
    content: '',
    date: new Date().toISOString().slice(0, 10),
  });

  const onSubmit = (values: FormValues) => {
    const data: Omit<Post, 'id'> = {
      title: values.title,
      summary: values.summary,
      content: values.content,
      date: values.date,
    };
    if (editingId) {
      updatePost(editingId, data);
      setEditingId(null);
    } else {
      addPost(data);
    }
    reset(emptyForm());
    setList(getPosts());
  };

  const startEdit = (p: Post) => {
    setEditingId(p.id);
    reset({ title: p.title, summary: p.summary, content: p.content, date: p.date });
  };

  const cancelEdit = () => {
    setEditingId(null);
    reset(emptyForm());
  };

  const handleDelete = (id: string) => {
    if (!window.confirm('确定删除这篇随笔吗？')) return;
    deletePost(id);
    if (editingId === id) cancelEdit();
    setList(getPosts());
  };

  return (
    <div className="pt-4">
      <h1 className="text-2xl font-bold">随笔管理</h1>
      <p className="mt-1 text-sm text-muted">对应前台「生活随笔」区块，正文支持换行。</p>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mt-6 rounded-xl border border-line bg-page p-5"
      >
        <h2 className="text-base font-semibold">{editingId ? '编辑随笔' : '新增随笔'}</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-3">
          <div className="sm:col-span-2">
            <label htmlFor="title" className="text-sm font-medium">标题</label>
            <input id="title" {...register('title')} className={inputCls} />
            {errors.title && <p className="mt-1 text-xs text-brand">{errors.title.message}</p>}
          </div>
          <div>
            <label htmlFor="date" className="text-sm font-medium">日期（YYYY-MM-DD）</label>
            <input id="date" {...register('date')} className={inputCls} />
            {errors.date && <p className="mt-1 text-xs text-brand">{errors.date.message}</p>}
          </div>
        </div>

        <div className="mt-4">
          <label htmlFor="summary" className="text-sm font-medium">摘要</label>
          <input id="summary" {...register('summary')} className={inputCls} />
          {errors.summary && <p className="mt-1 text-xs text-brand">{errors.summary.message}</p>}
        </div>

        <div className="mt-4">
          <label htmlFor="content" className="text-sm font-medium">正文</label>
          <textarea id="content" rows={6} {...register('content')} className={inputCls} />
          {errors.content && <p className="mt-1 text-xs text-brand">{errors.content.message}</p>}
        </div>

        <div className="mt-5 flex gap-3">
          <button
            type="submit"
            className="rounded-xl bg-brand px-5 py-2.5 text-sm font-medium text-white transition-opacity duration-200 hover:opacity-90"
          >
            {editingId ? '保存修改' : '添加随笔'}
          </button>
          {editingId && (
            <button
              type="button"
              onClick={cancelEdit}
              className="rounded-xl border border-line px-5 py-2.5 text-sm text-muted hover:bg-section hover:text-ink"
            >
              取消编辑
            </button>
          )}
        </div>
      </form>

      <div className="mt-8 space-y-3">
        {list.map((p) => (
          <div key={p.id} className="rounded-xl border border-line bg-page p-4">
            <div className="flex flex-wrap items-center gap-3">
              <span className="text-xs text-muted">{p.date}</span>
              <span className="text-sm font-semibold">{p.title}</span>
              <div className="ml-auto flex gap-2">
                <button
                  type="button"
                  onClick={() => startEdit(p)}
                  className="rounded-lg border border-line px-3 py-1.5 text-sm text-muted hover:bg-section hover:text-ink"
                >
                  编辑
                </button>
                <button
                  type="button"
                  onClick={() => handleDelete(p.id)}
                  className="rounded-lg border border-line px-3 py-1.5 text-sm text-muted hover:bg-section hover:text-brand"
                >
                  删除
                </button>
              </div>
            </div>
            <p className="mt-2 text-sm text-muted">{p.summary}</p>
          </div>
        ))}
        {list.length === 0 && <p className="text-sm text-muted">还没有随笔记录。</p>}
      </div>
    </div>
  );
}
