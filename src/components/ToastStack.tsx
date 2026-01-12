import clsx from 'clsx';
import { useEffect } from 'react';
import { useGameStore } from '../store/gameStore';

const toneClasses = {
  info: 'bg-slate-900 text-white',
  warning: 'bg-amber-400 text-slate-900',
  success: 'bg-emerald-500 text-white'
};

const ToastStack = () => {
  const { toasts, actions } = useGameStore();

  useEffect(() => {
    const timers = toasts.map((toast) =>
      setTimeout(() => {
        actions.clearToast(toast.id);
      }, 3000)
    );

    return () => timers.forEach((timer) => clearTimeout(timer));
  }, [toasts, actions]);

  return (
    <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50 space-y-2">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={clsx('px-4 py-2 rounded-full text-xs font-semibold shadow-lg', toneClasses[toast.tone])}
        >
          {toast.message}
        </div>
      ))}
    </div>
  );
};

export default ToastStack;
