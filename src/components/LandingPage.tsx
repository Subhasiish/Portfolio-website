import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import ReactTypingEffect from 'react-typing-effect';
import { useNavigate } from 'react-router-dom';

const LandingContainer = styled.section`
  min-height: 100vh;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 2rem 4rem;
  position: relative;
  overflow: hidden;
  background: transparent;
  
  @media (max-width: 768px) {
    flex-direction: column;
    padding: 1rem;
    justify-content: center;
    gap: 2rem;
  }
`;

const LeftContent = styled(motion.div)`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  background: transparent;
  
  @media (max-width: 768px) {
    align-items: center;
    text-align: center;
    order: 2;
  }
`;

const RightContent = styled(motion.div)`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  background: transparent;
  
  @media (max-width: 768px) {
    order: 1;
    // margin-top: 80px;
    margin-bottom: 1rem;
  }
`;

const Title = styled.h1`
  font-size: 3.5rem;
  margin-bottom: 1rem;
  
  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

const Subtitle = styled.div`
  font-size: 2rem;
  color: rgba(255, 255, 255, 0.8);
  margin-bottom: 2rem;
  
  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
`;

const HireButton = styled(motion.button)`
  padding: 1rem 2rem;
  font-size: 1.2rem;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 30px;
  color: white;
  cursor: pointer;
  width: fit-content;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.2);
    box-shadow: 0 0 20px rgba(255, 255, 255, 0.3);
  }
  
  @media (max-width: 768px) {
    padding: 0.8rem 1.6rem;
    font-size: 1rem;
  }
`;

const PhotoContainer = styled(motion.div)`
  width: 300px;
  height: 300px;
  border-radius: 50%;
  position: relative;
  overflow: hidden;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.3);
  border: 1px solid rgba(255, 255, 255, 0.1);
  
  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: rgba(0, 0, 0, 0.2);
    z-index: 1;
    mix-blend-mode: multiply;
  }
  
  &::after {
    content: '';
    position: absolute;
    inset: 0;
    background: 
      linear-gradient(45deg, transparent 40%, rgba(255, 255, 255, 0.1) 45%, transparent 50%),
      linear-gradient(-45deg, transparent 40%, rgba(255, 255, 255, 0.1) 45%, transparent 50%);
    background-size: 10px 10px;
    z-index: 2;
    mix-blend-mode: overlay;
    opacity: 0.7;
  }
  
  @media (max-width: 768px) {
    width: 220px;
    height: 220px;
  }
`;

const Photo = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  loading: lazy;
`;

const SketchContainer = styled(motion.div)`
  position: absolute;
  top: 35%;
  left: 40%;
  transform: translate(-50%, -50%);
  width: 320px;
  height: 320px;
  border-radius: 50%;
  border: 2px solid rgba(255, 255, 255, 0.2);
  pointer-events: none;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: 
      radial-gradient(circle at 50% 50%, transparent 30%, rgba(255, 255, 255, 0.05) 31%, rgba(255, 255, 255, 0.05) 32%, transparent 33%),
      radial-gradient(circle at 50% 50%, transparent 30%, rgba(255, 255, 255, 0.05) 31%, rgba(255, 255, 255, 0.05) 32%, transparent 33%);
    background-size: 40px 40px;
    background-position: 0 0, 20px 20px;
    opacity: 0.7;
  }
  
  &::after {
    content: '';
    position: absolute;
    inset: -2px;
    border-radius: 50%;
    border: 1px dashed rgba(255, 255, 255, 0.1);
    animation: rotate 20s linear infinite;
  }
  
  @keyframes rotate {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
  
  @media (max-width: 768px) {
    width: 240px;
    height: 240px;
  }
`;

// Mobile-specific elements
const MobileFloatingElements = styled.div`
  display: none;
  
  @media (max-width: 768px) {
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    z-index: 0;
  }
`;

const FloatingElement = styled(motion.div)<{ $top: number; $left: number; $size: number; $delay: number }>`
  position: absolute;
  top: ${props => props.$top}%;
  left: ${props => props.$left}%;
  width: ${props => props.$size}px;
  height: ${props => props.$size}px;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 50%;
  backdrop-filter: blur(2px);
  border: 1px solid rgba(255, 255, 255, 0.1);
`;

const MobileScrollIndicator = styled(motion.div)`
  display: none;
  
  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
    align-items: center;
    position: absolute;
    bottom: 20px;
    left: 50%;
    transform: translateX(-50%);
    color: rgba(255, 255, 255, 0.6);
    font-size: 0.8rem;
    gap: 5px;
  }
`;

const ScrollDot = styled(motion.div)`
  width: 8px;
  height: 8px;
  background: rgba(255, 255, 255, 0.6);
  border-radius: 50%;
`;

const LandingPage: React.FC = () => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const [isMobile, setIsMobile] = useState(false);
  const [floatingElements, setFloatingElements] = useState<Array<{ top: number; left: number; size: number; delay: number }>>([]);
  const navigate = useNavigate();
  const [imageError, setImageError] = useState(false);

  const springConfig = { damping: 25, stiffness: 700 };
  const x = useSpring(mouseX, springConfig);
  const y = useSpring(mouseY, springConfig);

  const rotateX = useTransform(y, [-300, 300], [15, -15]);
  const rotateY = useTransform(x, [-300, 300], [-15, 15]);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    // Generate floating elements for mobile
    const elements = Array.from({ length: 10 }, () => ({
      top: Math.random() * 100,
      left: Math.random() * 100,
      size: Math.random() * 30 + 10,
      delay: Math.random() * 2
    }));
    
    setFloatingElements(elements);
    
    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (isMobile) return;
    
    const rect = event.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    mouseX.set(event.clientX - centerX);
    mouseY.set(event.clientY - centerY);
  };

  const handleMouseLeave = () => {
    if (isMobile) return;
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <LandingContainer id="home">
      <MobileFloatingElements>
        {floatingElements.map((element, index) => (
          <FloatingElement
            key={index}
            $top={element.top}
            $left={element.left}
            $size={element.size}
            $delay={element.delay}
            animate={{
              y: [0, -20, 0],
              opacity: [0.3, 0.6, 0.3],
              scale: [1, 1.1, 1]
            }}
            transition={{
              duration: 3 + element.delay,
              repeat: Infinity,
              delay: element.delay
            }}
          />
        ))}
      </MobileFloatingElements>
      
      <LeftContent
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
      >
        <Title>Hello, I'm Subhasish</Title>
        <Subtitle>
          <ReactTypingEffect
            text={['A Web Developer', 'A Designer', 'A Creator', 'An Engineer']}
            speed={100}
            eraseDelay={700}
          />
        </Subtitle>
        <HireButton
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate('/hire-me')}
        >
          Hire Me
        </HireButton>
      </LeftContent>

      <RightContent
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        <SketchContainer
          style={{
            rotateX,
            rotateY,
            transformStyle: 'preserve-3d',
          }}
        />
        <PhotoContainer
          style={{
            rotateX,
            rotateY,
            transformStyle: 'preserve-3d',
          }}
        >
          <Photo 
            src={!imageError ? "/img/Profile-photo.jpeg" : "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"}
            alt="Subhasish - Web Developer"
            onError={() => setImageError(true)}
            loading="lazy"
          />
        </PhotoContainer>
      </RightContent>
      
      <MobileScrollIndicator
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
      >
        <ScrollDot
          animate={{
            y: [0, 10, 0],
            opacity: [0.6, 1, 0.6]
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <span>Scroll</span>
      </MobileScrollIndicator>
    </LandingContainer>
  );
};

export default LandingPage;