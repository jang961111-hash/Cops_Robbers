import { useGameStore } from '../store/gameStore';

const DevPanel = () => {
  const { showDevPanel, actions } = useGameStore();

  if (!showDevPanel) return null;

  return (
    <div className="fixed bottom-24 right-4 bg-white shadow-xl border border-slate-200 rounded-2xl p-4 w-56 z-40">
      <div className="text-xs text-slate-400">더미 이벤트 시뮬레이터</div>
      <div className="mt-3 space-y-2">
        <button
          type="button"
          onClick={() => actions.moveMe(Math.floor(Math.random() * 9) + 1, Math.floor(Math.random() * 9) + 1)}
          className="w-full text-xs py-2 rounded-lg border border-slate-200"
        >
          내 위치 이동
        </button>
        <button
          type="button"
          onClick={actions.randomMoveTeam}
          className="w-full text-xs py-2 rounded-lg border border-slate-200"
        >
          팀원 랜덤 이동
        </button>
        <button
          type="button"
          onClick={actions.triggerArrest}
          className="w-full text-xs py-2 rounded-lg border border-slate-200"
        >
          체포 이벤트 발생
        </button>
        <button
          type="button"
          onClick={actions.triggerOutOfBounds}
          className="w-full text-xs py-2 rounded-lg border border-slate-200"
        >
          범위 이탈 이벤트
        </button>
      </div>
    </div>
  );
};

export default DevPanel;
