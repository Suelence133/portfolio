// 通用卡片容器：统一圆角与柔和阴影
import type { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
}

export default function Card({ children, className = '' }: CardProps) {
  return (
    <div
      className={
        'rounded-xl border border-line bg-page p-5 shadow-soft transition-shadow duration-200 hover:shadow-md ' +
        className
      }
    >
      {children}
    </div>
  );
}
