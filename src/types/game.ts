export type Role = 'cop' | 'robber' | 'master';
export type Team = 'cop' | 'robber';
export type PlayerStatus = 'alive' | 'jailed';

export interface Position {
  x: number;
  y: number;
}

export interface Player {
  id: string;
  name: string;
  role: Role;
  team: Team;
  status: PlayerStatus;
  position: Position;
  lastUpdated: string;
}

export interface ToastMessage {
  id: string;
  message: string;
  tone: 'info' | 'warning' | 'success';
}

export interface ArrestRequest {
  id: string;
  copId: string;
  robberId: string;
  status: 'pending' | 'confirmed';
}

export interface GeofenceSetting {
  points: Position[];
  warnings: {
    first: boolean;
    second: boolean;
    third: boolean;
  };
}
