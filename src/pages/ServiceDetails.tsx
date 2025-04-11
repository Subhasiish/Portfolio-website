import React from 'react';
import { useLocation } from 'react-router-dom';

const ServiceDetails: React.FC = () => {
  const location = useLocation();
  const service = location.state;

  if (!service) {
    return <p>No service details available.</p>;
  }

  return (
    <div style={{ padding: '20px' }}>
      <h1>{service.title}</h1>
      <img src={service.image} alt={service.title} style={{ width: '100%', maxHeight: '400px', objectFit: 'cover' }} />
      <p>{service.description}</p>
    </div>
  );
};

export default ServiceDetails;
