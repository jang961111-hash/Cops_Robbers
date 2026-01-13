import MapDummy from '../../components/MapDummy';
import { useGameStore } from '../../store/gameStore';
import { getRoleUIClasses } from '../../utils/roleConfig';

const RulesTab = () => {
  const { role, geofence, actions, players, team } = useGameStore();
  const roleConfig = getRoleUIClasses(role);

  return (
    <div className="p-4 space-y-4">
      <div className={`${roleConfig.bgColor} border ${roleConfig.borderColor} rounded-2xl p-4 space-y-3`}>
        <div className="flex items-center justify-between">
          <div>
            <div className="text-xs text-slate-400">게임 범위</div>
            <div className={`text-sm font-semibold ${roleConfig.textColor}`}>
              {role === 'master' ? '범위 설정 편집' : '현재 범위 확인'}
            </div>
          </div>
          <span className={`text-xs px-2 py-1 rounded-full ${roleConfig.bgColor} ${roleConfig.textColor}`}>
            GeoFence
          </span>
        </div>
        <MapDummy players={players.filter((player) => player.team === team)} highlightTeam={team} geofence={geofence.points} />
      </div>
      <div className={`${roleConfig.bgColor} border ${roleConfig.borderColor} rounded-2xl p-4 space-y-3`}>
        <div className={`text-sm font-semibold ${roleConfig.textColor}`}>이탈 경고</div>
        <div className="space-y-2">
          {([
            { key: 'first', label: '1차 알림' },
            { key: 'second', label: '2차 패널티' },
            { key: 'third', label: '3차 실격' }
          ] as const).map((item) => (
            <label
              key={item.key}
              className={`flex items-center justify-between rounded-xl px-3 py-2 border ${roleConfig.borderColor} ${roleConfig.bgColor}`}
            >
              <span className="text-sm">{item.label}</span>
              <input
                type="checkbox"
                checked={geofence.warnings[item.key]}
                onChange={() => actions.updateWarning(item.key)}
                disabled={role !== 'master'}
                className={role === 'cop' ? 'accent-blue-500' : role === 'robber' ? 'accent-red-500' : 'accent-green-500'}
              />
            </label>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RulesTab;
