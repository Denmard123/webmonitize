import React from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AdminCMS from './AdminCMS/AdminCMS'; 

function App() {
  return (
    <div className="App">
      <AdminCMS />
      <ToastContainer />
    </div>
  );
}

export default App;
