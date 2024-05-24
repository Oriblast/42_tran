import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, useTheme } from './components/ThemeContext';
import HomePage from './pages/HomePage';
import Login from './pages/Login';
import ProfilePage from './pages/ProfilePage';
import Game from './pages/Game';
import Leaderboard from './pages/Leaderboard';
import Settings from './pages/Settings';
import Error from './pages/Error';
import Pong from './pages/Pong';
import IApong from './pages/IApong';
import Tournament from './pages/Tournament';
import PlayerForm from './pages/PlayerForm';
import Match from './pages/Match';

function App() {
  return (
    <ThemeProvider>
      <AppRoutes />
    </ThemeProvider>
  );
}

function AppRoutes() {
  const { theme } = useTheme();

  useEffect(() => {
    document.body.className = theme;
    console.log("Classe appliquée au body :", theme);
  }, [theme]);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/game" element={<Game />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/pong" element={<Pong />} />
        <Route path="/IApong" element={<IApong />} />
        <Route path="/Tournament" element={<Tournament />} />
        <Route path="/PlayerForm" element={<PlayerForm />} />
        <Route path="/Match" element={<Match />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </Router>
  );
}

export default App;