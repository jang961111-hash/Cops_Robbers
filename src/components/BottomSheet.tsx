import clsx from 'clsx';
import { Player } from '../types/game';

interface BottomSheetProps {
  player?: Player;
  onClose: () => void;
  canArrest: boolean;
}

const BottomSheet = ({ player, onClose, canArrest }: BottomSheetProps) => {
  if (!player) return null;

  return (
    <div className="fixed inset-0 bg-black/30 flex items-end justify-center z-40" onClick={onClose}>
      <div
        className="w-full max-w-[360px] bg-white rounded-t-3xl px-6 py-5"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex items-center justify-between">
          <div>
            <div className="text-xs text-slate-400">팀원 상세</div>
            <div className="text-lg font-semibold">{player.name}</div>
          </div>
          <button type="button" onClick={onClose} className="text-slate-400 text-sm">
            닫기
          </button>
        </div>
        <div className="mt-4 space-y-2 text-sm">
          <div className="flex items-center justify-between">
            <span className="text-slate-500">상태</span>
            <span className={clsx('font-semibold', player.status === 'jailed' ? 'text-rose-500' : 'text-emerald-500')}>
              {player.status === 'jailed' ? '수감' : '활동 중'}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-slate-500">마지막 공유</span>
            <span className="font-medium">{player.lastUpdated}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-slate-500">공유 방식</span>
            <span className="font-medium">구역 공유</span>
          </div>
        </div>
        <div className="mt-5 flex gap-2">
          <button
            type="button"
            className="flex-1 px-4 py-2 rounded-xl border border-slate-200 text-sm font-semibold"
          >
            마지막 위치 요청
          </button>
          <button
            type="button"
            className={clsx(
              'flex-1 px-4 py-2 rounded-xl text-sm font-semibold',
              canArrest ? 'bg-brand-500 text-white' : 'bg-slate-200 text-slate-500'
            )}
            disabled={!canArrest}
          >
            {canArrest ? '체포 요청' : '권한 없음'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default BottomSheet;
