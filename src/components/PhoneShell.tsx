import { ReactNode } from 'react';
import clsx from 'clsx';

interface PhoneShellProps {
  title?: string;
  children: ReactNode;
  className?: string;
}

const PhoneShell = ({ title, children, className }: PhoneShellProps) => {
  return (
    <div className="min-h-screen bg-slate-100 flex items-start justify-center px-4 py-6">
      <div
        className={clsx(
          'w-full max-w-[360px] min-h-[720px] bg-white rounded-[32px] shadow-card border border-slate-200 overflow-hidden flex flex-col',
          className
        )}
      >
        <div className="px-6 pt-6 pb-4 border-b border-slate-100">
          <div className="text-xs text-slate-400">오프라인 경찰과 도둑 보조앱</div>
          {title && <h1 className="text-lg font-semibold mt-1">{title}</h1>}
        </div>
        <div className="flex-1 overflow-y-auto">{children}</div>
      </div>
    </div>
  );
};

export default PhoneShell;
