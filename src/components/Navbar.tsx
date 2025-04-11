import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';

const Nav = styled(motion.nav)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 50px;
  background: rgba(0, 0, 0, 0.8);
  backdrop-filter: blur(10px);
  z-index: 1000;

  @media (max-width: 768px) {
    padding: 0 20px;
  }
`;

const Logo = styled(motion.div)`
  font-family: 'Fira Code', monospace;
  font-size: 1.5rem;
  color: #808080;
  cursor: pointer;

  @media (max-width: 768px) {
    font-size: 1.2rem;
  }
`;

const NavLinks = styled.div`
  display: flex;
  gap: 30px;

  @media (max-width: 768px) {
    display: none;
  }
`;

const MobileMenuButton = styled.button`
  display: none;
  background: none;
  border: none;
  color: #808080;
  font-size: 1.5rem;
  cursor: pointer;
  padding: 5px;

  @media (max-width: 768px) {
    display: block;
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
    backdrop-filter: blur(10px);
    padding: 20px;
  }
`;

const NavLink = styled(motion.a)`
  color: #808080;
  text-decoration: none;
  font-family: 'Fira Code', monospace;
  font-size: 1rem;
  position: relative;
  cursor: pointer;

  &::after {
    content: '';
    position: absolute;
    bottom: -5px;
    left: 0;
    width: 0;
    height: 2px;
    background: #808080;
    transition: width 0.3s ease;
  }

  &:hover::after {
    width: 100%;
  }

  @media (max-width: 768px) {
    padding: 15px 0;
    font-size: 1.2rem;
  }
`;

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'portfolio', 'services', 'about', 'achievements', 'contact'];
      const scrollPosition = window.scrollY + 100; // Add offset for better detection

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { top, bottom } = element.getBoundingClientRect();
          const elementTop = top + window.scrollY;
          const elementBottom = bottom + window.scrollY;

          if (scrollPosition >= elementTop && scrollPosition <= elementBottom) {
            setActiveSection(section);
            return;
          }
        }
      }

      // If we're at the bottom of the page, set contact as active
      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 100) {
        setActiveSection('contact');
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Call once on mount to set initial active section
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setIsOpen(false);
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsOpen(false);
    }
  };

  return (
    <Nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ 
        type: "spring",
        stiffness: 30,
        damping: 10,
        mass: 1.5,
        delay: 0.2,
        opacity: { 
          duration: 0.6,
          ease: "easeOut"
        },
        y: {
          duration: 1.2,
          ease: [0.34, 1.56, 0.64, 1]
        }
      }}
    >
      <Logo
        onClick={scrollToTop}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        &lt;SUBHASISH/&gt;
      </Logo>
      <NavLinks>
        <NavLink
          onClick={() => scrollToSection('home')}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          style={{ color: activeSection === 'home' ? '#fff' : '#808080' }}
        >
          Home
        </NavLink>
        <NavLink
          onClick={() => scrollToSection('portfolio')}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          style={{ color: activeSection === 'portfolio' ? '#fff' : '#808080' }}
        >
          Portfolio
        </NavLink>
        <NavLink
          onClick={() => scrollToSection('services')}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          style={{ color: activeSection === 'services' ? '#fff' : '#808080' }}
        >
          Services
        </NavLink>
        <NavLink
          onClick={() => scrollToSection('about')}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          style={{ color: activeSection === 'about' ? '#fff' : '#808080' }}
        >
          About
        </NavLink>
        <NavLink
          onClick={() => scrollToSection('achievements')}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          style={{ color: activeSection === 'achievements' ? '#fff' : '#808080' }}
        >
          Achievements
        </NavLink>
        <NavLink
          onClick={() => scrollToSection('contact')}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          style={{ color: activeSection === 'contact' ? '#fff' : '#808080' }}
        >
          Contact
        </NavLink>
      </NavLinks>
      <MobileMenuButton onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? '✕' : '☰'}
      </MobileMenuButton>
      <AnimatePresence>
        {isOpen && (
          <MobileMenu
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <NavLink
              onClick={() => scrollToSection('home')}
              style={{ color: activeSection === 'home' ? '#fff' : '#808080' }}
            >
              Home
            </NavLink>
            <NavLink
              onClick={() => scrollToSection('portfolio')}
              style={{ color: activeSection === 'portfolio' ? '#fff' : '#808080' }}
            >
              Portfolio
            </NavLink>
            <NavLink
              onClick={() => scrollToSection('services')}
              style={{ color: activeSection === 'services' ? '#fff' : '#808080' }}
            >
              Services
            </NavLink>
            <NavLink
              onClick={() => scrollToSection('about')}
              style={{ color: activeSection === 'about' ? '#fff' : '#808080' }}
            >
              About
            </NavLink>
            <NavLink
              onClick={() => scrollToSection('achievements')}
              style={{ color: activeSection === 'achievements' ? '#fff' : '#808080' }}
            >
              Achievements
            </NavLink>
            <NavLink
              onClick={() => scrollToSection('contact')}
              style={{ color: activeSection === 'contact' ? '#fff' : '#808080' }}
            >
              Contact
            </NavLink>
          </MobileMenu>
        )}
      </AnimatePresence>
    </Nav>
  );
};

export default Navbar; 