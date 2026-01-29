import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/global.css';
import { HashRouter } from "react-router-dom";

const root = createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {/* <BrowserRouter basename={process.env.PUBLIC_URL}> */}
    <HashRouter >
      <App />
      {/* </BrowserRouter> */}
    </HashRouter>
  </React.StrictMode>
);