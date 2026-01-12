import { create } from 'zustand';
import { initialGeofence, initialPlayers } from '../data/initialData';
import { ArrestRequest, GeofenceSetting, Player, Role, Team, ToastMessage } from '../types/game';

const randomTime = () => `${Math.floor(Math.random() * 4) + 1}분 전`;

interface GameState {
  meId: string;
  role: Role;
  team: Team;
  roomCode: string;
  players: Player[];
  geofence: GeofenceSetting;
  toasts: ToastMessage[];
  activeTab: 'map' | 'jail' | 'rules' | 'profile';
  showDevPanel: boolean;
  selectedPlayerId?: string;
  arrestRequest?: ArrestRequest;
  outOfBounds: boolean;
  actions: {
    setRole: (role: Role) => void;
    setTeam: (team: Team) => void;
    setActiveTab: (tab: GameState['activeTab']) => void;
    toggleDevPanel: () => void;
    selectPlayer: (id?: string) => void;
    moveMe: (x: number, y: number) => void;
    randomMoveTeam: () => void;
    triggerArrest: () => void;
    confirmArrest: () => void;
    clearArrest: () => void;
    triggerOutOfBounds: () => void;
    clearToast: (id: string) => void;
    updateWarning: (key: keyof GeofenceSetting['warnings']) => void;
    updateNickname: (name: string) => void;
  };
}

export const useGameStore = create<GameState>((set, get) => ({
  meId: 'p1',
  role: 'cop',
  team: 'cop',
  roomCode: 'F2K9',
  players: initialPlayers,
  geofence: initialGeofence,
  toasts: [],
  activeTab: 'map',
  showDevPanel: false,
  selectedPlayerId: undefined,
  arrestRequest: undefined,
  outOfBounds: false,
  actions: {
    setRole: (role) => set({ role }),
    setTeam: (team) => set({ team }),
    setActiveTab: (tab) => set({ activeTab: tab }),
    toggleDevPanel: () => set((state) => ({ showDevPanel: !state.showDevPanel })),
    selectPlayer: (id) => set({ selectedPlayerId: id }),
    moveMe: (x, y) =>
      set((state) => ({
        players: state.players.map((player) =>
          player.id === state.meId
            ? { ...player, position: { x, y }, lastUpdated: '방금' }
            : player
        )
      })),
    randomMoveTeam: () => {
      const { team } = get();
      set((state) => ({
        players: state.players.map((player) => {
          if (player.team !== team) {
            return player;
          }
          const shift = () => Math.max(1, Math.min(9, player.position.x + (Math.random() > 0.5 ? 1 : -1)));
          const shiftY = () => Math.max(1, Math.min(9, player.position.y + (Math.random() > 0.5 ? 1 : -1)));
          return {
            ...player,
            position: { x: shift(), y: shiftY() },
            lastUpdated: randomTime()
          };
        })
      }));
    },
    triggerArrest: () => {
      const { players } = get();
      const robber = players.find((player) => player.team === 'robber' && player.status === 'alive');
      if (!robber) {
        return;
      }
      const request: ArrestRequest = {
        id: `arrest-${Date.now()}`,
        copId: 'p1',
        robberId: robber.id,
        status: 'pending'
      };
      set((state) => ({
        arrestRequest: request,
        toasts: [
          {
            id: `toast-${Date.now()}`,
            message: `${robber.name} 체포 요청 발생`,
            tone: 'warning'
          },
          ...state.toasts
        ]
      }));
    },
    confirmArrest: () => {
      const { arrestRequest } = get();
      if (!arrestRequest) return;
      set((state) => ({
        arrestRequest: { ...arrestRequest, status: 'confirmed' },
        players: state.players.map((player) =>
          player.id === arrestRequest.robberId ? { ...player, status: 'jailed' } : player
        ),
        toasts: [
          {
            id: `toast-${Date.now()}`,
            message: '체포 확정: 감옥 이동 완료',
            tone: 'success'
          },
          ...state.toasts
        ]
      }));
    },
    clearArrest: () => set({ arrestRequest: undefined }),
    triggerOutOfBounds: () =>
      set((state) => ({
        outOfBounds: true,
        toasts: [
          {
            id: `toast-${Date.now()}`,
            message: '범위 이탈 감지! 1차 경고 발송',
            tone: 'warning'
          },
          ...state.toasts
        ]
      })),
    clearToast: (id) => set((state) => ({ toasts: state.toasts.filter((toast) => toast.id !== id) })),
    updateWarning: (key) =>
      set((state) => ({
        geofence: {
          ...state.geofence,
          warnings: {
            ...state.geofence.warnings,
            [key]: !state.geofence.warnings[key]
          }
        }
      })),
    updateNickname: (name) =>
      set((state) => ({
        players: state.players.map((player) =>
          player.id === state.meId ? { ...player, name } : player
        )
      }))
  }
}));
