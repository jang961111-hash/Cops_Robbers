import { useGameStore } from '../../store/gameStore';

const JailTab = () => {
  const { players, role, arrestRequest, actions } = useGameStore();
  const jailedPlayers = players.filter((player) => player.status === 'jailed');

  return (
    <div className="p-4 space-y-4">
      <div className="bg-white border border-slate-200 rounded-2xl p-4">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-xs text-slate-400">현재 수감 인원</div>
            <div className="text-xl font-semibold">{jailedPlayers.length}명</div>
          </div>
          <div className="text-xs text-slate-500">감옥 실시간 동기화</div>
        </div>
        <div className="mt-4 space-y-2">
          {jailedPlayers.map((player) => (
            <div key={player.id} className="border border-slate-200 rounded-xl px-4 py-3">
              <div className="text-sm font-semibold">{player.name}</div>
              <div className="text-xs text-slate-500">체포 시간 · 5분 전</div>
            </div>
          ))}
        </div>
      </div>
      <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4">
        <div className="text-sm font-semibold">체포 요청</div>
        <p className="text-xs text-slate-500 mt-1">
          경찰이 체포 요청을 보내면 도둑이 확인 후 감옥으로 이동합니다.
        </p>
        <div className="mt-3">
          {arrestRequest ? (
            <div className="border border-slate-200 rounded-xl px-4 py-3 bg-white">
              <div className="text-sm font-semibold">요청 상태: {arrestRequest.status}</div>
              <div className="text-xs text-slate-500 mt-1">대상: {players.find((p) => p.id === arrestRequest.robberId)?.name}</div>
              <button
                type="button"
                onClick={actions.confirmArrest}
                className="mt-3 w-full py-2 rounded-xl bg-brand-500 text-white text-sm font-semibold"
              >
                도둑 확인 · 감옥 이동 확정
              </button>
            </div>
          ) : (
            <div className="border border-dashed border-slate-300 rounded-xl px-4 py-6 text-center text-xs text-slate-400">
              요청 없음
            </div>
          )}
        </div>
        {role === 'cop' && (
          <button
            type="button"
            onClick={actions.triggerArrest}
            className="mt-3 w-full py-2 rounded-xl border border-slate-200 text-sm font-semibold"
          >
            체포 요청 보내기
          </button>
        )}
      </div>
    </div>
  );
};

export default JailTab;
