import { Navigate, Route, Routes } from 'react-router-dom';
import Onboarding from './features/Onboarding';
import Home from './features/Home';
import Lobby from './features/Lobby';
import GameMain from './features/GameMain';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Onboarding />} />
      <Route path="/home" element={<Home />} />
      <Route path="/lobby" element={<Lobby />} />
      <Route path="/game" element={<GameMain />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default App;
