import { Position } from '../types/game';

/**
 * AI 기능: Movement Risk Classification
 * 
 * 목적: 플레이어 이동 패턴을 분석하여 관리자에게 주의가 필요한 플레이어를 시각적으로 강조
 * 
 * ⚠️ 중요 원칙:
 * - AI는 절대 처벌을 결정하지 않음
 * - AI는 오직 UI 신호만 발생 (색상, 배지, 알림)
 * - 최종 판단은 항상 관리자(Master)가 수행
 */

export type RiskLevel = 'normal' | 'warning' | 'danger';

export interface PositionWithTime extends Position {
  timestamp: number; // Unix timestamp (ms)
}

export interface BoundaryInfo {
  points: Position[]; // 지오펜스 경계 좌표
  radius?: number; // 허용 반경 (옵션)
}

export interface RiskAnalysisResult {
  riskLevel: RiskLevel;
  reasons: string[]; // 위험 레벨 판단 근거 (관리자용)
  signals: {
    color: string; // UI 색상
    icon: string; // 아이콘
    badge?: string; // 배지 텍스트
  };
}

/**
 * 플레이어의 이동 시퀀스를 분석하여 위험 레벨 분류
 * 
 * @param positions - 시간순으로 정렬된 위치 시퀀스
 * @param boundary - 게임 경계 정보
 * @returns 위험 분석 결과
 */
export const classifyMovementRisk = (
  positions: PositionWithTime[],
  boundary: BoundaryInfo
): RiskAnalysisResult => {
  if (positions.length === 0) {
    return {
      riskLevel: 'normal',
      reasons: ['데이터 없음'],
      signals: {
        color: 'bg-gray-500',
        icon: '❓',
      },
    };
  }

  const reasons: string[] = [];
  let riskScore = 0;

  // 1. 경계 이탈 확인
  const outOfBoundsCount = countOutOfBounds(positions, boundary);
  if (outOfBoundsCount > 0) {
    reasons.push(`경계 이탈 ${outOfBoundsCount}회 감지`);
    riskScore += outOfBoundsCount * 10;
  }

  // 2. 비정상적 속도 확인
  const abnormalSpeedCount = detectAbnormalSpeed(positions);
  if (abnormalSpeedCount > 0) {
    reasons.push(`비정상 속도 ${abnormalSpeedCount}회 감지`);
    riskScore += abnormalSpeedCount * 5;
  }

  // 3. 급격한 방향 전환 확인
  const suddenDirectionChanges = detectSuddenDirectionChanges(positions);
  if (suddenDirectionChanges > 2) {
    reasons.push(`급격한 방향 전환 ${suddenDirectionChanges}회`);
    riskScore += suddenDirectionChanges * 3;
  }

  // 4. 장시간 정지 확인
  const longStopDuration = detectLongStop(positions);
  if (longStopDuration > 300000) {
    // 5분 이상
    reasons.push(`장시간 정지 (${Math.floor(longStopDuration / 60000)}분)`);
    riskScore += 10;
  }

  // 위험 레벨 결정
  let riskLevel: RiskLevel;
  let signals: RiskAnalysisResult['signals'];

  if (riskScore >= 30) {
    riskLevel = 'danger';
    signals = {
      color: 'bg-red-500',
      icon: '🚨',
      badge: '위험',
    };
    reasons.unshift('즉시 확인 필요');
  } else if (riskScore >= 15) {
    riskLevel = 'warning';
    signals = {
      color: 'bg-yellow-500',
      icon: '⚠️',
      badge: '주의',
    };
    reasons.unshift('모니터링 필요');
  } else {
    riskLevel = 'normal';
    signals = {
      color: 'bg-green-500',
      icon: '✅',
    };
    reasons.push('정상 활동');
  }

  return {
    riskLevel,
    reasons,
    signals,
  };
};

/**
 * 경계 이탈 횟수 계산
 */
const countOutOfBounds = (
  positions: PositionWithTime[],
  boundary: BoundaryInfo
): number => {
  // 간단한 반경 기반 체크 (실제로는 폴리곤 체크 필요)
  if (!boundary.radius) return 0;

  const center = boundary.points[0] || { x: 5, y: 5 };
  return positions.filter((pos) => {
    const distance = Math.sqrt(
      Math.pow(pos.x - center.x, 2) + Math.pow(pos.y - center.y, 2)
    );
    return distance > boundary.radius!;
  }).length;
};

