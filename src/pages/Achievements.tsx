import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const AchievementsContainer = styled.section`
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

const Title = styled.h1`
  font-size: 3rem;
  color: #a0a0a0;
  margin-bottom: 50px;
  text-align: center;
  font family:'JetBrains Mono', 'Fira Code', 'Consolas', monospace;
  text-shadow: 0 0 10px rgba(255, 255, 255, 0.3);
`;

const CardsContainer = styled.div`
  display: flex;
  gap: 30px;
  flex-wrap: wrap;
  justify-content: center;
  max-width: 1200px;
  width: 100%;
`;

const MetricCard = styled(motion.div)`
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  padding: 40px;
  width: 300px;
  text-align: center;
  position: relative;
  overflow: hidden;

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

const MetricNumber = styled.h2`
  font-size: 3.5rem;
  color: white;
  margin-bottom: 15px;
  text-shadow: 0 0 10px rgba(255, 255, 255, 0.3);
`;

const MetricTitle = styled.h3`
  font-size: 1.2rem;
  color: rgba(255, 255, 255, 0.9);
  margin: 0;
`;

const Achievements: React.FC = () => {
  const metrics = [
    {
      number: '30+',
      title: 'Websites Designed'
    },
    {
      number: '537+',
      title: 'Hours Saved'
    },
    {
      number: '100%',
      title: 'Client Satisfaction'
    }
  ];

  return (
    <AchievementsContainer id="achievements">
      <Title>&lt;Secured/&gt;</Title>
      <CardsContainer>
        {metrics.map((metric, index) => (
          <MetricCard
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
            whileHover={{ 
              scale: 1.05,
              y: -10,
              transition: { duration: 0.2 }
            }}
          >
            <MetricNumber>{metric.number}</MetricNumber>
            <MetricTitle>{metric.title}</MetricTitle>
          </MetricCard>
        ))}
      </CardsContainer>
    </AchievementsContainer>
  );
};

export default Achievements; 
