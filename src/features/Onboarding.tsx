import { useNavigate } from 'react-router-dom';
import PhoneShell from '../components/PhoneShell';

const Onboarding = () => {
  const navigate = useNavigate();

  return (
    <PhoneShell title="SAFE-PLAY">
      <div className="p-6 space-y-8">
        {/* 히어로 섹션 */}
        <div className="text-center py-8">
          <div className="text-5xl mb-4">🚓</div>
          <h1 className="text-2xl font-bold mb-2">경찰과 도둑</h1>
          <p className="text-sm text-slate-500">실시간 위치 기반 게임</p>
        </div>

        {/* 역할 소개 */}
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-blue-50 border-2 border-blue-200 rounded-2xl p-4 text-center">
            <div className="text-3xl mb-2">👮</div>
            <div className="font-bold text-blue-700">경찰</div>
            <div className="text-xs text-blue-600 mt-1">추적 · 체포</div>
          </div>
          <div className="bg-red-50 border-2 border-red-200 rounded-2xl p-4 text-center">
            <div className="text-3xl mb-2">🏃</div>
            <div className="font-bold text-red-700">도둑</div>
            <div className="text-xs text-red-600 mt-1">회피 · 생존</div>
          </div>
        </div>

        {/* 시작 버튼 */}
        <div className="space-y-3">
          <button
            type="button"
            onClick={() => navigate('/home')}
            className="w-full py-4 rounded-2xl bg-gradient-to-r from-blue-500 to-purple-500 text-white font-bold text-lg shadow-lg"
          >
            🎮 게임 시작
          </button>
        </div>
      </div>
    </PhoneShell>
  );
};

export default Onboarding;
