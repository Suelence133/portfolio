// 技能管理：增删改 + 删除二次确认
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import type { Skill } from '../types';
import { getSkills, addSkill, updateSkill, deleteSkill } from '../api/skills';

const schema = z.object({
  name: z.string().min(1, '请输入技能名称'),
  category: z.string().min(1, '请输入分类'),
  level: z.coerce
    .number({ invalid_type_error: '熟练度必须是数字' })
    .min(0, '熟练度不能小于 0')
    .max(100, '熟练度不能大于 100'),
});

type FormValues = z.infer<typeof schema>;

const inputCls =
  'mt-1 w-full rounded-lg border border-line bg-page px-3 py-2 text-sm outline-none focus:border-brand';

export default function SkillsManage() {
  const [list, setList] = useState<Skill[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { name: '', category: '兴趣', level: 60 },
  });

  useEffect(() => {
    setList(getSkills());
  }, []);

  const onSubmit = (values: FormValues) => {
    const data = { name: values.name, category: values.category, level: Number(values.level) };
    if (editingId) {
      updateSkill(editingId, data);
      setEditingId(null);
    } else {
      addSkill(data);
    }
    reset({ name: '', category: '兴趣', level: 60 });
    setList(getSkills());
  };

  const startEdit = (s: Skill) => {
    setEditingId(s.id);
    reset({ name: s.name, category: s.category, level: s.level });
  };

  const cancelEdit = () => {
    setEditingId(null);
    reset({ name: '', category: '兴趣', level: 60 });
  };

  const handleDelete = (id: string) => {
    if (!window.confirm('确定删除这条技能吗？')) return;
    deleteSkill(id);
    if (editingId === id) cancelEdit();
    setList(getSkills());
  };

  return (
    <div className="pt-4">
      <h1 className="text-2xl font-bold">技能管理</h1>
      <p className="mt-1 text-sm text-muted">按分类展示在前台「我会的一些事」区块。</p>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mt-6 rounded-xl border border-line bg-page p-5"
      >
        <h2 className="text-base font-semibold">{editingId ? '编辑技能' : '新增技能'}</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-3">
          <div>
            <label htmlFor="name" className="text-sm font-medium">名称</label>
            <input id="name" {...register('name')} className={inputCls} placeholder="如：摄影" />
            {errors.name && <p className="mt-1 text-xs text-brand">{errors.name.message}</p>}
          </div>
          <div>
            <label htmlFor="category" className="text-sm font-medium">分类</label>
            <input id="category" {...register('category')} className={inputCls} placeholder="编程 / 兴趣 / 生活" />
            {errors.category && <p className="mt-1 text-xs text-brand">{errors.category.message}</p>}
          </div>
          <div>
            <label htmlFor="level" className="text-sm font-medium">熟练度（0-100）</label>
            <input id="level" type="number" {...register('level')} className={inputCls} />
            {errors.level && <p className="mt-1 text-xs text-brand">{errors.level.message}</p>}
          </div>
        </div>

        <div className="mt-5 flex gap-3">
          <button
            type="submit"
            className="rounded-xl bg-brand px-5 py-2.5 text-sm font-medium text-white transition-opacity duration-200 hover:opacity-90"
          >
            {editingId ? '保存修改' : '添加技能'}
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
        {list.map((s) => (
          <div
            key={s.id}
            className="flex flex-wrap items-center gap-3 rounded-xl border border-line bg-page p-4 sm:flex-nowrap"
          >
            <span className="rounded bg-accent/40 px-2 py-0.5 text-xs text-ink">{s.category}</span>
            <span className="text-sm font-medium">{s.name}</span>
            <div className="h-2 w-32 overflow-hidden rounded-full bg-line">
              <div className="h-full rounded-full bg-brand" style={{ width: `${s.level}%` }} />
            </div>
            <span className="text-sm text-muted">{s.level}</span>
            <div className="ml-auto flex gap-2">
              <button
                type="button"
                onClick={() => startEdit(s)}
                className="rounded-lg border border-line px-3 py-1.5 text-sm text-muted hover:bg-section hover:text-ink"
              >
                编辑
              </button>
              <button
                type="button"
                onClick={() => handleDelete(s.id)}
                className="rounded-lg border border-line px-3 py-1.5 text-sm text-muted hover:bg-section hover:text-brand"
              >
                删除
              </button>
            </div>
          </div>
        ))}
        {list.length === 0 && <p className="text-sm text-muted">还没有技能记录。</p>}
      </div>
    </div>
  );
}
