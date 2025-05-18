import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { keyframes } from 'styled-components';

// Portfolio card data
const portfolioItems = [
  {
    id: 1,
    title: 'Talent-Lad edutech company',
    description: 'Built a responsive edtech website with a dynamic landing page using HTML, CSS, JavaScript, and Python.',
    image: '/img/Project1.png',
    // link: 'https://github.com/yourusername/project1',
    demoLink: 'https://subhasishproject1.vercel.app/',
    technologies: ['HTML5', 'Css', 'Node.js', 'MongoDB', 'Javascript', 'Python']
  },
  {
    id: 2,
    title: 'Real-time tracing app',
    description: 'A real-time location tracking app using Node.js, Express, Socket.io, and Leaflet, built for scalable, GPS-based monitoring across industries.',
    image: '/img/Project2.png',
    link: 'https://github.com/Subhasiish/Real-time-tracking-app.git',
    // demoLink: 'https://project2-demo.com',
    technologies: ['Next.js', 'Nodejs', 'Socket.io', 'Express', 'API Integration']
  },
  {
    id: 3,
    title: 'Personal-portfolio-website (Pc-Only view)',
    description: 'Showcasing my passion for web development, this portfolio blends modern design with personal flair, built using HTML5, CSS, and JavaScript.',
    image: '/img/Project3.png',
    link: 'https://github.com/Subhasiish/personal-portfolio-website.git',
    demoLink: 'https://project-3-subhasish-gnkk.vercel.app/',
    technologies: ['HTML5', 'Css', 'Javascript', 'Gsap']
  },
  // {
  //   id: 4,
  //   title: 'Social Media Dashboard',
  //   description: 'A dashboard for managing social media accounts and analytics',
  //   image: 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
  //   link: 'https://github.com/yourusername/project4',
  //   demoLink: 'https://project4-demo.com',
  //   technologies: ['Vue.js', 'D3.js', 'Express', 'MongoDB', 'Express', 'Redux']
  // },
  // {
  //   id: 5,
  //   title: 'Fitness Tracker',
  //   description: 'A mobile app for tracking workouts and nutrition',
  //   image: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
  //   link: 'https://github.com/yourusername/project5',
  //   demoLink: 'https://project5-demo.com',
  //   technologies: ['React Native', 'Redux', 'MongoDB', 'Express', 'Redux', 'Firebase']
  // },
  // {
  //   id: 6,
  //   title: 'Portfolio Website',
  //   description: 'A responsive portfolio website showcasing my work and skills',
  //   image: 'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
  //   link: 'https://github.com/yourusername/project6',
  //   demoLink: 'https://project6-demo.com',
  //   technologies: ['React', 'Styled Components', 'Framer Motion', 'MongoDB', 'Express', 'Redux']
  // }
];

// Styled components
const PortfolioSection = styled.section`
  min-height: 80vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 60px 0;
  position: relative;
  overflow: hidden;
  background: transparent;
`;

const SectionTitle = styled(motion.h1)`
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

const CardsContainer = styled(motion.div)`
  display: flex;
  flex-direction: column;
  gap: 30px;
  width: 100%;
  max-width: 800px;
  padding: 0 20px;
  position: relative;
  z-index: 1;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 20px;
    padding: 0 15px;
    animation: none;
    transition: none;
  }
`;

const mobileCardAnimation = keyframes`
  0% {
    transform: translateY(0) scale(1);
  }
  50% {
    transform: translateY(-8px) scale(1.02);
  }
  100% {
    transform: translateY(0) scale(1);
  }
