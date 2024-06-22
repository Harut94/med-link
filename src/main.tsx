import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './app/App.tsx';
import './configs/i18next';
import './index.css';
import './styles/index.scss';
import './style.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  // <React.StrictMode>
  <App />,
  // </React.StrictMode>,
);
