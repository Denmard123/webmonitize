import React, { useState, useEffect } from 'react';
import { Link, Route, Routes } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import './AdminCMS.css';
import RegisterPage from './RegisterPage';
import LoginForm from './LoginForm';
import ForgotPasswordForm from './ForgotPassword';
import ResetPasswordForm from './ResetPassword';

const AdminCMS = () => {
  const [selectedMenu, setSelectedMenu] = useState('Dashboard');
  const [newFeatureInput, setNewFeatureInput] = useState('');
  const [addedFeatures, setAddedFeatures] = useState([]);
  const [uploadedImages, setUploadedImages] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [newTestimonial, setNewTestimonial] = useState('');
  const [selectedTestimonial, setSelectedTestimonial] = useState(null);
  const [editedTestimonial, setEditedTestimonial] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [registrationMessage, setRegistrationMessage] = useState('');
  const [loginError, setLoginError] = useState('');

  useEffect(() => {
    const storedLoggedInStatus = localStorage.getItem('isLoggedIn');
    if (storedLoggedInStatus === 'true') {
      setIsLoggedIn(true);
    }
  }, []);

  const handleMenuSelection = (menu) => {
    setSelectedMenu(menu);
  };

  const handleNewFeatureAdd = () => {
    if (newFeatureInput.trim() !== '') {
      const newFeature = { id: addedFeatures.length + 1, text: newFeatureInput };
      setAddedFeatures([...addedFeatures, newFeature]);
      setNewFeatureInput('');
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = function (event) {
      const newImage = {
        id: uploadedImages.length + 1,
        url: event.target.result,
      };
      setUploadedImages([...uploadedImages, newImage]);
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = (id) => {
    const updatedImages = uploadedImages.filter((image) => image.id !== id);
    setUploadedImages(updatedImages);
  };

  const handleTestimonialAdd = () => {
    if (newTestimonial.trim() !== '') {
      const newTestimony = { id: testimonials.length + 1, text: newTestimonial };
      setTestimonials([...testimonials, newTestimony]);
      setNewTestimonial('');
    }
  };

  const handleTestimonialEdit = (id) => {
    const testimonialToEdit = testimonials.find((test) => test.id === id);
    setSelectedTestimonial(testimonialToEdit);
    setEditedTestimonial(testimonialToEdit.text);
  };

  const handleTestimonialUpdate = () => {
    const updatedTestimonials = testimonials.map((test) =>
      test.id === selectedTestimonial.id ? { ...test, text: editedTestimonial } : test
    );
    setTestimonials(updatedTestimonials);
    setSelectedTestimonial(null);
    setEditedTestimonial('');
  };

  const handleTestimonialDelete = (id) => {
    const filteredTestimonials = testimonials.filter((test) => test.id !== id);
    setTestimonials(filteredTestimonials);
  };

  const handleLogin = async (dataLogin) => {
    try {
      const response = await axios.post('http://localhost:3001/login', {
        username: dataLogin.username,
        password: dataLogin.password,
      });

      console.log(response.data);

      if (response.data === 'Login failed') {
        setLoginError('Username atau password salah.');
      } else {
        setIsLoggedIn(true);
        localStorage.setItem('isLoggedIn', 'true');
      }
    } catch (error) {
      toast.error('Pasword atau username Salah !!!');
    }
  };

  const handleRegister = async (userData) => {
    try {
      const response = await axios.post('http://localhost:3001/register', {
        username: userData.username,
        password: userData.password,
      });

      console.log(response.data);
      setRegistrationMessage(response.data);

      const newUserResponse = await axios.get(`http://localhost:3001/users/${userData.username}`);
      const newUser = newUserResponse.data;

      console.log('New User:', newUser);
      toast.success('Pendaftaran berhasil');
    } catch (error) {
      console.error('Error registering:', error);
      toast.error('Nama pengguna sudah ada !');
    }
  };

  const handleToggleRegister = () => {
    setShowRegister(!showRegister);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem('isLoggedIn');
  };

  const handleForgotPassword = async (email) => {
    try {
      const response = await axios.post('http://localhost:3001/api/forgot-password', {
        email,
      });

      toast.success('Password reset email sent successfully');
    } catch (error) {
      console.error('Error sending password reset email:', error);
      toast.error('Error sending password reset email');
    }
  };

  const handleResetPassword = async (resetToken, newPassword) => {
    try {
      const response = await axios.post('http://localhost:3001/api/reset-password', {
        resetToken,
        newPassword,
      });

      toast.success('Password reset successfully');
 
    } catch (error) {
      console.error('Error resetting password:', error);
      toast.error('Error resetting password');
    }
  };

  return (
    <div className="admin-cms">
      <h1>Admin CMS</h1>
      {!isLoggedIn ? (
        <div>
          {showRegister ? (
            <RegisterPage onRegister={handleRegister} onToggleRegister={handleToggleRegister} />
          ) : (
            <div>
              <h2>Login</h2>
              <LoginForm onLogin={handleLogin} error={setLoginError} />
              {loginError && toast.error(loginError)}
              <button onClick={handleToggleRegister}>Register</button>
              {/* <ForgotPasswordForm onForgotPassword={handleForgotPassword} /> */}
            </div>
          )}
          {registrationMessage && <p>{registrationMessage}</p>}
        </div>
      ) : (
        <div>
          <div className="sidebar">
            <button onClick={handleLogout}>Logout</button>
            <ul>
              <li onClick={() => handleMenuSelection('Dashboard')}>Dashboard</li>
              <li onClick={() => handleMenuSelection('NewFeature')}>New Feature</li>
            </ul>
          </div>
          <div className="main-content">
            <h2>Dashboard</h2>
            {selectedMenu === 'Dashboard' && (
              <div className="admin-cms">
                <h3>Upload Image</h3>
                <input type="file" onChange={handleImageUpload} />
                <div className="image-list">
                  {uploadedImages.map((image) => (
                    <div key={image.id} className="image-item">
                      <img src={image.url} alt={`Uploaded Image ${image.id}`} />
                      <button onClick={() => handleRemoveImage(image.id)}>Delete</button>
                    </div>
                  ))}
                </div>
                <h3>Testimonials</h3>
                <ul>
                  {testimonials.map((testimonial) => (
                    <li key={testimonial.id}>
                      {selectedTestimonial?.id === testimonial.id ? (
                        <div>
                          <textarea
                            type="text"
                            value={editedTestimonial}
                            onChange={(e) => setEditedTestimonial(e.target.value)}
                          />
                          <button onClick={handleTestimonialUpdate}>Update</button>
                          <button onClick={() => setSelectedTestimonial(null)}>Cancel</button>
                        </div>
                      ) : (
                        <div>
                          {testimonial.text}
                          <button onClick={() => handleTestimonialEdit(testimonial.id)}>Edit</button>
                          <button onClick={() => handleTestimonialDelete(testimonial.id)}>Delete</button>
                        </div>
                      )}
                    </li>
                  ))}
                </ul>
                <div>
                  <textarea
                    type="text"
                    placeholder="New Testimonial"
                    value={newTestimonial}
                    onChange={(e) => setNewTestimonial(e.target.value)}
                  />
                  <button onClick={handleTestimonialAdd}>Add Testimonial</button>
                </div>
                <ul>
                  {addedFeatures.map((feature) => (
                    <li key={feature.id}>{feature.text}</li>
                  ))}
                </ul>
              </div>
            )}
            {selectedMenu === 'NewFeature' && (
              <div className="admin-cms">
                <h1>New Feature</h1>
                <input
                  type="text"
                  placeholder="New Feature Input"
                  value={newFeatureInput}
                  onChange={(e) => setNewFeatureInput(e.target.value)}
                />
                <button onClick={handleNewFeatureAdd}>Add New Feature</button>
              </div>
            )}
          </div>
        </div>
      )}
      {/* <ResetPasswordForm onResetPassword={handleResetPassword} /> */}
    </div>
  );
};

export default AdminCMS;
