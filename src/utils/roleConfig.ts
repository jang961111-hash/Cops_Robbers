import { Role, Team } from '../types/game';

/**
 * 역할별 UX 차이 정의
 * - Police: 정보 우위, 명확한 메시지, 파란색
 * - Thief: 불안감, 모호한 메시지, 빨간색
 * - Master: 통제, 명확한 메시지, 초록색
 */

export const ROLE_CONFIG = {
  cop: {
    color: 'blue',
    bgColor: 'bg-blue-50',
    borderColor: 'border-blue-200',
    textColor: 'text-blue-600',
    accentColor: 'bg-blue-500',
    messageStyle: 'explicit' as const,
    showTeamPositions: true,
    showPolicePositions: true,
  },
  robber: {
    color: 'red',
    bgColor: 'bg-red-50',
    borderColor: 'border-red-200',
    textColor: 'text-red-600',
    accentColor: 'bg-red-500',
    messageStyle: 'vague' as const,
    showTeamPositions: true, // 팀원 위치는 보여줌
    showPolicePositions: false, // 경찰 위치는 숨김
  },
  master: {
    color: 'green',
    bgColor: 'bg-green-50',
    borderColor: 'border-green-200',
    textColor: 'text-green-600',
    accentColor: 'bg-green-500',
    messageStyle: 'explicit' as const,
    showTeamPositions: true,
    showPolicePositions: true,
  },
} as const;

/**
 * 역할에 따른 경고 메시지 생성
 * - Police: "도둑 3명이 400m 거리에 있습니다"
 * - Thief: "주변에 위협이 감지되었습니다"
 */
export const generateAlertMessage = (
  role: Role,
  situation: 'nearby' | 'detected' | 'distance',
  details?: {
    count?: number;
    distance?: number;
    name?: string;
  }
): string => {
  const { messageStyle } = ROLE_CONFIG[role];

  if (messageStyle === 'explicit') {
    // 경찰/마스터: 명확한 메시지
    switch (situation) {
      case 'nearby':
        return `${details?.name || '도둑'}이(가) ${details?.distance || 0}m 거리에 있습니다`;
      case 'detected':
        return `${details?.count || 0}명의 도둑이 감지되었습니다`;
      case 'distance':
        return `${details?.count || 0}명이 ${details?.distance || 0}m 이내에 있습니다`;
      default:
        return '정보 없음';
    }
  } else {
    // 도둑: 모호한 메시지
    switch (situation) {
      case 'nearby':
        return '주변에 움직임이 감지되었습니다';
      case 'detected':
        return '누군가 접근하고 있습니다';
      case 'distance':
        return '위협이 감지되었습니다';
      default:
        return '뭔가 이상한데...';
    }
  }
};

/**
 * 역할에 따른 UI 클래스 반환
 */
export const getRoleUIClasses = (role: Role) => {
  return ROLE_CONFIG[role];
};

/**
 * 역할이 특정 정보를 볼 수 있는지 확인
 */
export const canSeePolicePositions = (role: Role): boolean => {
  return ROLE_CONFIG[role].showPolicePositions;
};

export const canSeeTeamPositions = (role: Role): boolean => {
  return ROLE_CONFIG[role].showTeamPositions;
};

/**
 * 팀 색상 반환
 */
export const getTeamColor = (team: Team): string => {
  return team === 'cop' ? 'bg-blue-500' : 'bg-red-500';
};

export const getTeamBgColor = (team: Team): string => {
  return team === 'cop' ? 'bg-blue-50' : 'bg-red-50';
};
