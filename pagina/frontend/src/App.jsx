import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Home from './pages/Home';

export default function App() {
  // 1. Inicializa o estado lendo do localStorage
  const [isAuthenticated, setIsAuthenticated] = useState(
    localStorage.getItem('auth') === 'true'
  );

  // 2. Função passada para Login.js para atualizar o estado
  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
    // Nota: O Login.js ainda chama localStorage.setItem e navigate,
    // mas agora o App.js reage à mudança de estado.
  };

  return (
    <BrowserRouter>
      <Routes>
        {/* Passa a função de sucesso para o Login */}
        <Route path="/" element={<Login onLoginSuccess={handleLoginSuccess} />} />
        
        {/* A rota /home agora depende de um estado reativo (isAuthenticated) */}
        <Route
          path="/home"
          element={isAuthenticated ? <Home /> : <Navigate to="/" />}
        />
      </Routes>
    </BrowserRouter>
  );
}