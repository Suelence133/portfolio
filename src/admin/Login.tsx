// 后台登录页
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useNavigate } from 'react-router-dom';
import { login, DEMO_ACCOUNT, DEMO_PASSWORD } from '../api/auth';

const schema = z.object({
  account: z.string().min(1, '请输入账号'),
  password: z.string().min(1, '请输入密码'),
});

type FormValues = z.infer<typeof schema>;

export default function Login() {
  const navigate = useNavigate();
  const [errMsg, setErrMsg] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { account: '', password: '' },
  });

  const onSubmit = (values: FormValues) => {
    const res = login(values.account, values.password);
    if (!res.ok) {
      setErrMsg(res.message);
      return;
    }
    navigate('/admin', { replace: true });
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-section px-4">
      <div className="w-full max-w-sm rounded-xl border border-line bg-page p-7 shadow-soft">
        <h1 className="text-xl font-bold">登录后台</h1>
        <p className="mt-1 text-sm text-muted">登录后可以修改前台展示的全部内容</p>

        <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-4">
          <div>
            <label htmlFor="account" className="text-sm font-medium">
              账号
            </label>
            <input
              id="account"
              {...register('account')}
              className="mt-1 w-full rounded-lg border border-line bg-page px-3 py-2 text-sm outline-none focus:border-brand"
              placeholder="请输入账号"
            />
            {errors.account && <p className="mt-1 text-xs text-brand">{errors.account.message}</p>}
          </div>

          <div>
            <label htmlFor="password" className="text-sm font-medium">
              密码
            </label>
            <input
              id="password"
              type="password"
              {...register('password')}
              className="mt-1 w-full rounded-lg border border-line bg-page px-3 py-2 text-sm outline-none focus:border-brand"
              placeholder="请输入密码"
            />
            {errors.password && <p className="mt-1 text-xs text-brand">{errors.password.message}</p>}
          </div>

          {errMsg && <p className="text-xs text-brand">{errMsg}</p>}

          <button
            type="submit"
            className="w-full rounded-xl bg-brand px-4 py-2.5 text-sm font-medium text-white transition-opacity duration-200 hover:opacity-90"
          >
            登录
          </button>
        </form>

        <p className="mt-5 rounded-lg bg-section px-3 py-2 text-xs text-muted">
          演示账号：<span className="font-medium text-ink">{DEMO_ACCOUNT}</span> ／ 密码：
          <span className="font-medium text-ink">{DEMO_PASSWORD}</span>
        </p>
      </div>
    </div>
  );
}
