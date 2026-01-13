import { useNavigate } from 'react-router-dom';
import PhoneShell from '../components/PhoneShell';

const Home = () => {
  const navigate = useNavigate();

  return (
    <PhoneShell title="홈">
      <div className="p-6 space-y-6">
        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5">
          <h2 className="text-base font-semibold">빠른 방 생성</h2>
          <p className="text-sm text-slate-500 mt-2">
            친구들과 즉시 플레이할 수 있는 방을 만듭니다.
          </p>
          <button
            type="button"
            onClick={() => navigate('/lobby')}
            className="mt-4 w-full py-3 rounded-xl bg-brand-500 text-white font-semibold"
          >
            방 만들기
          </button>
        </div>
        <div className="bg-white border border-slate-200 rounded-2xl p-5">
          <h2 className="text-base font-semibold">방 코드로 입장</h2>
          <div className="mt-3 flex gap-2">
            <input
              className="flex-1 border border-slate-200 rounded-xl px-3 py-2 text-sm"
              placeholder="예: F2K9"
            />
            <button
              type="button"
              onClick={() => navigate('/lobby')}
              className="px-4 py-2 rounded-xl border border-slate-200 text-sm font-semibold"
            >
              입장
            </button>
          </div>
        </div>
        <div className="bg-brand-50 border border-brand-100 rounded-2xl p-5">
          <h3 className="text-sm font-semibold text-brand-700">MVP 알림</h3>
          <p className="text-xs text-brand-700 mt-2">모든 데이터는 더미이며 UI 검증용입니다.</p>
        </div>
      </div>
    </PhoneShell>
  );
};

export default Home;
