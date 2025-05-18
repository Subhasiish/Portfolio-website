import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { motion, useAnimation, useInView } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

// Service data
const servicesData = [
  {
    id: 1,
    title: 'Web Development',
    description: 'Crafting custom web applications that are fast, scalable, and built for the future. 🚀',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
    icon: '💻',
    link: '/services/web-development'
  },
  {
    id: 2,
    title: 'UI/UX Design',
    description: 'Designing intuitive, beautiful interfaces that put user experience front and center. 🎨',
    image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
    icon: '🎨',
    link: '/services/ui-ux-design'
  },
  {
    id: 3,
    title: 'Mobile Development',
    description: 'Creating seamless,cross-platform mobile apps with smooth performance and native feel. 📱',
    image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
    icon: '📱',
    link: '/services/mobile-development'
  },
  {
    id: 4,
    title: 'Backend Development',
    description: 'Developing robust backend systems with seamless APIs and efficient data handling. 💾',
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
    icon: '⚙️',
    link: '/services/backend-development'
  },
  {
    id: 5,
    title: 'Digital Marketing',
    description: 'Driving growth through strategic digital marketing campaigns and data-driven insights. 📈',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
    icon: '📊',
    link: '/services/digital-marketing'
  },
  {
    id: 6,
    title: 'Website Management',
    description: 'Ensuring your website runs smoothly with regular updates, maintenance, and optimization. 🔧',
    image: 'https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
    icon: '🛠️',
    link: '/services/website-management'
  },
  {
    id: 7,
    title: 'AI Integration',
    description: 'Empowering your business with intelligent automation, chatbots, and data-driven insights using the latest in AI technology. 🤖',
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
    icon: '🤖',
    link: '/services/ai-integration'
  }
];

// Styled components
const ServicesSection = styled.section`
  min-height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 100px 0;
  position: relative;
  overflow: hidden;
  background: transparent;
`;

const SectionTitle = styled.h2`
  font-size: 3rem;
  color: #a0a0a0;
  margin-bottom: 50px;
  text-align: center;
  z-index: 1;
  position: relative;
  text-shadow: 0 0 10px rgba(255, 255, 255, 0.1);
  font-family: 'JetBrains Mono', 'Fira Code', 'Consolas', monospace;
  letter-spacing: -1px;
`;

const ServicesContainer = styled(motion.div)`
  display: flex;
  gap: 30px;
  width: 100%;
  position: relative;
  z-index: 1;
  overflow-x: auto;
  overflow-y: hidden;
  background: rgba(255, 255, 255, 0.03);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 15px;
  padding: 30px;
  margin: 0 auto;
  max-width: 1400px;
  flex-wrap: nowrap;
  justify-content: flex-start;
  scrollbar-width: none; /* Hide scrollbar for Firefox */
  -ms-overflow-style: none; /* Hide scrollbar for IE and Edge */
  
  &::-webkit-scrollbar {
    display: none; /* Hide scrollbar for Chrome, Safari and Opera */
  }
  
  @media (max-width: 768px) {
    padding: 15px;
    gap: 15px;
    margin: 0 15px;
    background: rgba(255, 255, 255, 0.02);
    border: 1px solid rgba(255, 255, 255, 0.05);
    border-radius: 20px;
    flex-direction: column;
    overflow: visible;
    flex-wrap: wrap;
  }
`;

const ServiceCard = styled(motion.div)`
  min-width: 300px;
  max-width: 300px;
  height: 400px;
  background: rgba(255, 255, 255, 0.03);
  backdrop-filter: blur(5px);
  border-radius: 15px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  overflow: hidden;
  position: relative;
  cursor: pointer;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
  transition: all 0.3s ease;
  flex-shrink: 0;

  &:hover {
    transform: translateY(-10px) scale(1.05);
    box-shadow: 0 12px 40px rgba(0, 0, 0, 0.4);
  }
  
  @media (max-width: 768px) {
    min-width: 100%;
    height: 120px;
    background: rgba(255, 255, 255, 0.02);
    border: 1px solid rgba(255, 255, 255, 0.05);
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
    display: flex;
    align-items: center;
    padding: 15px;
    margin-bottom: 10px;
    
    &:hover {
      transform: translateX(5px);
      background: rgba(255, 255, 255, 0.03);
    }
    animation: fadeInUp 0.5s ease-in-out;

    @keyframes fadeInUp {
      from {
        opacity: 0;
        transform: translateY(20px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
  }
`;

