import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import BookCallDetails from './BookCallDetails';

const BookCallContainer = styled.section`
  min-height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 100px 20px;
  position: relative;
  overflow: hidden;
  background: transparent;
  scroll-margin-top: 60px;
`;

const ContentWrapper = styled.div`
  width: 90%;
  max-width: 1200px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 40px;
  position: relative;
  z-index: 1;
`;

const Title = styled.h2`
  font-size: 2.5rem;
  color: white;
  text-align: center;
  margin-bottom: 20px;
  text-shadow: 0 0 10px rgba(255, 255, 255, 0.3);
`;

const Description = styled.p`
  font-size: 1.2rem;
  color: rgba(255, 255, 255, 0.9);
  text-align: center;
  max-width: 600px;
  line-height: 1.6;
  margin-bottom: 40px;
`;

const ButtonContainer = styled.div`
  position: relative;
  width: 100%;
  max-width: 500px;
  height: 100px;
  border: 2px solid rgba(255, 255, 255, 0.2);
  border-radius: 50px;
  overflow: hidden;
  margin: 20px 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const BookButton = styled.button`
  width: 100%;
  height: 100%;
  background: rgba(255, 255, 255, 0.1);
  border: none;
  border-radius: 50px;
  color: white;
  font-size: 1.5rem;
  font-weight: bold;
  cursor: pointer;
  backdrop-filter: blur(5px);
  transition: all 0.3s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.2);
  }
`;

const GmailText = styled.p`
  font-size: 1rem;
  color: rgba(255, 255, 255, 0.7);
  text-align: center;
  margin-top: 5px;
`;

const AnimationContainer = styled.div`
  width: 100%;
  max-width: 600px;
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  margin-top: 20px;
`;

const AnimatedDot = styled(motion.div)`
  width: 12px;
  height: 12px;
  background: rgba(255, 255, 255, 0.3);
  border-radius: 50%;
`;

const BookCall: React.FC = () => {
  const navigate = useNavigate();
  const dots = Array.from({ length: 5 }, (_, i) => i);

  return (
    <BookCallContainer id="book-call">
      <ContentWrapper>
        <Title>Let’s create something amazing  <br/>      
           where imagination meets execution.</Title>
        <Description>
        Ready to turn your ideas into reality? Let’s team up and make magic happen — no wizard hat required. 🧠✨
        </Description>
        
        <ButtonContainer>
          <BookButton onClick={() => navigate('/book-call-details')}>
            Book a Meeting
          </BookButton>
        </ButtonContainer>
        <GmailText> Drop a mail :[" subhasishgarnayak2@gmail.com "] </GmailText>

        <AnimationContainer>
          {dots.map((_, index) => (
            <AnimatedDot
              key={index}
              animate={{
                y: ['0%', '-50%', '0%'],
                opacity: [0.3, 0.8, 0.3],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                delay: index * 0.2,
                ease: "easeInOut"
              }}
            />
          ))}
        </AnimationContainer>
      </ContentWrapper>
    </BookCallContainer>
  );
};

export default BookCall;