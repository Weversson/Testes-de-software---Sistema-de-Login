import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Home({ onLogout }) {
  const navigate = useNavigate();

  function handleLogout() { // Convenção melhorada
    if (onLogout) {
      onLogout();
    }
    navigate("/");
  }

  return (
    // 💡 app-main-container: Contêiner de tela cheia para centralizar todo o conteúdo.
    <div className="app-main-container"> 
      
      {/* 💡 home-card: Bloco central com proporção controlada e sombra. */}
      <div className="home-card"> 
        
        {/* Bloco de cabeçalho: Agrupa a saudação */}
        <header className="card-header">
          <h1 className="title-text">Bem-vindo de volta!</h1>
        </header>

        {/* Bloco de conteúdo: Contém a mensagem de status */}
        <div className="card-body"> 
          <p className="status-text">Você está autenticado e seguro.</p>
        </div>

        {/* Bloco de ação: Contém o botão */}
        <div className="card-actions"> 
          {/* btn-primary e btn-full-width para indicar um botão de destaque que ocupa a largura total */}
          <button 
            className="btn btn-primary btn-full-width" 
            onClick={handleLogout}
          >
            Sair da Conta
          </button>
        </div>
      </div>
    </div>
  );
}