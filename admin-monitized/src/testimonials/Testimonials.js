import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TestimonialsManagement = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [testimoni, setTestimoni] = useState('');
  const [imageSrc, setImageSrc] = useState(null);

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const fetchTestimonials = () => {
    axios.get('http://localhost:3001/testimonials')
      .then(response => {
        setTestimonials(response.data);
      })
      .catch(error => {
        console.error('Error fetching testimonials: ', error);
      });
  };

  const handleAddTestimonials = () => {
    if (!testimoni || !imageSrc) return;

    const formData = new FormData();
    formData.append('text', testimoni);
    formData.append('image', imageSrc);

    axios.post('http://localhost:3001/testimonials', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
      .then(() => {
        fetchTestimonials();
        setTestimoni('');
        setImageSrc(null);
      })
      .catch(error => {
        console.error('Error adding testimonial: ', error);
      });
  };

  const handleDeleteTestimonials = (id) => {
    axios.delete(`http://localhost:3001/testimonials/${id}`)
      .then(() => {
        fetchTestimonials();
      })
      .catch(error => {
        console.error('Error deleting testimonial: ', error);
      });
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    setImageSrc(file);
  };

  return (
    <div>
      <div>
        <input
          type="text"
          placeholder="Testimoni"
          value={testimoni}
          onChange={(e) => setTestimoni(e.target.value)}
        />
        <input
          type="file"
          onChange={(e) => handleFileUpload(e)}
        />
        <button onClick={handleAddTestimonials}>Add Testimoni</button>
      </div>
      <ul>
  {Array.isArray(testimonials) && testimonials.map((testimonial) => (
    <li key={testimonial.id}>
      <div className="I">
        <img src={`http://localhost:3001/uploads/${testimonial.image_path}`} alt="Testimonial" />
        <p>{testimonial.text}</p>
        <button onClick={() => handleDeleteTestimonials(testimonial.id)}>Delete</button>
      </div>
    </li>
  ))}
</ul>
    </div>
  );
};

export default TestimonialsManagement;
