import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App'; // Ensure the import path doesn't include `.tsx`

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App activePage="home" />
  </React.StrictMode>
);
