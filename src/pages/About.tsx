import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const AboutContainer = styled.section`
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

  @media (max-width: 768px) {
    padding: 60px 15px;
  }
`;

const ContentWrapper = styled(motion.div)`
  width: 90%;
  max-width: 1200px;
  display: flex;
  gap: 50px;
  align-items: center;
  justify-content: space-between;
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  padding: 40px;
  position: relative;
  z-index: 1;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 30px;
    padding: 25px;
    width: 95%;
  }

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(45deg, 
      rgba(255, 255, 255, 0.03) 0%,
      rgba(255, 255, 255, 0.05) 100%
    );
    border-radius: 20px;
    z-index: -1;
  }
`;

const Title = styled.h1`
  font-size: 3rem;
  color: #808080;
  margin-bottom: 30px;
  text-align: center;
  font-family: 'Fira Code', monospace;
  text-shadow: 0 0 10px rgba(128, 128, 128, 0.3);

  @media (max-width: 768px) {
    font-size: 2.2rem;
    margin-bottom: 20px;
  }
`;

const CodeNavigation = styled.div`
  font-family: 'Fira Code', monospace;
  color: #808080;
  font-size: 1.2rem;
  padding: 20px;
  background: rgba(0, 0, 0, 0.2);
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.1);

  @media (max-width: 768px) {
    font-size: 1rem;
    padding: 15px;
    width: 100%;
  }
`;

const Description = styled.div`
  color: rgba(255, 255, 255, 0.9);
  font-size: 1.2rem;
  line-height: 1.8;
  max-width: 600px;

  @media (max-width: 768px) {
    font-size: 1rem;
    line-height: 1.6;
    max-width: 100%;
  }

  p {
    margin-bottom: 15px;

    @media (max-width: 768px) {
      margin-bottom: 12px;
    }
  }
`;

const About: React.FC = () => {
  return (
    <AboutContainer id="about">
      <Title>&lt;About /&gt;</Title>
      <ContentWrapper
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <CodeNavigation>
          <div>src/</div>
          <div style={{ marginLeft: '20px' }}>components/</div>
          <div style={{ marginLeft: '40px' }}>../paragraph.tsx</div>
        </CodeNavigation>
        <Description>
          <p>
            A passionate full-stack developer turning coffee into code and ideas into sleek web apps.
            Expert in MERN, Python, and Node.js — clean code, elegant solutions, zero bugs* (*hopefully). 😄
          </p>
          <p>
            Armed with UI/UX superpowers, I craft intuitive interfaces that users love —
            all while keeping things fast, smooth, and scale-ready (cape not included). 😎
          </p>
          <p>
            Constantly chasing the latest tech (so you don’t have to),
            I’m committed to delivering results that wow clients — and maybe make their dev teams jealous. 😁
          </p>
        </Description>
      </ContentWrapper>
    </AboutContainer>
  );
};

export default About; 