import { useState } from 'react';
import MapDummy from '../../components/MapDummy';
import { useGameStore } from '../../store/gameStore';
import { Player } from '../../types/game';

const MapTab = () => {
  const { players, team, actions } = useGameStore();
  const [shareMode, setShareMode] = useState('구역 공유');
  const teamPlayers = players.filter((player) => player.team === team);

  const selectPlayer = (player: Player) => {
    actions.selectPlayer(player.id);
  };

  return (
    <div className="p-4 space-y-4">
      <div className="bg-white rounded-2xl border border-slate-200 p-4 space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-xs text-slate-400">팀 전용 맵</div>
            <div className="text-sm font-semibold">{team === 'cop' ? '경찰' : '도둑'} 위치 공유</div>
          </div>
          <span className="text-xs bg-brand-50 text-brand-600 px-2 py-1 rounded-full">실시간</span>
        </div>
        <MapDummy players={teamPlayers} highlightTeam={team} />
        <div>
          <div className="text-xs text-slate-400 mb-2">위치 공유 방식</div>
          <div className="flex gap-2">
            {['구역 공유', '블러 공유', '지연 공유'].map((mode) => (
              <button
                key={mode}
                type="button"
                onClick={() => setShareMode(mode)}
                className={
                  shareMode === mode
                    ? 'flex-1 text-xs py-2 rounded-xl bg-brand-500 text-white'
                    : 'flex-1 text-xs py-2 rounded-xl border border-slate-200 text-slate-500'
                }
              >
                {mode}
              </button>
            ))}
          </div>
        </div>
      </div>
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <div className="text-sm font-semibold">팀원 카드</div>
          <button type="button" className="text-xs text-brand-600">
            전체 보기
          </button>
        </div>
        {teamPlayers.map((player) => (
          <button
            type="button"
            key={player.id}
            onClick={() => selectPlayer(player)}
            className="w-full text-left border border-slate-200 rounded-2xl px-4 py-3 flex items-center justify-between"
          >
            <div>
              <div className="text-sm font-semibold">{player.name}</div>
              <div className="text-xs text-slate-500">마지막 업데이트 · {player.lastUpdated}</div>
            </div>
            <span className={player.status === 'jailed' ? 'text-xs text-rose-500' : 'text-xs text-emerald-500'}>
              {player.status === 'jailed' ? '수감' : '활동'}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default MapTab;
