import React from 'react';
import { createRoot } from 'react-dom/client';  // Import from "react-dom/client"
import { BrowserRouter } from 'react-router-dom';
import App from './components/App';
import './styles/reset.css';
import './styles/styles.css';

const root = document.getElementById('root');
const rootContainer = createRoot(root);

rootContainer.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
