import React from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import AdminCMS from './AdminCMS/AdminCMS'; 
import Dashboard from './dashboard/Dashboard';

function App() {
  return (
    <div className="App">
      <Dashboard />
      <ToastContainer />
    </div>
  );
}

export default App;
