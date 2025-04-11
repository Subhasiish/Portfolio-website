import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const ServiceDetailContainer = styled.section`
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
`;

const BackButton = styled(motion.button)`
  position: absolute;
  top: 40px;
  left: 40px;
  padding: 12px 24px;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 30px;
  color: white;
  cursor: pointer;
  font-size: 1rem;
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.2);
    transform: translateY(-2px);
  }
`;

const ContentContainer = styled(motion.div)`
  width: 90%;
  max-width: 1200px;
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  padding: 40px;
  margin-top: 40px;
  position: relative;
  z-index: 1;

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
  color: white;
  margin-bottom: 30px;
  text-align: center;
  text-shadow: 0 0 10px rgba(255, 255, 255, 0.3);
`;

const Description = styled.p`
  font-size: 1.2rem;
  color: rgba(255, 255, 255, 0.9);
  line-height: 1.6;
  margin-bottom: 40px;
  text-align: center;
`;

const FeaturesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 30px;
  margin-top: 40px;
`;

const FeatureCard = styled(motion.div)`
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 15px;
  padding: 25px;
  backdrop-filter: blur(5px);
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    background: rgba(255, 255, 255, 0.08);
  }
`;

const FeatureTitle = styled.h3`
  font-size: 1.5rem;
  color: white;
  margin-bottom: 15px;
  display: flex;
  align-items: center;
  gap: 10px;
`;

const FeatureDescription = styled.p`
  color: rgba(255, 255, 255, 0.8);
  line-height: 1.5;
`;

const TechStack = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
  margin-top: 40px;
  justify-content: center;
`;

const TechTag = styled(motion.span)`
  background: rgba(255, 255, 255, 0.1);
  color: white;
  padding: 8px 16px;
  border-radius: 20px;
  font-size: 0.9rem;
  backdrop-filter: blur(5px);
  border: 1px solid rgba(255, 255, 255, 0.1);
`;

const WebDevelopment: React.FC = () => {
  const navigate = useNavigate();

  const features = [
    {
      title: 'Responsive Design',
      description: 'Create websites that look and work perfectly on all devices and screen sizes.',
      icon: '📱'
    },
    {
      title: 'Modern Technologies',
      description: 'Utilize the latest web technologies and frameworks for optimal performance.',
      icon: '⚡'
    },
    {
      title: 'SEO Optimization',
      description: 'Implement best practices for search engine optimization and visibility.',
      icon: '🔍'
    },
    {
      title: 'Performance Focus',
      description: 'Ensure fast loading times and smooth user experiences.',
      icon: '🚀'
    }
  ];

  const technologies = [
    'React', 'TypeScript', 'Node.js', 'Express', 'MongoDB', 
    'PostgreSQL', 'GraphQL', 'AWS', 'Docker', 'Next.js'
  ];

  return (
    <ServiceDetailContainer>
      <BackButton
        onClick={() => navigate(-1)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        ← Back
      </BackButton>
      
      <ContentContainer
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Title>Web Development</Title>
        <Description>
          I specialize in creating modern, responsive, and high-performance web applications
          using cutting-edge technologies and best practices. From simple websites to complex
          web applications, I deliver solutions that meet your needs and exceed expectations.
        </Description>

        <FeaturesGrid>
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
            >
              <FeatureTitle>
                <span>{feature.icon}</span>
                {feature.title}
              </FeatureTitle>
              <FeatureDescription>{feature.description}</FeatureDescription>
            </FeatureCard>
          ))}
        </FeaturesGrid>

        <TechStack>
          {technologies.map((tech, index) => (
            <TechTag
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              whileHover={{ scale: 1.1 }}
            >
              {tech}
            </TechTag>
          ))}
        </TechStack>
      </ContentContainer>
    </ServiceDetailContainer>
  );
};

export default WebDevelopment; 