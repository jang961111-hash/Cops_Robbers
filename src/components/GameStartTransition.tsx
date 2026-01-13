import { useEffect, useState } from 'react';
import { Role } from '../types/game';
import { getRoleUIClasses } from '../utils/roleConfig';

interface GameStartTransitionProps {
  role: Role;
  onComplete: () => void;
}

/**
 * 게임 시작 카운트다운 트랜지션
 * - 역할별 다른 메시지와 색상
 * - 3, 2, 1 카운트다운 애니메이션
 * - 경찰: "추적 시작!" / 도둑: "도망쳐!" / 마스터: "게임 시작!"
 */
const GameStartTransition = ({ role, onComplete }: GameStartTransitionProps) => {
  const [count, setCount] = useState(3);
  const [showMessage, setShowMessage] = useState(false);
  const roleConfig = getRoleUIClasses(role);

  // 역할별 메시지
  const messages = {
    cop: '추적 시작!',
    robber: '도망쳐!',
    master: '게임 시작!'
  };

  useEffect(() => {
    // 카운트다운
    if (count > 0) {
      const timer = setTimeout(() => setCount(count - 1), 1000);
      return () => clearTimeout(timer);
    }

    // 메시지 표시
    if (count === 0 && !showMessage) {
      setShowMessage(true);
      const timer = setTimeout(() => {
        onComplete();
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [count, showMessage, onComplete]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-90">
      <div className="text-center">
        {!showMessage ? (
          // 카운트다운 숫자
          <div
            className={`text-[120px] font-bold ${roleConfig.textColor} animate-bounce`}
            style={{
              textShadow: '0 0 40px rgba(255,255,255,0.5)',
              animation: 'pulse 0.5s ease-in-out'
            }}
          >
            {count}
          </div>
        ) : (
          // 시작 메시지
          <div className="space-y-4 animate-pulse">
            <div className="text-6xl">
              {role === 'cop' ? '🚓' : role === 'robber' ? '🏃‍♂️' : '🎮'}
            </div>
            <div
              className={`text-4xl font-bold ${roleConfig.textColor}`}
              style={{
                textShadow: `0 0 20px ${
                  role === 'cop' ? '#3b82f6' : role === 'robber' ? '#ef4444' : '#10b981'
                }`
              }}
            >
              {messages[role]}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default GameStartTransition;
