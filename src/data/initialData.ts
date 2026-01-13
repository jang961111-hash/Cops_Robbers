import { GeofenceSetting, Player } from '../types/game';

export const initialPlayers: Player[] = [
  {
    id: 'p1',
    name: '민준',
    role: 'cop',
    team: 'cop',
    status: 'alive',
    position: { x: 2, y: 3 },
    lastUpdated: '1분 전'
  },
  {
    id: 'p2',
    name: '서연',
    role: 'master',
    team: 'cop',
    status: 'alive',
    position: { x: 6, y: 5 },
    lastUpdated: '2분 전'
  },
  {
    id: 'p3',
    name: '지우',
    role: 'cop',
    team: 'cop',
    status: 'alive',
    position: { x: 4, y: 1 },
    lastUpdated: '방금'
  },
  {
    id: 'p4',
    name: '도윤',
    role: 'robber',
    team: 'robber',
    status: 'alive',
    position: { x: 8, y: 7 },
    lastUpdated: '30초 전'
  },
  {
    id: 'p5',
    name: '하린',
    role: 'robber',
    team: 'robber',
    status: 'alive',
    position: { x: 9, y: 6 },
    lastUpdated: '1분 전'
  },
  {
    id: 'p6',
    name: '예준',
    role: 'robber',
    team: 'robber',
    status: 'alive',
    position: { x: 7, y: 8 },
    lastUpdated: '3분 전'
  },
  {
    id: 'p7',
    name: '수아',
    role: 'robber',
    team: 'robber',
    status: 'jailed',
    position: { x: 5, y: 9 },
    lastUpdated: '5분 전'
  },
  {
    id: 'p8',
    name: '현우',
    role: 'robber',
    team: 'robber',
    status: 'alive',
    position: { x: 3, y: 7 },
    lastUpdated: '2분 전'
  }
];

export const initialGeofence: GeofenceSetting = {
  points: [
    { x: 1, y: 1 },
    { x: 9, y: 1 },
    { x: 9, y: 9 },
    { x: 1, y: 9 }
  ],
  warnings: {
    first: true,
    second: true,
    third: true
  }
};
