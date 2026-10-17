// 个人信息管理：基本信息表单 + 经历时间线增删改
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import type { Profile, TimelineItem } from '../types';
import { getProfile, saveProfile, getTimeline, saveTimeline, createTimelineItem } from '../api/profile';
import { WARM_COLORS } from '../data/defaults';

const schema = z.object({
  name: z.string().min(1, '请输入姓名'),
  tagline: z.string().min(1, '请输入一句话介绍'),
  bio: z.string().min(1, '请输入个人简介'),
  email: z.string().min(1, '请输入邮箱').email('邮箱格式不正确'),
  location: z.string().min(1, '请输入所在地'),
  school: z.string().min(1, '请输入学校'),
  major: z.string().min(1, '请输入专业'),
  avatar: z.string().min(1, '请选择头像颜色或填写图片地址'),
});

type FormValues = z.infer<typeof schema>;

const inputCls =
  'mt-1 w-full rounded-lg border border-line bg-page px-3 py-2 text-sm outline-none focus:border-brand';

export default function ProfileManage() {
  const [saved, setSaved] = useState('');
  const [timeline, setTimeline] = useState<TimelineItem[]>([]);

  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {} as FormValues,
  });

  const avatar = watch('avatar');

  useEffect(() => {
    const p: Profile = getProfile();
    reset(p);
    setTimeline(getTimeline());
  }, [reset]);

  const onSubmit = (values: FormValues) => {
    saveProfile(values as Profile);
    setSaved('个人信息已保存');
    setTimeout(() => setSaved(''), 2000);
  };

  // ---- 时间线操作 ----
  const updateItem = (id: string, key: keyof TimelineItem, value: string) => {
    setTimeline((list) => list.map((t) => (t.id === id ? { ...t, [key]: value } : t)));
  };

  const saveTimelineChanges = () => {
    if (timeline.some((t) => !t.title.trim() || !t.year.trim())) {
      window.alert('年份和标题不能为空');
      return;
    }
    saveTimeline(timeline);
    setSaved('时间线已保存');
    setTimeout(() => setSaved(''), 2000);
  };

  const addItem = () => setTimeline((list) => [...list, createTimelineItem()]);

  const removeItem = (id: string) => {
    if (!window.confirm('确定删除这条经历吗？')) return;
    setTimeline((list) => list.filter((t) => t.id !== id));
  };

  return (
    <div className="pt-4">
      <h1 className="text-2xl font-bold">个人信息</h1>
      <p className="mt-1 text-sm text-muted">修改后回到前台刷新即可看到更新。</p>

      {saved && (
        <p className="mt-4 rounded-lg bg-section px-3 py-2 text-sm text-brand">{saved}</p>
      )}

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mt-6 rounded-xl border border-line bg-page p-5"
      >
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="name" className="text-sm font-medium">姓名</label>
            <input id="name" {...register('name')} className={inputCls} />
            {errors.name && <p className="mt-1 text-xs text-brand">{errors.name.message}</p>}
          </div>
          <div>
            <label htmlFor="tagline" className="text-sm font-medium">一句话介绍</label>
            <input id="tagline" {...register('tagline')} className={inputCls} />
            {errors.tagline && <p className="mt-1 text-xs text-brand">{errors.tagline.message}</p>}
          </div>
          <div>
            <label htmlFor="email" className="text-sm font-medium">邮箱</label>
            <input id="email" {...register('email')} className={inputCls} />
            {errors.email && <p className="mt-1 text-xs text-brand">{errors.email.message}</p>}
          </div>
          <div>
            <label htmlFor="location" className="text-sm font-medium">所在地</label>
            <input id="location" {...register('location')} className={inputCls} />
            {errors.location && <p className="mt-1 text-xs text-brand">{errors.location.message}</p>}
          </div>
          <div>
            <label htmlFor="school" className="text-sm font-medium">学校</label>
            <input id="school" {...register('school')} className={inputCls} />
            {errors.school && <p className="mt-1 text-xs text-brand">{errors.school.message}</p>}
          </div>
          <div>
            <label htmlFor="major" className="text-sm font-medium">专业</label>
            <input id="major" {...register('major')} className={inputCls} />
            {errors.major && <p className="mt-1 text-xs text-brand">{errors.major.message}</p>}
          </div>
        </div>

        <div className="mt-4">
          <label htmlFor="bio" className="text-sm font-medium">个人简介</label>
          <textarea id="bio" rows={4} {...register('bio')} className={inputCls} />
          {errors.bio && <p className="mt-1 text-xs text-brand">{errors.bio.message}</p>}
        </div>

        <div className="mt-4">
          <span className="text-sm font-medium">头像</span>
          <div className="mt-2 flex flex-wrap gap-2">
            {WARM_COLORS.map((c) => (
              <button
                key={c}
                type="button"
                aria-label={`选择颜色 ${c}`}
                onClick={() => setValue('avatar', c, { shouldDirty: true })}
                className={
                  'h-9 w-9 rounded-full border-2 transition-transform duration-200 ' +
                  (avatar === c ? 'border-ink scale-110' : 'border-line')
                }
                style={{ backgroundColor: c }}
              />
            ))}
          </div>
          <input
            {...register('avatar')}
            className={`${inputCls} mt-2`}
            placeholder="或填写图片地址，如 /avatar.jpg"
          />
          <div className="mt-2 flex items-center gap-3">
            <span className="text-xs text-muted">预览：</span>
            {avatar && (/^https?:\/\//.test(avatar) || avatar.startsWith('/')) ? (
              <img src={avatar} alt="头像预览" className="h-10 w-10 rounded-full object-cover" />
            ) : avatar ? (
              <div className="h-10 w-10 rounded-full" style={{ backgroundColor: avatar }} />
            ) : null}
          </div>
          {errors.avatar && <p className="mt-1 text-xs text-brand">{errors.avatar.message}</p>}
        </div>

        <button
          type="submit"
          className="mt-6 rounded-xl bg-brand px-5 py-2.5 text-sm font-medium text-white transition-opacity duration-200 hover:opacity-90"
        >
          保存个人信息
        </button>
      </form>

      {/* 经历时间线 */}
      <div className="mt-8 rounded-xl border border-line bg-page p-5">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">经历时间线</h2>
          <button
            type="button"
            onClick={addItem}
            className="rounded-lg border border-line px-3 py-1.5 text-sm text-muted hover:bg-section hover:text-ink"
          >
            + 添加一条
          </button>
        </div>

        <div className="mt-4 space-y-4">
          {timeline.map((t) => (
            <div key={t.id} className="rounded-lg border border-line bg-section p-4">
              <div className="grid gap-3 sm:grid-cols-4">
                <input
                  value={t.year}
                  onChange={(e) => updateItem(t.id, 'year', e.target.value)}
                  placeholder="年份"
                  className="rounded-lg border border-line bg-page px-3 py-2 text-sm outline-none focus:border-brand"
                />
                <input
                  value={t.title}
                  onChange={(e) => updateItem(t.id, 'title', e.target.value)}
                  placeholder="标题"
                  className="rounded-lg border border-line bg-page px-3 py-2 text-sm outline-none focus:border-brand sm:col-span-2"
                />
                <button
                  type="button"
                  onClick={() => removeItem(t.id)}
                  className="rounded-lg border border-line px-3 py-2 text-sm text-muted hover:bg-page hover:text-brand"
                >
                  删除
                </button>
              </div>
              <textarea
                value={t.desc}
                onChange={(e) => updateItem(t.id, 'desc', e.target.value)}
                placeholder="描述"
                rows={2}
                className="mt-3 w-full rounded-lg border border-line bg-page px-3 py-2 text-sm outline-none focus:border-brand"
              />
            </div>
          ))}
          {timeline.length === 0 && <p className="text-sm text-muted">还没有经历记录。</p>}
        </div>

        <button
          type="button"
          onClick={saveTimelineChanges}
          className="mt-4 rounded-xl bg-brand px-5 py-2.5 text-sm font-medium text-white transition-opacity duration-200 hover:opacity-90"
        >
          保存时间线
        </button>
      </div>
    </div>
  );
}
