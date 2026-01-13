import { useState } from 'react';
import { useGameStore } from '../../store/gameStore';

const ProfileTab = () => {
  const { role, team, players, meId, actions } = useGameStore();
  const me = players.find((player) => player.id === meId);
  const [nickname, setNickname] = useState(me?.name ?? '');
  const [safeMode, setSafeMode] = useState(true);
  const [autoDelete, setAutoDelete] = useState(false);

  return (
    <div className="p-4 space-y-4">
      <div className="bg-white border border-slate-200 rounded-2xl p-4 space-y-4">
        <div>
          <div className="text-xs text-slate-400">닉네임</div>
          <div className="mt-2 flex gap-2">
            <input
              value={nickname}
              onChange={(event) => setNickname(event.target.value)}
              className="flex-1 border border-slate-200 rounded-xl px-3 py-2 text-sm"
            />
            <button
              type="button"
              onClick={() => actions.updateNickname(nickname)}
              className="px-4 py-2 rounded-xl bg-brand-500 text-white text-sm font-semibold"
            >
              저장
            </button>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div className="border border-slate-200 rounded-xl px-3 py-2">
            <div className="text-xs text-slate-400">역할</div>
            <div className="text-sm font-semibold mt-1">{role === 'master' ? '마스터' : '플레이어'}</div>
          </div>
          <div className="border border-slate-200 rounded-xl px-3 py-2">
            <div className="text-xs text-slate-400">팀</div>
            <div className="text-sm font-semibold mt-1">{team === 'cop' ? '경찰' : '도둑'}</div>
          </div>
        </div>
      </div>
      <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 space-y-3">
        <label className="flex items-center justify-between">
          <div>
            <div className="text-sm font-semibold">안전 모드</div>
            <div className="text-xs text-slate-500">청소년 모드 UI 단순화</div>
          </div>
          <input
            type="checkbox"
            checked={safeMode}
            onChange={() => setSafeMode((value) => !value)}
            className="accent-brand-500"
          />
        </label>
        <label className="flex items-center justify-between">
          <div>
            <div className="text-sm font-semibold">게임 종료 시 방 자동 삭제</div>
            <div className="text-xs text-slate-500">방 재접속 방지</div>
          </div>
          <input
            type="checkbox"
            checked={autoDelete}
            onChange={() => setAutoDelete((value) => !value)}
            className="accent-brand-500"
          />
        </label>
      </div>
    </div>
  );
};

export default ProfileTab;
