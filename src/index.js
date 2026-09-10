import React from 'react';
import { createRoot } from 'react-dom/client';
import { HashRouter } from 'react-router-dom';
import { GameStateProvider } from './context/GameStateContext';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/global.css';
import './styles/cyber-theme.css';

const root = createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <HashRouter>
      <GameStateProvider>
        <App />
      </GameStateProvider>
    </HashRouter>
  </React.StrictMode>
);