import clsx from 'clsx';
import { useGameStore } from '../store/gameStore';

const GameStatusBar = () => {
  const { players, team, outOfBounds } = useGameStore();
  const aliveCount = players.filter((player) => player.team === team && player.status === 'alive').length;
  const jailedCount = players.filter((player) => player.team === team && player.status === 'jailed').length;

  return (
    <div className="px-4 py-3 bg-slate-900 text-white text-xs flex items-center justify-between gap-2">
      <div>
        <div className="text-[10px] text-slate-300">남은 시간</div>
        <div className="font-semibold">32:15</div>
      </div>
      <div>
        <div className="text-[10px] text-slate-300">내 상태</div>
        <div className="font-semibold">Alive</div>
      </div>
      <div>
        <div className="text-[10px] text-slate-300">팀 인원</div>
        <div className="font-semibold">
          {aliveCount} 활동 / {jailedCount} 수감
        </div>
      </div>
      <div
        className={clsx(
          'px-2 py-1 rounded-full text-[10px] font-semibold',
          outOfBounds ? 'bg-rose-500 text-white' : 'bg-emerald-500 text-white'
        )}
      >
        {outOfBounds ? '범위 이탈' : '범위 정상'}
      </div>
    </div>
  );
};

export default GameStatusBar;