/**
 * 비정상적 속도 감지
 * (예: 사람이 걷기 어려운 속도로 이동)
 */
const detectAbnormalSpeed = (positions: PositionWithTime[]): number => {
  let abnormalCount = 0;
  const MAX_SPEED = 10; // 단위 시간당 최대 이동 거리

  for (let i = 1; i < positions.length; i++) {
    const prev = positions[i - 1];
    const curr = positions[i];
    const timeDiff = (curr.timestamp - prev.timestamp) / 1000; // 초 단위

    if (timeDiff === 0) continue;

    const distance = Math.sqrt(
      Math.pow(curr.x - prev.x, 2) + Math.pow(curr.y - prev.y, 2)
    );
    const speed = distance / timeDiff;

    if (speed > MAX_SPEED) {
      abnormalCount++;
    }
  }

  return abnormalCount;
};

/**
 * 급격한 방향 전환 감지
 */
const detectSuddenDirectionChanges = (positions: PositionWithTime[]): number => {
  if (positions.length < 3) return 0;

  let changeCount = 0;
  const ANGLE_THRESHOLD = 120; // 120도 이상 방향 전환

  for (let i = 2; i < positions.length; i++) {
    const p1 = positions[i - 2];
    const p2 = positions[i - 1];
    const p3 = positions[i];

    const angle = calculateAngle(p1, p2, p3);
    if (angle > ANGLE_THRESHOLD) {
      changeCount++;
    }
  }

  return changeCount;
};

/**
 * 장시간 정지 감지
 */
const detectLongStop = (positions: PositionWithTime[]): number => {
  if (positions.length < 2) return 0;

  let maxStopDuration = 0;
  let stopStart = positions[0].timestamp;

  for (let i = 1; i < positions.length; i++) {
    const prev = positions[i - 1];
    const curr = positions[i];

    // 위치 변화 확인
    const moved =
      Math.abs(curr.x - prev.x) > 0.1 || Math.abs(curr.y - prev.y) > 0.1;

    if (moved) {
      const stopDuration = prev.timestamp - stopStart;
      maxStopDuration = Math.max(maxStopDuration, stopDuration);
      stopStart = curr.timestamp;
    }
  }

  // 마지막 정지 시간 체크
  const lastStopDuration = positions[positions.length - 1].timestamp - stopStart;
  maxStopDuration = Math.max(maxStopDuration, lastStopDuration);

  return maxStopDuration;
};

/**
 * 세 점 사이의 각도 계산
 */
const calculateAngle = (p1: Position, p2: Position, p3: Position): number => {
  const v1 = { x: p2.x - p1.x, y: p2.y - p1.y };
  const v2 = { x: p3.x - p2.x, y: p3.y - p2.y };

  const dot = v1.x * v2.x + v1.y * v2.y;
  const mag1 = Math.sqrt(v1.x * v1.x + v1.y * v1.y);
  const mag2 = Math.sqrt(v2.x * v2.x + v2.y * v2.y);

  if (mag1 === 0 || mag2 === 0) return 0;

  const cosAngle = dot / (mag1 * mag2);
  const angle = Math.acos(Math.max(-1, Math.min(1, cosAngle)));

  return (angle * 180) / Math.PI;
};

/**
 * 위험 레벨에 따른 UI 클래스 반환
 */
export const getRiskUIClasses = (riskLevel: RiskLevel) => {
  switch (riskLevel) {
    case 'danger':
      return {
        bg: 'bg-red-50',
        border: 'border-red-300',
        text: 'text-red-700',
        badge: 'bg-red-500 text-white',
        pulse: 'animate-pulse',
      };
    case 'warning':
      return {
        bg: 'bg-yellow-50',
        border: 'border-yellow-300',
        text: 'text-yellow-700',
        badge: 'bg-yellow-500 text-white',
        pulse: '',
      };
    case 'normal':
    default:
      return {
        bg: 'bg-green-50',
        border: 'border-green-300',
        text: 'text-green-700',
        badge: 'bg-green-500 text-white',
        pulse: '',
      };
  }
};
