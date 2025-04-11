import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const BookCallDetailsContainer = styled(motion.div)`
  min-height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 100px 20px;
  position: relative;
  background: transparent; /* Updated to match HireMeDetails */
  color: white; /* Ensure text is visible on dark background */
`;

const BackButton = styled(motion.button)`
  position: absolute;
  top: 50px;
  left: 50px;
  padding: 10px 20px;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 25px;
  color: white;
  cursor: pointer;
  font-size: 1rem;
  transition: all 0.3s ease;
  margin: 10px;

  &:hover {
    background: rgba(255, 255, 255, 0.2);
    transform: translateX(-5px);
  }

  @media (max-width: 768px) {
    position: static;
    margin-top: 20px;
  }
`;

const ContentContainer = styled(motion.div)`
  max-width: 1200px;
  width: 100%;
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  border: 2px solid rgba(255, 255, 255, 0.2);
  border-radius: 20px;
  padding: 40px;
  margin-top: 50px;
`;

const BookCallTitle = styled.h1`
  font-size: 3rem;
  color: white;
  margin-bottom: 30px;
  display: flex;
  align-items: center;
  gap: 20px;
`;

const BookCallDescription = styled.p`
  color: rgba(255, 255, 255, 0.9);
  font-size: 1.2rem;
  line-height: 1.6;
  margin-bottom: 40px;
`;

const FeaturesList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0 0 40px 0;
`;

const FeatureItem = styled(motion.li)`
  color: white;
  font-size: 1.1rem;
  margin-bottom: 15px;
  padding-left: 30px;
  position: relative;

  &:before {
    content: '→';
    position: absolute;
    left: 0;
    color: rgba(255, 255, 255, 0.6);
  }
`;

const BookCallDetails: React.FC = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate('/'); // Navigate back to the home page
  };

  const features = [
    '✅ One-on-one consultation',

    '💡 Project brainstorming',

    '🧠 Expert advice and guidance',

    '🕒 Flexible scheduling',

    '🎯 Tailored solutions for your needs',

    '🔄 Follow-up support'
  ];

  return (
    <BookCallDetailsContainer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <BackButton onClick={handleBack} whileHover={{ x: -5 }} whileTap={{ scale: 0.95 }}>
        ← Back to Home
      </BackButton>
      <ContentContainer
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        <BookCallTitle>Book a Call</BookCallTitle>
        <BookCallDescription>
          Schedule a call to share your ideas — let’s explore how we can achieve your goals together.
        </BookCallDescription>
        <FeaturesList>
          {features.map((feature, index) => (
            <FeatureItem
              key={index}
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.3 + index * 0.1 }}
            >
              {feature}
            </FeatureItem>
          ))}
        </FeaturesList>
      </ContentContainer>
    </BookCallDetailsContainer>
  );
};

export default BookCallDetails;
