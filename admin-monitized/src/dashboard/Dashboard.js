import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../nav/Navbar'; // Komponen Navbar
import SalesSummary from '../sales/SalesSummary'; // Komponen SalesSummary
import Testimonials from '../testimonials/Testimonials'; // Komponen Testimonials
import Gallery from '../galeri/Gallery'; // Komponen Gallery
import './Dashboard.css'; // File CSS untuk styling

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('Dashboard'); // State untuk tab aktif
  const [salesData, setSalesData] = useState([]);
  const [testimonialsData, setTestimonialsData] = useState([]);
  const [galleryData, setGalleryData] = useState([]);

  // Fetch data dari backend saat komponen dimount
  useEffect(() => {
    // Panggil API untuk masing-masing bagian
    axios.get('http://localhost:3001/sales')
      .then(response => {
        setSalesData(response.data);
      })
      .catch(error => {
        console.error('Error fetching sales data: ', error);
      });

    axios.get('http://localhost:3001/testimonials')
      .then(response => {
        setTestimonialsData(response.data);
      })
      .catch(error => {
        console.error('Error fetching testimonials data: ', error);
      });

    axios.get('http://localhost:3001/gallery')
      .then(response => {
        setGalleryData(response.data);
      })
      .catch(error => {
        console.error('Error fetching gallery data: ', error);
      });
  }, []);

  // Konten yang akan ditampilkan berdasarkan tab yang aktif
  let content;
  switch (activeTab) {
    case 'Dashboard':
      content = (
        <div>
          <h2>Dashboard Content</h2>
          <p>Welcome to the Dashboard!</p>
        </div>
      );
      break;
    case 'Sales':
      content = (
        <div>
          <h2>Sales Summary</h2>
          {/* Menampilkan data penjualan */}
          <SalesSummary data={salesData} />
        </div>
      );
      break;
    case 'Testimonials':
      content = (
        <div>
          <h2>Testimonials</h2>
          {/* Menampilkan data testimonial */}
          <Testimonials data={testimonialsData} />
        </div>
      );
      break;
    case 'Gallery':
      content = (
        <div>
          <h2>Gallery</h2>
          {/* Menampilkan data galeri */}
          <Gallery data={galleryData} />
        </div>
      );
      break;
    default:
      content = (
        <div>
          <h2>Dashboard Content</h2>
          <p>Welcome to the Dashboard!</p>
        </div>
      );
  }

  return (
    <div className="dashboard">
      <section className="sidebar">
        <Navbar setActiveTab={setActiveTab} />
      </section>
      <section className="main-content">
        {content}
      </section>
    </div>
  );
};

export default Dashboard;