const CardImage = styled.div<{ $imageUrl: string }>`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 60%;
  background-image: url(${props => props.$imageUrl});
  background-size: cover;
  background-position: center;
  opacity: 0;
  z-index: 1;
  transition: opacity 0.5s ease;
  background-color: rgba(0, 0, 0, 0.1);
  
  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 30%;
    background: linear-gradient(to top, rgba(0, 0, 0, 0.8), transparent);
    z-index: 2;
  }
  
  ${ServiceCard}:hover & {
    opacity: 0.9;
  }
  
  @media (max-width: 768px) {
    position: relative;
    width: 80px;
    height: 80px;
    border-radius: 15px;
    margin-right: 15px;
    opacity: 1;
    flex-shrink: 0;
    
    &::after {
      display: none;
    }
  }
`;

const ImageLoader = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.1);
  z-index: 2;
  
  &::after {
    content: '';
    width: 30px;
    height: 30px;
    border: 3px solid rgba(255, 255, 255, 0.1);
    border-top-color: rgba(255, 255, 255, 0.5);
    border-radius: 50%;
    animation: spin 1s linear infinite;
  }
  
  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`;

const CardContent = styled(motion.div)`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 50%;
  padding: 20px;
  z-index: 3;
  display: flex;
  flex-direction: column;
  gap: 10px;
  background: rgba(0, 0, 0, 0.7);
  
  @media (max-width: 768px) {
    position: relative;
    height: auto;
    background: transparent;
    padding: 0;
    flex: 1;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
`;

const CardTitle = styled.h3`
  color: #d4d4d4;
  font-size: 1.5rem;
  margin: 0;
  display: flex;
  align-items: center;
  gap: 10px;
  font-family: 'JetBrains Mono', 'Fira Code', 'Consolas', monospace;
  letter-spacing: -0.5px;
  @media (max-width: 768px) {
    font-size: 1rem;
    gap: 0;
    justify-content: flex-start;
  }
`;

const ServiceIcon = styled.span`
  font-size: 1.8rem;
  display: inline-block;
  @media (max-width: 768px) {
    display: none;
  }
`;

const CardDescription = styled.p`
  color: #9e9e9e;
  font-size: 1rem;
  margin: 0;
  max-width: 100%;
  overflow-wrap: break-word;
  word-wrap: break-word;
  hyphens: auto;
  line-height: 1.4;
  font-family: 'JetBrains Mono', 'Fira Code', 'Consolas', monospace;
  letter-spacing: -0.3px;
  @media (max-width: 768px) {
    display: none;
  }
`;

const Services: React.FC = () => {
  const navigate = useNavigate();
  const sectionRef = useRef<HTMLDivElement>(null);
  const controls = useAnimation();
  const isInView = useInView(sectionRef, { once: true });
  const [loadedImages, setLoadedImages] = useState<Record<number, boolean>>({});

  useEffect(() => {
    // Check if we should scroll to services section
    const scrollTarget = sessionStorage.getItem('scrollTarget');
    if (scrollTarget === 'services' && sectionRef.current) {
      // Clear the scroll target
      sessionStorage.removeItem('scrollTarget');
      
      // Try scrolling multiple times to ensure it works
      const scrollAttempts = [100, 500, 1000]; // Try at different intervals
      
      scrollAttempts.forEach(delay => {
        setTimeout(() => {
          if (sectionRef.current) {
            sectionRef.current.scrollIntoView({ 
              behavior: 'smooth',
              block: 'start'
            });
          }
        }, delay);
      });
    }
  }, []);

  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, staggerChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
  };

  const handleCardClick = (link: string) => {
    navigate(link);
  };

  const handleImageLoad = (id: number) => {
    setLoadedImages(prev => ({ ...prev, [id]: true }));
  };

  return (
    <ServicesSection id="services" ref={sectionRef}>
      <SectionTitle>&lt;Services /&gt;</SectionTitle>
      <ServicesContainer
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        {servicesData.map((service) => (
          <ServiceCard
            key={service.id}
            variants={itemVariants}
            whileHover={{ scale: 1.05, y: -10 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleCardClick(service.link)}
          >
            <CardImage $imageUrl={service.image} style={{ opacity: loadedImages[service.id] ? 0.7 : 0 }}>
              {!loadedImages[service.id] && <ImageLoader />}
              <img 
                src={service.image} 
                alt={service.title}
                style={{ display: 'none' }}
                onLoad={() => handleImageLoad(service.id)}
              />
            </CardImage>
            <CardContent>
              <CardTitle>
                <ServiceIcon>{service.icon}</ServiceIcon>
                {service.title}
              </CardTitle>
              <CardDescription>{service.description}</CardDescription>
            </CardContent>
          </ServiceCard>
        ))}
      </ServicesContainer>
    </ServicesSection>
  );
};

export default Services;