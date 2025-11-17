import React from 'react';

// Adicionei {...rest} para capturar e repassar props adicionais (como data-cy)
export default function Input({ label, type, value, onChange, ...rest }) {
  return (
    <div className="input-group">
      <label>{label}</label>
      <input 
        type={type} 
        value={value} 
        onChange={onChange} 
        required
        {...rest} // ESSENCIAL: Repassa data-cy, id, etc., para o input nativo
      />
    </div>
  );
}