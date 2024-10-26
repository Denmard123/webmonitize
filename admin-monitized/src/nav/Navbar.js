import React, { useState } from 'react';

const Navbar = ({ setActiveTab }) => {
  const [activeTab, setActiveTabState] = useState('Dashboard');

  const handleTabClick = (tabName) => {
    setActiveTabState(tabName); // Mengatur tab aktif lokal
    if (setActiveTab) {
      setActiveTab(tabName); // Mengirim tab yang di-klik ke komponen utama jika diperlukan
    }
  };

  return (
    <nav>
      <ul>
        <li className={activeTab === 'Dashboard' ? 'active' : ''} onClick={() => handleTabClick('Dashboard')}>Dashboard</li>
        <li className={activeTab === 'Sales' ? 'active' : ''} onClick={() => handleTabClick('Sales')}>Sales</li>
        <li className={activeTab === 'Testimonials' ? 'active' : ''} onClick={() => handleTabClick('Testimonials')}>Testimonials</li>
        <li className={activeTab === 'Gallery' ? 'active' : ''} onClick={() => handleTabClick('Gallery')}>Gallery</li>
      </ul>
    </nav>
  );
};

export default Navbar;
