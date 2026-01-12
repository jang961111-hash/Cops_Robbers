import { useGameStore } from '../store/gameStore';
import GameStatusBar from '../components/GameStatusBar';
import TabBar from '../components/TabBar';
import MapTab from './tabs/MapTab';
import JailTab from './tabs/JailTab';
import RulesTab from './tabs/RulesTab';
import ProfileTab from './tabs/ProfileTab';
import ToastStack from '../components/ToastStack';
import BottomSheet from '../components/BottomSheet';
import DevPanel from '../components/DevPanel';
import ConfirmModal from '../components/ConfirmModal';

const GameMain = () => {
  const { activeTab, players, selectedPlayerId, actions, arrestRequest } = useGameStore();
  const selectedPlayer = players.find((player) => player.id === selectedPlayerId);
  const canArrest = selectedPlayer?.team === 'robber';

  return (
    <div className="min-h-screen bg-slate-100 flex items-start justify-center px-4 py-6">
      <div className="w-full max-w-[360px] min-h-[720px] bg-white rounded-[32px] shadow-card border border-slate-200 overflow-hidden flex flex-col">
        <GameStatusBar />
        <div className="flex-1 overflow-y-auto">
          {activeTab === 'map' && <MapTab />}
          {activeTab === 'jail' && <JailTab />}
          {activeTab === 'rules' && <RulesTab />}
          {activeTab === 'profile' && <ProfileTab />}
        </div>
        <div className="bg-white border-t border-slate-200">
          <div className="flex items-center justify-between px-4 py-2 text-xs text-slate-400">
            <span>게임 진행 중 · v0.1</span>
            <button type="button" onClick={actions.toggleDevPanel} className="text-brand-600">
              개발 패널
            </button>
          </div>
          <TabBar />
        </div>
      </div>
      <ToastStack />
      <BottomSheet player={selectedPlayer} onClose={() => actions.selectPlayer(undefined)} canArrest={!!canArrest} />
      {arrestRequest && arrestRequest.status === 'pending' && (
        <ConfirmModal
          title="체포 요청 도착"
          description="도둑이 체포 요청을 확인하면 감옥으로 이동합니다."
          confirmLabel="확인 후 감옥 이동"
          onConfirm={actions.confirmArrest}
          onClose={actions.clearArrest}
        />
      )}
      <DevPanel />
    </div>
  );
};

export default GameMain;
