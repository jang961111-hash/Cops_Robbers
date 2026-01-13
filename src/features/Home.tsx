import { useNavigate } from 'react-router-dom';
import PhoneShell from '../components/PhoneShell';

const Home = () => {
  const navigate = useNavigate();

  return (
    <PhoneShell title="홈">
      <div className="p-6 space-y-4">
        {/* 빠른 시작 */}
        <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl p-6 text-white shadow-xl">
          <div className="text-3xl mb-3">🚀</div>
          <h2 className="text-xl font-bold mb-2">방 만들기</h2>
          <button
            type="button"
            onClick={() => navigate('/lobby')}
            className="mt-3 w-full py-3 rounded-xl bg-white text-purple-600 font-bold shadow-md"
          >
            + 새 게임 생성
          </button>
        </div>

        {/* 방 입장 */}
        <div className="bg-white border-2 border-slate-200 rounded-2xl p-5">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-2xl">🔑</span>
            <h2 className="text-lg font-bold">코드 입장</h2>
          </div>
          <div className="flex gap-2">
            <input
              className="flex-1 border-2 border-slate-300 rounded-xl px-4 py-3 text-lg font-mono font-bold text-center uppercase placeholder:text-slate-400"
              placeholder="F2K9"
              maxLength={4}
            />
            <button
              type="button"
              onClick={() => navigate('/lobby')}
              className="px-6 py-3 rounded-xl bg-slate-900 text-white font-bold"
            >
              →
            </button>
          </div>
        </div>

        {/* 최근 게임 */}
        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-xl">⏱️</span>
            <h3 className="text-sm font-bold text-slate-600">최근 게임</h3>
          </div>
          <div className="space-y-2">
            {['F2K9', 'A7X3'].map((code) => (
              <button
                key={code}
                type="button"
                onClick={() => navigate('/lobby')}
                className="w-full flex items-center justify-between bg-white border border-slate-200 rounded-xl px-4 py-2 hover:border-blue-300"
              >
                <span className="font-mono font-bold">{code}</span>
                <span className="text-xs text-slate-400">2분 전</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </PhoneShell>
  );
};

export default Home;
