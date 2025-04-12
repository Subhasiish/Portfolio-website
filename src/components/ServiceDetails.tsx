import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useNavigate, useLocation, useParams } from 'react-router-dom';

const ServiceDetailsContainer = styled(motion.div)`
  min-height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 100px 20px;
  position: relative;
  background: transparent;

  
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
  margin-top: 20px; // Add margin-top for spacing

  &:hover {
    background: rgba(255, 255, 255, 0.2);
    transform: translateX(-5px);
  }

  @media (max-width: 768px) {
    position: static; // Change position for mobile view
    margin-top: 20px; // Add margin-top for spacing
    cursor: none; // Hide cursor on mobile phones
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

const ServiceTitle = styled.h1`
  font-size: 3rem;
  color: white;
  margin-bottom: 30px;
  display: flex;
  align-items: center;
  gap: 20px;
`;

const ServiceIcon = styled.span`
  font-size: 3rem;

  @media (max-width: 768px) {
    font-size: 2rem; // Adjust icon size for mobile view
    display : none;
  }
`;

const ServiceDescription = styled.p`
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

const TechStack = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
  margin-top: 30px;
`;

const TechTag = styled(motion.span)`
  background: rgba(255, 255, 255, 0.1);
  color: white;
  padding: 8px 16px;
  border-radius: 20px;
  font-size: 0.9rem;
  backdrop-filter: blur(5px);
`;

// Fix typing for services object
const serviceDetails: Record<string, { title: string; icon: string; description: string; features: string[]; technologies: string[] }> = {
  'web-development': {
    title: 'Web Development',
    icon: '💻',
    description: 'I craft modern, responsive web applications that deliver exceptional user experiences, with top-tier performance and security built in. 🚀',
    features: [
      '🛠️ Custom web application development',

      '📱 Responsive design implementation',

      '⚡ Performance optimization',

      '🔍 SEO-friendly architecture',

      '🌐 Cross-browser compatibility',

      '🔐 Security best practices'
    ],
    technologies: ['React', 'TypeScript', 'Node.js', 'MongoDB', 'Express', 'Next.js']
  },
  'ui-ux-design': {
    title: 'UI/UX Design',
    icon: '🎨',
    description: 'I design intuitive, engaging user interfaces that blend aesthetics with functionality — creating seamless experiences that captivate users and boost engagement. 🎨✨',
    features: [
      '🎨 User interface design',

      '🚀 User experience optimization',

      '📝 Wireframing and prototyping',

      '🧩 Design systems creation',

      '🖱️ Interactive prototypes',

      '🔍 Usability testing',
    ],
    technologies: ['Figma', 'Adobe XD', 'Sketch', 'InVision', 'Principle', 'Adobe Creative Suite']
  },
  'mobile-development': {
    title: 'Mobile Development',
    icon: '📱',
    description: 'I build cross-platform mobile apps that feel native, run smoothly, and scale effortlessly — all from a single, maintainable codebase. 📱🚀',
    features: [
      '🔧 Cross-platform development',

      '⚡ Native performance optimization',

      '📴 Offline functionality',

      '🔔 Push notifications',

      '🛍️ App store optimization',

      '🔄 Regular updates and maintenance',
    ],
    technologies: ['React Native', 'TypeScript', 'Redux', 'Firebase', 'Node.js', 'MongoDB']
  },
  'backend-development': {
    title: 'Backend Development',
    icon: '⚙️',
    description: 'I build robust, scalable, and secure backend systems with best practices in API design, database management, and server architecture. 🔐⚙️',
    features: [
      ' 🌐 RESTful API development',

      '🗂️ Database design and optimization',

      '🔐 Authentication and authorization',

      '🧱 Microservices architecture',

      '☁️ Cloud infrastructure setup',

      '📊 Performance monitoring',
    ],
    technologies: ['Node.js', 'Python', 'Java', 'PostgreSQL', 'MongoDB', 'AWS']
  }
};

const ServiceDetails: React.FC = () => {
  const navigate = useNavigate();
  const { serviceId } = useParams<{ serviceId: string }>();
  const service = serviceDetails[serviceId as string];

  const handleBack = () => {
    // First set the scroll target
    sessionStorage.setItem('scrollTarget', 'services');
    // Then navigate with a small delay to ensure storage is set
    setTimeout(() => {
      navigate('/');
    }, 50);
  };

  if (!service) {
    return (
      <ServiceDetailsContainer>
        <BackButton onClick={handleBack}>← Back to Services</BackButton>
        <ContentContainer>
          <ServiceTitle>Service Not Found</ServiceTitle>
          <ServiceDescription>The requested service could not be found.</ServiceDescription>
        </ContentContainer>
      </ServiceDetailsContainer>
    );
  }

  return (
    <ServiceDetailsContainer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <BackButton
        onClick={handleBack}
        whileHover={{ x: -5 }}
        whileTap={{ scale: 0.95 }}
      >
        ← Back to Services
      </BackButton>
      <ContentContainer
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        <ServiceTitle>
          <ServiceIcon>{service.icon}</ServiceIcon>
          {service.title}
        </ServiceTitle>
        <ServiceDescription>{service.description}</ServiceDescription>
        <FeaturesList>
          {service.features.map((feature: string, index: number) => (
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
        <TechStack>
          {service.technologies.map((tech: string, index: number) => (
            <TechTag
              key={index}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.5 + index * 0.1 }}
              whileHover={{ scale: 1.1 }}
            >
              {tech}
            </TechTag>
          ))}
        </TechStack>
      </ContentContainer>
    </ServiceDetailsContainer>
  );
};

export default ServiceDetails;