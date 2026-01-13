import { useNavigate } from 'react-router-dom';
import PhoneShell from '../components/PhoneShell';
import { useGameStore } from '../store/gameStore';
import GameStartTransition from '../components/GameStartTransition';

const Lobby = () => {
  const navigate = useNavigate();
  const { players, roomCode, role, gameStarting, actions } = useGameStore();
  const copCount = players.filter((p) => p.team === 'cop').length;
  const robberCount = players.filter((p) => p.team === 'robber').length;

  const handleStartGame = () => {
    actions.startGame();
    // 트랜지션 후 게임 화면으로 이동
    setTimeout(() => {
      navigate('/game');
    }, 4000); // 3초 카운트다운 + 1초 메시지
  };

  return (
    <>
      <PhoneShell title="대기실">
           <div className="p-6 space-y-6">
        {/* 방 코드 */}
        <div className="bg-gradient-to-r from-purple-500 to-blue-500 rounded-2xl p-5 text-white text-center">
          <div className="text-xs opacity-80 mb-1">방 코드</div>
          <div className="text-4xl font-bold font-mono tracking-wider">{roomCode}</div>
          <button type="button" className="mt-3 text-sm opacity-90 underline">
            📋 복사하기
          </button>
        </div>

        {/* 팀 현황 */}
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-4 text-center">
            <div className="text-3xl mb-1">👮</div>
            <div className="text-2xl font-bold text-blue-700">{copCount}</div>
            <div className="text-xs text-blue-600">경찰</div>
          </div>
          <div className="bg-red-50 border-2 border-red-200 rounded-xl p-4 text-center">
            <div className="text-3xl mb-1">🏃</div>
            <div className="text-2xl font-bold text-red-700">{robberCount}</div>
            <div className="text-xs text-red-600">도둑</div>
          </div>
        </div>

        {/* 참가자 목록 */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <div className="text-sm font-bold text-slate-700">참가자 {players.length}</div>
            <div className="flex gap-1">
              {players.map((p) => (
                <span key={p.id} className="text-lg">
                  {p.team === 'cop' ? '👮' : '🏃'}
                </span>
              ))}
            </div>
          </div>
          <div className="space-y-2">
            {players.map((player) => (
              <div
                key={player.id}
                className={`flex items-center justify-between rounded-xl px-4 py-3 border-2 ${
                  player.team === 'cop'
                    ? 'bg-blue-50 border-blue-200'
                    : 'bg-red-50 border-red-200'
                }`}
              >
                <div className="flex items-center gap-2">
                  <span className="text-xl">{player.team === 'cop' ? '👮' : '🏃'}</span>
                  <div className="font-semibold text-sm">{player.name}</div>
                </div>
                <span className="text-xs px-2 py-1 rounded-full bg-green-100 text-green-700 font-semibold">
                  ✓ Ready
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* 시작 버튼 */}
        <button
          type="button"
          onClick={handleStartGame}
          className="w-full py-4 rounded-2xl bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold text-lg shadow-lg"
        >
          🎮 게임 시작
        </button>
           </div>
         </PhoneShell>

    {/* 게임 시작 카운트다운 트랜지션 */}
    {gameStarting && (
         <GameStartTransition
           role={role}
           onComplete={() => actions.completeGameStart()}
         />
    )}
       </>
     );
};

export default Lobby;
