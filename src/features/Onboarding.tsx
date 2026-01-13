import { useNavigate } from 'react-router-dom';
import PhoneShell from '../components/PhoneShell';

const Onboarding = () => {
  const navigate = useNavigate();

  return (
    <PhoneShell title="오프라인 추노 게임">
      <div className="p-6 space-y-6">
        <div className="bg-brand-50 border border-brand-100 rounded-2xl p-5">
          <div className="text-sm text-brand-700 font-semibold">오늘의 게임 요약</div>
          <p className="text-xs text-brand-700 mt-2">
            팀별 위치 공유, 감옥 현황, 범위 경고를 실시간으로 관리하는 보조 앱입니다.
          </p>
        </div>
        <div>
          <h2 className="text-lg font-semibold">빠르게 시작하기</h2>
          <p className="text-sm text-slate-500 mt-2">
            오프라인 게임에 참여하려면 게스트 또는 소셜 로그인으로 시작하세요.
          </p>
        </div>
        <div className="space-y-3">
          <button
            type="button"
            onClick={() => navigate('/home')}
            className="w-full py-3 rounded-2xl bg-brand-500 text-white font-semibold"
          >
            게스트로 시작
          </button>
          <button
            type="button"
            onClick={() => navigate('/home')}
            className="w-full py-3 rounded-2xl border border-slate-200 text-slate-600 font-semibold"
          >
            소셜 로그인 (더미)
          </button>
        </div>
      </div>
    </PhoneShell>
  );
};

export default Onboarding;
