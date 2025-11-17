import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Input from '../components/Input';
import Button from '../components/Button';

// 💡 Recebe a função de sucesso como prop
export default function Login({ onLoginSuccess }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState(''); 
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setSuccess('');
    setIsLoading(true);

    try {
      const response = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }) 
      });

      if (response.ok) {
        setSuccess("Login realizado com sucesso!");
        localStorage.setItem("auth", "true");
        
        // 🚀 Chama a função de sucesso do App.js para atualizar o estado!
        if (onLoginSuccess) {
            onLoginSuccess(); 
        }

        // CORREÇÃO: Navegação imediata após a atualização do estado
        navigate("/home"); 

      } else {
        const errorData = await response.json().catch(() => ({})); 
        const message = errorData.message || "E-mail ou senha incorretos. Verifique suas credenciais.";
        setError(message);
      }
    } catch (e) {
      setError("Falha ao conectar ao servidor. Verifique se o backend está rodando.");
    } finally {
      setIsLoading(false);
    }
  }

  const disabled = email.trim() === '' || password.trim() === '' || isLoading;

  return (
    <div className="login-container">
      <form className="login-box" onSubmit={handleSubmit}>
        <h2>Acessar Conta</h2>

        <Input 
          label="E-mail" 
          type="email" 
          value={email} 
          onChange={e => setEmail(e.target.value)}
          data-cy="email-input" 
        />
        <Input 
          label="Senha" 
          type="password" 
          value={password} 
          onChange={e => setPassword(e.target.value)}
          data-cy="password-input" 
        />

        {error && <p className="error">{error}</p>}
        {success && <p className="success">{success}</p>}

        <Button 
          text={isLoading ? "Entrando..." : "Entrar"} 
          disabled={disabled}
          data-cy="login-button" 
        />
      </form>
    </div>
  );
}