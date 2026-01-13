import clsx from 'clsx';
import { Player, Position } from '../types/game';

interface MapDummyProps {
  players: Player[];
  highlightTeam: 'cop' | 'robber';
  geofence?: Position[];
}

const MapDummy = ({ players, highlightTeam, geofence }: MapDummyProps) => {
  const grid = Array.from({ length: 10 }, (_, index) => index + 1);

  return (
    <div className="relative w-full h-64 bg-slate-50 border border-slate-200 rounded-2xl overflow-hidden">
      <div className="absolute inset-0 grid grid-cols-10 grid-rows-10">
        {grid.flatMap((row) =>
          grid.map((col) => (
            <div
              key={`${row}-${col}`}
              className="border border-slate-100"
              aria-hidden="true"
            />
          ))
        )}
      </div>
      {geofence && (
        <div className="absolute inset-0">
          {geofence.map((point, index) => (
            <div
              key={`point-${index}`}
              className="absolute w-3 h-3 rounded-full bg-brand-400 border-2 border-white shadow"
              style={{
                left: `${point.x * 10}%`,
                top: `${point.y * 10}%`,
                transform: 'translate(-50%, -50%)'
              }}
            />
          ))}
          <div className="absolute inset-0 border-2 border-dashed border-brand-300 rounded-2xl pointer-events-none" />
        </div>
      )}
      {players.map((player) => (
        <div
          key={player.id}
          className={clsx(
            'absolute w-4 h-4 rounded-full border-2 border-white shadow',
            player.team === highlightTeam ? 'bg-brand-500' : 'bg-slate-300',
            player.status === 'jailed' && 'bg-rose-400'
          )}
          style={{
            left: `${player.position.x * 10}%`,
            top: `${player.position.y * 10}%`,
            transform: 'translate(-50%, -50%)'
          }}
          title={player.name}
        />
      ))}
      <div className="absolute bottom-3 left-3 bg-white/90 text-[10px] rounded-full px-3 py-1 shadow">
        더미 지도 (격자)
      </div>
    </div>
  );
};

export default MapDummy;