`;

const slideInAnimation = keyframes`
  from {
    transform: translateX(-100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
`;

// Fix styled-components typing for `isExpanded`
const PortfolioCard = styled(motion.div)<{ $isExpanded?: boolean }>`
  width: 100%;
  height: ${({ $isExpanded = false }) => ($isExpanded ? '550px' : '350px')}; // Provide default value
  background: rgba(255, 255, 255, 0.03);
  border-radius: 16px;
  overflow: hidden;
  position: relative;
  cursor: pointer;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
  transition: all 0.3s ease;
  backdrop-filter: blur(8px);
  border: 1px solid rgba(255, 255, 255, 0.05);
  transform-style: preserve-3d;
  perspective: 1000px;
  transition: height 0.3s ease;
  pointer-events: auto;

  &:hover {
    transform: translateY(-5px) rotateX(5deg);
    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.15);
    border-color: rgba(255, 255, 255, 0.1);
    width: 80%;
    margin-left: 10%;
    height: ${({ $isExpanded = false }) => ($isExpanded ? '550px' : '350px')};
    transition: all 0.5s ease-in-out;
  }
  
  @media (max-width: 768px) {
    height: auto;
    min-height: 450px;
    background: rgba(255, 255, 255, 0.03);
    border: 1px solid rgba(255, 255, 255, 0.1);
    transform-style: preserve-3d;
    perspective: 1000px;
    animation: ${mobileCardAnimation} 3s ease-in-out infinite;
    animation-play-state: paused;
    
    &.active {
      animation-play-state: running;
    }

    &:nth-child(2) {
      animation-delay: 0.2s;
    }

    &:nth-child(3) {
      animation-delay: 0.4s;
    }

    &::after {
      content: '';
      position: absolute;
      inset: 0;
      background: linear-gradient(
        135deg,
        rgba(255, 255, 255, 0.1) 0%,
        rgba(255, 255, 255, 0.05) 50%,
        transparent 100%
      );
      opacity: 0;
      transition: opacity 0.3s ease;
    }

    &:active::after {
      opacity: 1;
    }

    &:hover {
      transform: none;
      width: 100%;
      margin-left: 0;
    }
  }

  @media (hover: none) and (pointer: coarse) {
    &:hover {
      transform: none;
      box-shadow: none;
      border-color: rgba(255, 255, 255, 0.05);
height: 320px;
    }
  }
`;

const CardImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: all 0.5s ease;
  filter: brightness(0.9) contrast(1.1);
  
  @media (max-width: 768px) {
    height: 200px;
    filter: brightness(0.8) contrast(1.1);
    transition: filter 0.3s ease, transform 0.3s ease;

    ${PortfolioCard}:active & {
      filter: brightness(1) contrast(1.2);
      transform: scale(1.05);
    }
  }
`;

const CardContent = styled(motion.div)`
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 20px;
  z-index: 2;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.9), rgba(0, 0, 0, 0.5) 50%, transparent);
  opacity: 0;
  transition: all 0.3s ease;
  transform: translateY(20px);
  pointer-events: none; /* Prevent flickering by disabling pointer events on content */
  
  ${PortfolioCard}:hover & {
    pointer-events: auto; /* Enable pointer events when hovered */
    opacity: 1;
    transform: translateY(0);
  }
  
  @media (max-width: 768px) {
    background: linear-gradient(
      to top,
      rgba(0, 0, 0, 0.95) 0%,
      rgba(0, 0, 0, 0.8) 50%,
      transparent 100%
    );
    height: auto;
    min-height: 250px;
    padding: 20px;
    opacity: 1;
    transform: none;
    animation: ${slideInAnimation} 0.5s ease-out forwards;
  }
`;

const CardTitle = styled.h3`
  color: white;
  font-size: 1.5rem;
  margin-bottom: 8px;
  font-weight: 500;
  transform: translateY(10px);
  opacity: 0;
  transition: all 0.3s ease 0.1s;
  
  ${PortfolioCard}:hover & {
    transform: translateY(0);
    opacity: 1;
  }
  
  @media (max-width: 768px) {
    font-size: 1.2rem;
    margin-bottom: 5px;
    transform: none;
    opacity: 1;
  }
`;

// Fix styled-components typing for `isExpanded` in CardDescription
const CardDescription = styled.p<{ $isExpanded?: boolean }>`
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.9rem;
  margin-bottom: 12px;
  line-height: 1.4;
  transform: translateY(10px);
  opacity: 0;
  transition: all 0.3s ease 0.2s;
  
  ${PortfolioCard}:hover & {
    transform: translateY(0);
    opacity: 1;
  }
  
  @media (max-width: 768px) {
    font-size: 0.9rem;
    line-height: 1.3;
    margin-bottom: 8px;
    transform: none; /* Remove transform effect */
    opacity: 1; /* Ensure visibility */
    display: block; /* Ensure the description is fully displayed */
    height: auto; /* Allow full height for the description */
  }

  @media (min-width: 769px) and (max-width: 1024px) {
    font-size: 1rem;
    line-height: 1.5;
    margin-bottom: 12px;
    transform: translateY(10px); /* Revert transform effect */
    opacity: 0; /* Revert visibility */
    transition: all 0.3s ease 0.2s; /* Revert transition */
    
    ${PortfolioCard}:hover & {
      transform: translateY(0);
      opacity: 1;
    }
  }

  @media (min-width: 769px) {
    max-height: ${({ $isExpanded = false }) => ($isExpanded ? 'none' : '60px')};
    overflow: hidden;
    text-overflow: ellipsis;
    transition: max-height 0.3s ease;
  }
`;

const CardExtendedContent = styled.div`
  margin-top: 15px;
  transform: translateY(10px);
  opacity: 0;
  transition: all 0.3s ease 0.3s;
  
  ${PortfolioCard}:hover & {
    transform: translateY(0);
    opacity: 1;
  }
  
  @media (max-width: 768px) {
    display: none;
  }

  @media (min-width: 769px) and (max-width: 1024px) {
    display: none; /* Revert to hidden by default */
    transform: translateY(10px); /* Revert transform effect */
    opacity: 0; /* Revert visibility */
    transition: all 0.3s ease 0.3s; /* Revert transition */
    
    ${PortfolioCard}:hover & {
      transform: translateY(0);
      opacity: 1;
      display: block; /* Show on hover */
    }
  }
`;

const CardExtendedText = styled.p`
  color: rgba(255, 255, 255, 0.8);
  font-size: 0.85rem;
  line-height: 1.6;
  margin-bottom: 15px;
`;

const CardLinks = styled.div`
  display: flex;
  gap: 15px;
  margin-top: 15px;
  transform: translateY(10px);
  opacity: 0;
  transition: all 0.3s ease 0.4s;
  
  ${PortfolioCard}:hover & {
    transform: translateY(0);
    opacity: 1;
  }
  
  @media (max-width: 768px) {
    transform: none;
    opacity: 1;
    margin-top: 10px;
  }
`;

const CardLink = styled.a`
  color: white;
  text-decoration: none;
  font-size: 0.9rem;
  display: flex;
  align-items: center;
  gap: 5px;
  transition: all 0.3s ease;
  padding: 4px 12px;
  border-radius: 20px;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(5px);
  border: 1px solid rgba(255, 255, 255, 0.05);
  
  &:hover {
    background: rgba(255, 255, 255, 0.15);
    transform: translateY(-2px);
  }
  
  @media (max-width: 768px) {
    padding: 3px 10px;
    font-size: 0.8rem;
    &[as="button"] {
      display: none !important; /* Force hiding the "Show More" button on mobile view */
    }
  }
`;

const TechStack = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-top: 8px;
  transform: translateY(10px);
  opacity: 0;
  transition: all 0.3s ease 0.3s;
  
  ${PortfolioCard}:hover & {
    transform: translateY(0);
    opacity: 1;
  }
  
  @media (max-width: 768px) {
    gap: 4px;
    margin-top: 8px;
    transform: none;
    opacity: 1;
  }
`;

const TechTag = styled.span`
  background: rgba(255, 255, 255, 0.08);
  color: rgba(255, 255, 255, 0.9);
  padding: 3px 8px;
  border-radius: 12px;
  font-size: 0.65rem;
  backdrop-filter: blur(5px);
  border: 1px solid rgba(255, 255, 255, 0.03);
  transform: scale(0.9);
  transition: all 0.3s ease;
  
  &:hover {
    transform: scale(1.05);
    background: rgba(255, 255, 255, 0.12);
  }
  
  @media (max-width: 768px) {
    padding: 2px 8px;
    font-size: 0.75rem;
    background: rgba(255, 255, 255, 0.08);
    transform: none;
    
    &:hover {
      transform: none;
    }
  }
`;

const MobileProjectCount = styled.div`
  display: none;
  
  @media (max-width: 768px) {
    display: block;
    position: absolute;
    top: 15px;
    right: 15px;
    background: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(5px);
    padding: 4px 12px;
    border-radius: 15px;
    font-size: 0.8rem;
    color: rgba(255, 255, 255, 0.9);
    z-index: 2;
  }
`;

// Fix `Portfolio` component props and hover handling
const Portfolio: React.FC = () => {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [expandedCard, setExpandedCard] = useState<number | null>(null);
  const [activeCards, setActiveCards] = useState<Set<number>>(new Set());
  const isMobile = typeof window !== 'undefined' && window.innerWidth <= 768;

  useEffect(() => {
    if (isMobile) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            const cardId = parseInt(entry.target.getAttribute('data-card-id') || '0');
            setActiveCards((prev) => {
              const newSet = new Set(prev);
              if (entry.isIntersecting) {
                newSet.add(cardId);
              } else {
                newSet.delete(cardId);
              }
              return newSet;
            });
          });
        },
        {
          threshold: 0.5,
          rootMargin: '-10% 0px'
        }
      );

      document.querySelectorAll('[data-card-id]').forEach((card) => {
        observer.observe(card);
      });

      return () => observer.disconnect();
    }
  }, [isMobile]);

  const handleCardHover = (cardId: number | null) => {
    if (!isMobile) setHoveredCard(cardId);
  };

  const handleExpandClick = (cardId: number) => {
    if (!isMobile) setExpandedCard(expandedCard === cardId ? null : cardId); // Toggle expanded state
  };

  // Animation variants
  const titleVariants = {
    hidden: { 
      opacity: 0, 
      y: -20 
    },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
        delay: 0.2
      }
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.5
      }
    }
  };

  const cardVariants = {
    hidden: { 
      opacity: 0, 
      y: 50,
      scale: 0.9,
      rotateX: 10
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      rotateX: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15
      }
    },
    hover: {
      scale: 1.02,
      rotateX: 5,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10
      }
    }
  };

  return (
    <PortfolioSection id="portfolio">
      <SectionTitle
        variants={titleVariants}
        initial="hidden"
        animate="visible"
      >
        &lt;Portfolio /&gt;
      </SectionTitle>
      <CardsContainer
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {portfolioItems.map((item, index) => (
          <PortfolioCard
            key={item.id}
            data-card-id={item.id}
            $isExpanded={expandedCard === item.id}
            className={activeCards.has(item.id) ? 'active' : ''}
            onMouseEnter={() => !isMobile && handleCardHover(item.id)}
            onMouseLeave={() => !isMobile && handleCardHover(null)}
            variants={cardVariants}
            whileHover={!isMobile ? "hover" : undefined}
          >
            <MobileProjectCount>
              Project {index + 1}/{portfolioItems.length}
            </MobileProjectCount>
            <CardImage 
              src={item.image} 
              alt={item.title}
              onError={(e: React.SyntheticEvent<HTMLImageElement>) => {
                const target = e.target as HTMLImageElement;
                target.src = '/img/fallback.jpg';
              }}
            />
            <CardContent>
              <CardTitle>{item.title}</CardTitle>
              <CardDescription $isExpanded={expandedCard === item.id}>
                {item.description}
              </CardDescription>
              {expandedCard === item.id && (
                <CardExtendedContent>
                  <CardExtendedText>
                    {item.description}
                  </CardExtendedText>
                </CardExtendedContent>
              )}
              <TechStack>
                {item.technologies.map((tech, index) => (
                  <TechTag 
                    key={index}
                    style={{
                      animationDelay: `${index * 0.1}s`
                    }}
                  >
                    {tech}
                  </TechTag>
                ))}
              </TechStack>
              <CardLinks>
                {item.id !== 1 && item.link && (
                  <CardLink href={item.link} target="_blank" rel="noopener noreferrer">
                    <span>Code</span>
                  </CardLink>
                )}
                {item.demoLink && (
                  <CardLink href={item.demoLink} target="_blank" rel="noopener noreferrer">
                    <span>Demo</span>
                  </CardLink>
                )}
                {!isMobile && (
                  <CardLink as="button" onClick={() => handleExpandClick(item.id)}>
                    <span>{expandedCard === item.id ? "Show Less" : "Show More"}</span>
                  </CardLink>
                )}
              </CardLinks>
            </CardContent>
          </PortfolioCard>
        ))}
      </CardsContainer>
    </PortfolioSection>
  );
};

export default Portfolio;