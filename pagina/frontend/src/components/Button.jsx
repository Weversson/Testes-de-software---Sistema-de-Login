import React from 'react';

// Aceita as props 'text' e 'disabled' e captura o restante (como data-cy)
export default function Button({ text, disabled, ...rest }) {
  return (
    <button 
      disabled={disabled} 
      className="btn"
      {...rest} // ESSENCIAL: Repassa data-cy e outras props para o botão nativo
    >
      {text}
    </button>
  );
}