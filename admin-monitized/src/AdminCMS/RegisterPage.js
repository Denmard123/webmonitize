import React from 'react';
import RegisterForm from './RegisterForm.js';

const RegisterPage = ({ onRegister, onToggleRegister }) => {
  const handleRegister = (userData) => {
    onRegister(userData);
  };

  return (
    <div>
      <h2>Register</h2>
      <RegisterForm onRegister={handleRegister} />
      <button onClick={onToggleRegister}>Back to Login</button>
    </div>
  );
};

export default RegisterPage;
