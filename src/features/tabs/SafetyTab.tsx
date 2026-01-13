import { useGameStore } from '../../store/gameStore';
import { getRoleUIClasses, generateAlertMessage } from '../../utils/roleConfig';

const SafetyTab = () => {
  const { players, role, arrestRequest, actions } = useGameStore();
  const roleConfig = getRoleUIClasses(role);
  const jailedPlayers = players.filter((player) => player.status === 'jailed');

  // 역할별 다른 메시지 표시
  const alertMessage = role === 'cop'
    ? generateAlertMessage('cop', 'detected', { count: jailedPlayers.length })
    : generateAlertMessage('robber', 'nearby');

  return (
    <div className="p-4 space-y-4">
      {/* 수감 인원 현황 */}
      <div className={`${roleConfig.bgColor} border ${roleConfig.borderColor} rounded-2xl p-4`}>
        <div className="flex items-center justify-between">
          <div>
            <div className="text-xs text-slate-400">현재 수감 인원</div>
            <div className={`text-xl font-semibold ${roleConfig.textColor}`}>{jailedPlayers.length}명</div>
          </div>
          <div className="text-xs text-slate-500">실시간 동기화</div>
        </div>
        <div className="mt-4 space-y-2">
          {jailedPlayers.map((player) => (
            <div key={player.id} className={`border ${roleConfig.borderColor} rounded-xl px-4 py-3 ${roleConfig.bgColor}`}>
              <div className="text-sm font-semibold">{player.name}</div>
              <div className="text-xs text-slate-500">체포 시간 · 5분 전</div>
            </div>
          ))}
        </div>
      </div>

      {/* 경고 및 상태 정보 */}
      <div className={`${roleConfig.bgColor} border ${roleConfig.borderColor} rounded-2xl p-4`}>
        <div className={`text-sm font-semibold ${roleConfig.textColor}`}>
          {role === 'cop' ? '⚠️ 현황 정보' : '🚨 위협 감지'}
        </div>
        <p className="text-xs text-slate-500 mt-1">
          {alertMessage}
        </p>
        <div className="mt-3">
          {arrestRequest ? (
            <div className={`border ${roleConfig.borderColor} rounded-xl px-4 py-3 ${roleConfig.bgColor}`}>
              <div className={`text-sm font-semibold ${roleConfig.textColor}`}>
                요청 상태: {arrestRequest.status}
              </div>
              <div className="text-xs text-slate-500 mt-1">
                대상: {players.find((p) => p.id === arrestRequest.robberId)?.name}
              </div>
              <button
                type="button"
                onClick={actions.confirmArrest}
                className={`mt-3 w-full py-2 rounded-xl ${roleConfig.accentColor} text-white text-sm font-semibold`}
              >
                {role === 'cop' ? '체포 확정' : '도둑 확인 · 감옥 이동 확정'}
              </button>
            </div>
          ) : (
            <div className="border border-dashed border-slate-300 rounded-xl px-4 py-6 text-center text-xs text-slate-400">
              {role === 'cop' ? '요청 없음' : '안전 상태'}
            </div>
          )}
        </div>
        {role === 'cop' && (
          <button
            type="button"
            onClick={actions.triggerArrest}
            className="mt-3 w-full py-2 rounded-xl bg-red-500 text-white text-sm font-semibold"
          >
            체포 요청
          </button>
        )}
      </div>
    </div>
  );
};

export default SafetyTab;
