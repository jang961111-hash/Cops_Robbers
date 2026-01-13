import clsx from 'clsx';
import { useGameStore } from '../store/gameStore';

const tabs = [
  { id: 'map', label: '맵' },
  { id: 'jail', label: '감옥' },
  { id: 'rules', label: '규칙/범위' },
  { id: 'profile', label: '내 정보' }
] as const;

const TabBar = () => {
  const { activeTab, actions } = useGameStore();
  return (
    <div className="bg-white border-t border-slate-200 px-3 py-2 flex justify-between">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          type="button"
          onClick={() => actions.setActiveTab(tab.id)}
          className={clsx(
            'flex-1 text-xs font-medium py-2 rounded-xl transition',
            activeTab === tab.id ? 'bg-brand-500 text-white' : 'text-slate-500'
          )}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
};

export default TabBar;
