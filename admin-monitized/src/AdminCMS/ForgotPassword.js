import React, { useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ForgotPasswordForm = ({ onForgotPassword }) => {
  const [email, setEmail] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error('Invalid email address');
      return;
    }

    try {
      await onForgotPassword(email);
      toast.success('Password reset email sent successfully');
    } catch (error) {
      console.error('Error sending password reset email:', error);
      toast.error('Error sending password reset email');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>Email:</label>
      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
      <button type="submit">Forgot Password</button>
    </form>
  );
};

export default ForgotPasswordForm;
