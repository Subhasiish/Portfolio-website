import React, { useEffect } from 'react';
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
  color: white;

  @media (max-width: 768px) {
    padding: 80px 15px;
  }
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
  backdrop-filter: blur(5px);

  &:hover {
    background: rgba(255, 255, 255, 0.2);
    transform: translateX(-5px);
  }

  @media (max-width: 768px) {
    position: static;
    margin: 0 0 20px 0;
    width: 100%;
    max-width: 200px;
    align-self: flex-start;
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

  @media (max-width: 768px) {
    padding: 25px;
    margin-top: 20px;
    border-radius: 15px;
  }
`;

const ServiceTitle = styled(motion.h1)`
  font-size: 3rem;
  color: white;
  margin-bottom: 30px;
  display: flex;
  align-items: center;
  gap: 20px;

  @media (max-width: 768px) {
    font-size: 2rem;
    margin-bottom: 20px;
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
  }
`;

const ServiceIcon = styled(motion.span)`
  font-size: 3rem;

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const ServiceDescription = styled(motion.p)`
  color: rgba(255, 255, 255, 0.9);
  font-size: 1.2rem;
  line-height: 1.6;
  margin-bottom: 40px;

  @media (max-width: 768px) {
    font-size: 1rem;
    margin-bottom: 30px;
  }
`;

const FeaturesList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0 0 40px 0;

  @media (max-width: 768px) {
    margin-bottom: 30px;
  }
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

  @media (max-width: 768px) {
    font-size: 1rem;
    margin-bottom: 12px;
  }
`;

const TechStack = styled(motion.div)`
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
  margin-top: 30px;

  @media (max-width: 768px) {
    gap: 10px;
    margin-top: 20px;
  }
`;

const TechTag = styled(motion.span)`
  background: rgba(255, 255, 255, 0.1);
  color: white;
  padding: 8px 16px;
  border-radius: 20px;
  font-size: 0.9rem;
  backdrop-filter: blur(5px);

  @media (max-width: 768px) {
    font-size: 0.8rem;
    padding: 6px 12px;
  }
`;

// Fix typing for services object
const serviceDetails: Record<string, { title: string; icon: string; description: string; features: string[]; technologies: string[] }> = {
  'web-development': {
    title: 'Web Forge 🔥',
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
    title: 'Pixel Nest 🎨',
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
    title: 'App Nest 🐣📱',
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
    title: 'Cork Stack ⚙️',
    icon: '⚙️',
    description: 'I build robust, scalable, and secure backend systems with best practices in API design, database management, and server architecture. 🔐⚙️',
    features: [
      '🌐 RESTful API development',
      '🗂️ Database design and optimization',
      '🔐 Authentication and authorization',
      '🧱 Microservices architecture',
      '☁️ Cloud infrastructure setup',
      '📊 Performance monitoring',
    ],
    technologies: ['Node.js', 'Python', 'Java', 'PostgreSQL', 'MongoDB', 'AWS']
  },
  'digital-marketing': {
    title: 'Growth Engine 📈',
    icon: '📊',
    description: 'I drive business growth through strategic digital marketing campaigns, leveraging data-driven insights and cutting-edge marketing techniques. 🚀📊',
    features: [
      '🎯 Targeted advertising campaigns',
      '📱 Social media marketing',
      '📧 Email marketing automation',
      '🔍 SEO and content strategy',
      '📊 Analytics and reporting',
      '🎨 Brand development',
    ],
    technologies: ['Google Ads', 'Facebook Ads', 'Mailchimp', 'Google Analytics', 'SEMrush', 'HubSpot']
  },
  'website-management': {
    title: 'Site Guardian 🛡️',
    icon: '🛠️',
    description: 'I ensure your website runs at peak performance with regular maintenance, security updates, and continuous optimization. 🛠️✨',
    features: [
      '🛡️ Security monitoring and updates',
      '⚡ Performance optimization',
      '📊 Regular backups and recovery',
      '🔍 Content updates and management',
      '📱 Mobile responsiveness checks',
      '🔧 Technical support and troubleshooting',
    ],
    technologies: ['WordPress', 'Shopify', 'Wix', 'Squarespace', 'Google Analytics', 'Cloudflare']
  }
};

const ServiceDetails: React.FC = () => {
  const navigate = useNavigate();
  const { serviceId } = useParams<{ serviceId: string }>();
  const service = serviceDetails[serviceId as string];

  useEffect(() => {
    // Smooth scroll to top when component mounts
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }, [serviceId]);

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
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <BackButton
        onClick={handleBack}
        whileHover={{ x: -5 }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        ← Back to Services
      </BackButton>
      <ContentContainer
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.8, ease: "easeOut" }}
      >
        <ServiceTitle
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          <ServiceIcon
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.4, duration: 0.5, type: "spring", stiffness: 200 }}
          >
            {service.icon}
          </ServiceIcon>
          {service.title}
        </ServiceTitle>
        <ServiceDescription
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          {service.description}
        </ServiceDescription>
        <FeaturesList>
          {service.features.map((feature: string, index: number) => (
            <FeatureItem
              key={index}
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.6 + index * 0.1, duration: 0.5, ease: "easeOut" }}
            >
              {feature}
            </FeatureItem>
          ))}
        </FeaturesList>
        <TechStack
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.5 }}
        >
          {service.technologies.map((tech: string, index: number) => (
            <TechTag
              key={index}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.9 + index * 0.1, duration: 0.5, ease: "easeOut" }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
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
