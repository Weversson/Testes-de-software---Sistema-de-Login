import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Home from './pages/Home';

export default function App() {
  // 💡 ESTADO REATIVO: Inicializa o estado lendo o valor do localStorage.
  const [isAuthenticated, setIsAuthenticated] = useState(
    localStorage.getItem('auth') === 'true'
  );

  // Função para ser passada para o Login (Chamar após o sucesso)
  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
  };

  // Função para ser passada para o Home (Chamar após o logout)
  const handleLogout = () => {
    localStorage.removeItem("auth");
    setIsAuthenticated(false);
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route 
          path="/" 
          // Passamos a função de sucesso para o componente Login
          element={isAuthenticated ? <Navigate to="/home" /> : <Login onLoginSuccess={handleLoginSuccess} />} 
        />
        
        <Route
          path="/home"
          // Passamos a função de logout para o componente Home
          element={isAuthenticated ? <Home onLogout={handleLogout} /> : <Navigate to="/" />}
        />
      </Routes>
    </BrowserRouter>
  );
}