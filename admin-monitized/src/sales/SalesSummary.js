import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ProductManagement = () => {
  const [products, setProducts] = useState([]);
  const [productName, setProductName] = useState('');
  const [price, setPrice] = useState('');
  const [message, setMessage] = useState('');

  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://localhost:3001/sales');
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleAddProduct = async () => {
    if (!productName || !price) return;
  
    try {
      const response = await axios.post('http://localhost:3001/sales', { Years_of_experience: productName, penjualan: price });
  
      if (response.status === 201) {
        setMessage('Product added successfully');
        setProductName('');
        setPrice('');
        fetchProducts(); // Update the products after adding a new one
      } else {
        throw new Error('Failed to add product to server');
      }
    } catch (error) {
      console.error('Error adding product to server:', error);
      setMessage('Failed to add product');
    }
  };
  
  const handleDeleteProduct = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/sales/${id}`);
      setMessage('Product deleted successfully');
      fetchProducts(); // Update the products after deleting one
    } catch (error) {
      console.error('Error deleting product:', error);
      setMessage('Failed to delete product');
    }
  };
  
  const handleUpdateProduct = async (id) => {
    try {
      const response = await axios.get(`http://localhost:3001/sales/${id}`);
    
      if (response.status === 200) {
        const updatedProduct = response.data;
  
        const updatedProducts = products.map(product => {
          if (product.id === updatedProduct.id) {
            return updatedProduct;
          }
          return product;
        });
  
        setProducts(updatedProducts);
        setMessage('Data updated successfully');
  
        // Simpan data yang diperbarui ke localStorage
        localStorage.setItem('updatedProduct', JSON.stringify(updatedProduct));
      } else {
        throw new Error('Failed to fetch latest data');
      }
    } catch (error) {
      console.error('Error updating data:', error);
      setMessage('Failed to update data');
    }
  };
  
  

  return (
    <div>
      <div>
        <input
          type="text"
          placeholder="Penjualan"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        <input
          type="text"
          placeholder="Years of experience"
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
        />
        <button onClick={handleAddProduct}>Tambahkan</button>
      </div>
      <ul>
        {Array.isArray(products) &&
          products.map((product) => (
            <li key={product.id}>
              Rp.{product.penjualan} - {product.Years_of_experience} Tahun
              <button onClick={() => handleDeleteProduct(product.id)}>Delete</button>
              <button onClick={handleUpdateProduct}>Update</button>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default ProductManagement;
