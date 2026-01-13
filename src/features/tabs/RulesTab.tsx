import MapDummy from '../../components/MapDummy';
import { useGameStore } from '../../store/gameStore';

const RulesTab = () => {
  const { role, geofence, actions, players, team } = useGameStore();

  return (
    <div className="p-4 space-y-4">
      <div className="bg-white border border-slate-200 rounded-2xl p-4 space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-xs text-slate-400">게임 범위</div>
            <div className="text-sm font-semibold">
              {role === 'master' ? '범위 설정 편집' : '현재 범위 확인'}
            </div>
          </div>
          <span className="text-xs text-slate-400">GeoFence</span>
        </div>
        <MapDummy players={players.filter((player) => player.team === team)} highlightTeam={team} geofence={geofence.points} />
        {role === 'master' ? (
          <div className="text-xs text-slate-500">
            폴리곤 꼭짓점 4개를 드래그해 범위를 조정하는 느낌의 더미 UI입니다.
          </div>
        ) : (
          <div className="text-xs text-slate-500">범위를 벗어나면 단계별 경고가 발생합니다.</div>
        )}
      </div>
      <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 space-y-3">
        <div className="text-sm font-semibold">이탈 경고 설정</div>
        <div className="space-y-2">
          {([
            { key: 'first', label: '1차 알림' },
            { key: 'second', label: '2차 패널티' },
            { key: 'third', label: '3차 실격' }
          ] as const).map((item) => (
            <label
              key={item.key}
              className="flex items-center justify-between bg-white border border-slate-200 rounded-xl px-3 py-2"
            >
              <span className="text-sm">{item.label}</span>
              <input
                type="checkbox"
                checked={geofence.warnings[item.key]}
                onChange={() => actions.updateWarning(item.key)}
                disabled={role !== 'master'}
                className="accent-brand-500"
              />
            </label>
          ))}
        </div>
        {role !== 'master' && (
          <div className="text-xs text-slate-500">마스터만 설정을 변경할 수 있습니다.</div>
        )}
      </div>
    </div>
  );
};

export default RulesTab;
