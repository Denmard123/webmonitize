import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Gallery = () => {
  const [galleryData, setGalleryData] = useState([]);
  const [imageSrc, setImageSrc] = useState(null);

  useEffect(() => {
    fetchGalleryData();
  }, []);

  const fetchGalleryData = () => {
    axios.get('http://localhost:3001/gallery')
      .then(response => {
        setGalleryData(response.data.galleryData);
      })
      .catch(error => {
        console.error('Error fetching gallery data:', error);
      });
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    setImageSrc(file);
  };

  const handleAddImage = () => {
    if (!imageSrc) return;

    const formData = new FormData();
    formData.append('image', imageSrc);

    axios.post('http://localhost:3001/gallery', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      },
    })
    .then(() => {
      fetchGalleryData();
      setImageSrc(null);
    })
    .catch(error => {
      console.error('Error adding image:', error);
    });
  };

  const handleDeleteImage = (id) => {
    axios.delete(`http://localhost:3001/delete_gallery_image/${id}`)
      .then(() => {
        fetchGalleryData();
      })
      .catch(error => {
        console.error('Error deleting image:', error);
      });
  };

  return (
    <div>
      <input type="file" onChange={handleFileUpload} />
      <button onClick={handleAddImage}>Add Image</button>

      <div>
        {galleryData.map(image => (
          <div key={image.id}>
            <div className='I'>
            <img src={`http://localhost:3001/uploads/${image.image_path}`} alt={image.image_path} />
            <button onClick={() => handleDeleteImage(image.id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Gallery;
