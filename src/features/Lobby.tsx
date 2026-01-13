import { useNavigate } from 'react-router-dom';
import PhoneShell from '../components/PhoneShell';
import { useGameStore } from '../store/gameStore';

const Lobby = () => {
  const navigate = useNavigate();
  const { players, roomCode } = useGameStore();

  return (
    <PhoneShell title="방 대기실">
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-xs text-slate-400">방 코드</div>
            <div className="text-lg font-semibold">{roomCode}</div>
          </div>
          <button type="button" className="text-xs text-brand-600 font-semibold">
            공유하기
          </button>
        </div>
        <div className="space-y-3">
          <div className="text-sm font-semibold">참가자 ({players.length})</div>
          <div className="space-y-2">
            {players.map((player) => (
              <div
                key={player.id}
                className="flex items-center justify-between border border-slate-200 rounded-xl px-4 py-3"
              >
                <div>
                  <div className="font-semibold text-sm">{player.name}</div>
                  <div className="text-xs text-slate-500">
                    {player.team === 'cop' ? '경찰' : '도둑'} · {player.role === 'master' ? '마스터' : '플레이어'}
                  </div>
                </div>
                <span className="text-xs text-emerald-600 font-semibold">준비 완료</span>
              </div>
            ))}
          </div>
        </div>
        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4">
          <div className="text-sm font-semibold">팀 배정 결과</div>
          <div className="mt-3 flex gap-3">
            <div className="flex-1 rounded-xl bg-white border border-slate-200 px-3 py-2">
              <div className="text-xs text-slate-400">경찰</div>
              <div className="font-semibold">{players.filter((player) => player.team === 'cop').length}명</div>
            </div>
            <div className="flex-1 rounded-xl bg-white border border-slate-200 px-3 py-2">
              <div className="text-xs text-slate-400">도둑</div>
              <div className="font-semibold">{players.filter((player) => player.team === 'robber').length}명</div>
            </div>
          </div>
        </div>
        <button
          type="button"
          onClick={() => navigate('/game')}
          className="w-full py-3 rounded-2xl bg-brand-500 text-white font-semibold"
        >
          준비 완료 · 게임 시작
        </button>
      </div>
    </PhoneShell>
  );
};

export default Lobby;
