// 作品管理：增删改 + 删除二次确认
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import type { Work } from '../types';
import { getWorks, addWork, updateWork, deleteWork } from '../api/works';
import { WARM_COLORS } from '../data/defaults';

const schema = z.object({
  title: z.string().min(1, '请输入作品标题'),
  desc: z.string().min(1, '请输入作品描述'),
  tags: z.string().min(1, '请输入至少一个标签'),
  cover: z.string().min(1, '请选择封面颜色'),
  date: z.string().regex(/^\d{4}-\d{2}$/, '日期格式应为 YYYY-MM'),
});

type FormValues = z.infer<typeof schema>;

const inputCls =
  'mt-1 w-full rounded-lg border border-line bg-page px-3 py-2 text-sm outline-none focus:border-brand';

export default function WorksManage() {
  const [list, setList] = useState<Work[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      title: '',
      desc: '',
      tags: '',
      cover: WARM_COLORS[0],
      date: new Date().toISOString().slice(0, 7),
    },
  });

  const cover = watch('cover');

  useEffect(() => {
    setList(getWorks());
  }, []);

  const onSubmit = (values: FormValues) => {
    const data: Omit<Work, 'id'> = {
      title: values.title,
      desc: values.desc,
      tags: values.tags.split(/[,，\s]+/).filter(Boolean),
      cover: values.cover,
      date: values.date,
    };
    if (editingId) {
      updateWork(editingId, data);
      setEditingId(null);
    } else {
      addWork(data);
    }
    reset({
      title: '',
      desc: '',
      tags: '',
      cover: WARM_COLORS[0],
      date: new Date().toISOString().slice(0, 7),
    });
    setList(getWorks());
  };

  const startEdit = (w: Work) => {
    setEditingId(w.id);
    reset({
      title: w.title,
      desc: w.desc,
      tags: w.tags.join(' '),
      cover: w.cover,
      date: w.date,
    });
  };

  const cancelEdit = () => {
    setEditingId(null);
    reset({
      title: '',
      desc: '',
      tags: '',
      cover: WARM_COLORS[0],
      date: new Date().toISOString().slice(0, 7),
    });
  };

  const handleDelete = (id: string) => {
    if (!window.confirm('确定删除这个作品吗？')) return;
    deleteWork(id);
    if (editingId === id) cancelEdit();
    setList(getWorks());
  };

  return (
    <div className="pt-4">
      <h1 className="text-2xl font-bold">作品管理</h1>
      <p className="mt-1 text-sm text-muted">对应前台「作品与记录」区块，标签用空格或逗号分隔。</p>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mt-6 rounded-xl border border-line bg-page p-5"
      >
        <h2 className="text-base font-semibold">{editingId ? '编辑作品' : '新增作品'}</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="title" className="text-sm font-medium">标题</label>
            <input id="title" {...register('title')} className={inputCls} />
            {errors.title && <p className="mt-1 text-xs text-brand">{errors.title.message}</p>}
          </div>
          <div>
            <label htmlFor="date" className="text-sm font-medium">日期（YYYY-MM）</label>
            <input id="date" {...register('date')} className={inputCls} placeholder="2026-08" />
            {errors.date && <p className="mt-1 text-xs text-brand">{errors.date.message}</p>}
          </div>
          <div>
            <label htmlFor="tags" className="text-sm font-medium">标签</label>
            <input id="tags" {...register('tags')} className={inputCls} placeholder="摄影 日常" />
            {errors.tags && <p className="mt-1 text-xs text-brand">{errors.tags.message}</p>}
          </div>
          <div>
            <span className="text-sm font-medium">封面颜色</span>
            <div className="mt-2 flex flex-wrap gap-2">
              {WARM_COLORS.map((c) => (
                <button
                  key={c}
                  type="button"
                  aria-label={`选择封面颜色 ${c}`}
                  onClick={() => setValue('cover', c, { shouldDirty: true })}
                  className={
                    'h-9 w-9 rounded-full border-2 transition-transform duration-200 ' +
                    (cover === c ? 'border-ink scale-110' : 'border-line')
                  }
                  style={{ backgroundColor: c }}
                />
              ))}
            </div>
          </div>
        </div>

        <div className="mt-4">
          <label htmlFor="desc" className="text-sm font-medium">描述</label>
          <textarea id="desc" rows={3} {...register('desc')} className={inputCls} />
          {errors.desc && <p className="mt-1 text-xs text-brand">{errors.desc.message}</p>}
        </div>

        <div className="mt-5 flex gap-3">
          <button
            type="submit"
            className="rounded-xl bg-brand px-5 py-2.5 text-sm font-medium text-white transition-opacity duration-200 hover:opacity-90"
          >
            {editingId ? '保存修改' : '添加作品'}
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

      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        {list.map((w) => (
          <div key={w.id} className="rounded-xl border border-line bg-page p-4">
            <div
              className="h-20 rounded-lg"
              style={{ background: `linear-gradient(135deg, ${w.cover} 0%, #F2CC8F 100%)` }}
            />
            <h3 className="mt-3 text-sm font-semibold">{w.title}</h3>
            <p className="mt-1 line-clamp-2 text-xs text-muted">{w.desc}</p>
            <div className="mt-3 flex flex-wrap items-center gap-2">
              {w.tags.map((t) => (
                <span key={t} className="rounded bg-accent/40 px-2 py-0.5 text-xs text-ink">{t}</span>
              ))}
              <span className="ml-auto text-xs text-muted">{w.date}</span>
            </div>
            <div className="mt-3 flex gap-2">
              <button
                type="button"
                onClick={() => startEdit(w)}
                className="rounded-lg border border-line px-3 py-1.5 text-sm text-muted hover:bg-section hover:text-ink"
              >
                编辑
              </button>
              <button
                type="button"
                onClick={() => handleDelete(w.id)}
                className="rounded-lg border border-line px-3 py-1.5 text-sm text-muted hover:bg-section hover:text-brand"
              >
                删除
              </button>
            </div>
          </div>
        ))}
        {list.length === 0 && <p className="text-sm text-muted">还没有作品记录。</p>}
      </div>
    </div>
  );
}
