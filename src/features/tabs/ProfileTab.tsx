import { useState } from 'react';
import { useGameStore } from '../../store/gameStore';
import { getRoleUIClasses } from '../../utils/roleConfig';

const ProfileTab = () => {
  const { role, team, players, meId, actions } = useGameStore();
  const roleConfig = getRoleUIClasses(role);
  const me = players.find((player) => player.id === meId);
  const [nickname, setNickname] = useState(me?.name ?? '');

  return (
    <div className="p-4 space-y-4">
      {/* 프로필 카드 */}
      <div className={`${roleConfig.bgColor} border ${roleConfig.borderColor} rounded-2xl p-4 space-y-4`}>
        <div>
          <div className="text-xs text-slate-400">닉네임</div>
          <div className="mt-2 flex gap-2">
            <input
              value={nickname}
              onChange={(event) => setNickname(event.target.value)}
              className={`flex-1 border ${roleConfig.borderColor} rounded-xl px-3 py-2 text-sm`}
            />
            <button
              type="button"
              onClick={() => actions.updateNickname(nickname)}
              className={`px-4 py-2 rounded-xl ${roleConfig.accentColor} text-white text-sm font-semibold`}
            >
              저장
            </button>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div className={`border ${roleConfig.borderColor} rounded-xl px-3 py-2`}>
            <div className="text-xs text-slate-400">역할</div>
            <div className={`text-sm font-semibold mt-1 ${roleConfig.textColor}`}>
              {role === 'master' ? '🎮 마스터' : role === 'cop' ? '👮 경찰' : '🏃 도둑'}
            </div>
          </div>
          <div className={`border ${roleConfig.borderColor} rounded-xl px-3 py-2`}>
            <div className="text-xs text-slate-400">팀</div>
            <div className={`text-sm font-semibold mt-1 ${roleConfig.textColor}`}>
              {team === 'cop' ? '🔵 경찰팀' : '🔴 도둑팀'}
            </div>
          </div>
        </div>
      </div>

      {/* 게임 통계 */}
      <div className={`${roleConfig.bgColor} border ${roleConfig.borderColor} rounded-2xl p-4`}>
        <div className={`text-sm font-semibold mb-3 ${roleConfig.textColor}`}>
          {role === 'cop' ? '👮 경찰 활동' : role === 'robber' ? '🏃 도주 기록' : '🎮 관리 현황'}
        </div>
        <div className="grid grid-cols-3 gap-2">
          <div className={`border ${roleConfig.borderColor} rounded-lg px-2 py-2 text-center`}>
            <div className="text-xs text-slate-400">
              {role === 'cop' ? '체포' : role === 'robber' ? '생존' : '게임'}
            </div>
            <div className={`text-lg font-bold ${roleConfig.textColor}`}>
              {Math.floor(Math.random() * 10)}
            </div>
          </div>
          <div className={`border ${roleConfig.borderColor} rounded-lg px-2 py-2 text-center`}>
            <div className="text-xs text-slate-400">
              {role === 'cop' ? '추적' : role === 'robber' ? '회피' : '경고'}
            </div>
            <div className={`text-lg font-bold ${roleConfig.textColor}`}>
              {Math.floor(Math.random() * 20)}
            </div>
          </div>
          <div className={`border ${roleConfig.borderColor} rounded-lg px-2 py-2 text-center`}>
            <div className="text-xs text-slate-400">
              {role === 'cop' ? '성공률' : role === 'robber' ? '도주율' : '안전'}
            </div>
            <div className={`text-lg font-bold ${roleConfig.textColor}`}>
              {Math.floor(Math.random() * 100)}%
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileTab;
