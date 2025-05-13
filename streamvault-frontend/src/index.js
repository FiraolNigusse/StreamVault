import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css'; // or './App.css' depending on your file

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
