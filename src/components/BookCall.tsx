import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
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
  
  &::after {
    content: '';
    position: absolute;
    inset: 0;
    background: radial-gradient(circle at 50% 50%, rgba(255, 255, 255, 0.1) 0%, transparent 70%);
    opacity: 0;
    transition: opacity 0.5s ease;
  }

  &:hover::after {
    opacity: 1;
  }
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

const orbit = keyframes`
  from {
    transform: rotate(0deg) translateX(40px) rotate(0deg);
  }
  to {
    transform: rotate(360deg) translateX(40px) rotate(-360deg);
  }
`;

const pulse = keyframes`
  0% {
    box-shadow: 0 0 0 0 rgba(255, 255, 255, 0.4);
  }
  70% {
    box-shadow: 0 0 0 10px rgba(255, 255, 255, 0);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(255, 255, 255, 0);
  }
`;

const AnimationContainer = styled.div`
  width: 100%;
  max-width: 600px;
  height: 150px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
  position: relative;
`;

const CenterOrb = styled.div`
  width: 16px;
  height: 16px;
  background: #fff;
  border-radius: 50%;
  position: relative;
  animation: ${pulse} 2s infinite;
  
  &::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 40px;
    height: 40px;
    border: 1px solid rgba(255, 255, 255, 0.2);
    border-radius: 50%;
    transform: translate(-50%, -50%);
  }
`;

const OrbitRing = styled.div<{ $delay: number; $size: number; $direction: 'normal' | 'reverse' }>`
  position: absolute;
  width: ${props => props.$size}px;
  height: ${props => props.$size}px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 50%;
  animation: ${orbit} ${props => 8 + props.$delay}s ${props => props.$direction} infinite linear;
  
  &::before {
    content: '';
    position: absolute;
    width: 6px;
    height: 6px;
    background: ${props => {
      const colors = ['#64ffda', '#a8b2ff', '#ff7eb6'];
      return colors[props.$delay % colors.length];
    }};
    border-radius: 50%;
    top: -3px;
    left: calc(50% - 3px);
    box-shadow: 0 0 10px rgba(255, 255, 255, 0.3);
  }
`;

const BookCall: React.FC = () => {
  const navigate = useNavigate();
  const orbits = [
    { size: 80, delay: 0, direction: 'normal' as const },
    { size: 120, delay: 1, direction: 'reverse' as const },
    { size: 160, delay: 2, direction: 'normal' as const },
  ];

  return (
    <BookCallContainer id="book-call">
      <ContentWrapper>
        <Title>Let's create something amazing  <br/>      
           where imagination meets execution.</Title>
        <Description>
          Ready to turn your ideas into reality? Let's team up and make magic happen — no wizard hat required. 🧠✨
        </Description>
        
        <ButtonContainer>
          <BookButton onClick={() => navigate('/book-call')}>
            Book a Meeting
          </BookButton>
        </ButtonContainer>
        <GmailText>Drop a mail :[" subhasishgarnayak2@gmail.com "]</GmailText>

        <AnimationContainer>
          <CenterOrb />
          {orbits.map((orbit, index) => (
            <OrbitRing
              key={index}
              $size={orbit.size}
              $delay={orbit.delay}
              $direction={orbit.direction}
            />
          ))}
        </AnimationContainer>
      </ContentWrapper>
    </BookCallContainer>
  );
};

export default BookCall;