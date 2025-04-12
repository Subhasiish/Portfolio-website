import React, { useState, useCallback, useEffect } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useLocation, useNavigate } from 'react-router-dom';

const mainSections = [
  'home',
  'portfolio',
  'services',
  'about',
  'achievements',
  'contact'
] as const;
type Section = typeof mainSections[number];

const Nav = styled(motion.nav)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 60px;
  background: rgba(0, 0, 0, 0.8);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  z-index: 9990;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
`;

const NavContent = styled.div`
  margin: 0 auto;
  padding: 0 50px;
  height: 100%;
  display: flex;
  align-items: center;
  position: relative;

  @media (max-width: 768px) {
    padding: 0 20px;
    justify-content: space-between;
  }
`;

const Logo = styled(motion.div)`
  font-family: 'Fira Code', monospace;
  font-size: 1.5rem;
  color: #808080;
  cursor: pointer;
  flex-shrink: 0;
  margin-right: auto;

  @media (max-width: 768px) {
    font-size: 1.2rem;
    margin-right: 0;
  }
`;

const NavLinks = styled.div`
  display: flex;
  gap: 2rem;
  align-items: center;

  @media (max-width: 768px) {
    display: none;
  }
`;

const MenuButton = styled.button`
  display: none;
  flex-direction: column;
  justify-content: space-between;
  width: 30px;
  height: 20px;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
  z-index: 10;

  span {
    width: 100%;
    height: 2px;
    background: #808080;
    transition: transform 0.3s ease;
  }

  @media (max-width: 768px) {
    display: flex;
  }
`;

const MobileMenu = styled(motion.div)`
  display: none;

  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
    position: fixed;
    top: 60px;
    left: 0;
    right: 0;
    background: rgba(0, 0, 0, 0.95);
    backdrop-filter: blur(8px);
    padding: 20px;
    z-index: 9989;
  }
`;

const NavItem = styled.a<{ $active: boolean }>`
  color: ${props => props.$active ? '#fff' : 'rgba(255, 255, 255, 0.7)'};
  text-decoration: none;
  cursor: pointer;
  transition: color 0.3s ease;
  position: relative;
  padding: 0.5rem 0;
  font-family: 'Fira Code', monospace;
  font-size: 1rem;

  &::after {
    content: '';
    position: absolute;
    bottom: -5px;
    left: 0;
    width: ${props => props.$active ? '100%' : '0'};
    height: 2px;
    background: #808080;
    transition: width 0.3s ease;
  }

  &:hover {
    color: #fff;
    &::after {
      width: 100%;
    }
  }

  @media (max-width: 768px) {
    padding: 15px 0;
    font-size: 1.2rem;
    text-align: center;
  }
`;

const Navbar: React.FC = () => {
  const [activeSection, setActiveSection] = useState<Section>('home');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleScroll = useCallback(() => {
    if (location.pathname !== '/') return;

    const sections = document.querySelectorAll('section[id]');
    let currentSection: string = 'home';
    let minDistance = Infinity;

    sections.forEach((section) => {
      const rect = section.getBoundingClientRect();
      const viewportMiddle = window.innerHeight / 2;
      const elementMiddle = rect.top + rect.height / 2;
      const distance = Math.abs(elementMiddle - viewportMiddle);

      if (distance < minDistance && mainSections.includes(section.id as Section)) {
        minDistance = distance;
        currentSection = section.id;
      }
    });

    setActiveSection(currentSection as Section);
  }, [location.pathname]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial check

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [handleScroll]);

  useEffect(() => {
    // Reset active section when route changes
    if (location.pathname === '/') {
      handleScroll();
    } else {
      // Set active section based on current route
      const path = location.pathname.slice(1); // Remove leading slash
      if (mainSections.includes(path as Section)) {
        setActiveSection(path as Section);
      }
    }
  }, [location.pathname, handleScroll]);

  const scrollToSection = (sectionId: Section) => {
    if (location.pathname !== '/') {
      navigate('/');
      // Wait for navigation to complete before scrolling
      setTimeout(() => {
        const section = document.getElementById(sectionId);
        if (section) {
          section.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      const section = document.getElementById(sectionId);
      if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
      }
    }
    setIsMenuOpen(false);
  };

  const handleLogoClick = () => {
    if (location.pathname !== '/') {
      navigate('/');
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  const getNavItems = () => {
    return mainSections.map((section) => (
      <NavItem
        key={section}
        $active={activeSection === section}
        onClick={() => scrollToSection(section)}
      >
        {section.charAt(0).toUpperCase() + section.slice(1)}
      </NavItem>
    ));
  };

  return (
    <Nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <NavContent>
        <Logo 
          onClick={handleLogoClick}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          &lt;Subhasish /&gt;
        </Logo>
        <NavLinks>
          {getNavItems()}
        </NavLinks>
        <MenuButton 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        >
          <span style={{ transform: isMenuOpen ? 'rotate(45deg) translate(5px, 5px)' : 'none' }} />
          <span style={{ opacity: isMenuOpen ? 0 : 1 }} />
          <span style={{ transform: isMenuOpen ? 'rotate(-45deg) translate(5px, -5px)' : 'none' }} />
        </MenuButton>
      </NavContent>
      {isMenuOpen && (
        <MobileMenu
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          {getNavItems()}
        </MobileMenu>
      )}
    </Nav>
  );
};

export default Navbar; 