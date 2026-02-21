import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import "bootstrap/dist/css/bootstrap.min.css";
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { BrowserRouter } from 'react-router-dom';

import App from './App.jsx'
import { AuthProvider } from './context/AuthContext'; // 👈 ضيفي هذا

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>   {/* 👈 لفينا التطبيق بالكونتكس */}
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </AuthProvider>
  </StrictMode>
)
