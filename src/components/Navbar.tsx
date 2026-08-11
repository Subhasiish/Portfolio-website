import React, { useState, useCallback, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocation, useNavigate } from 'react-router-dom';

const mainSections = [
  'home',
  'portfolio',
  'services',
  'about',
  'testimonials',
  // 'blog',
  'contact'
] as const;
type Section = typeof mainSections[number];

const archiveItems = [
  { label: 'FRAMES', title: 'Photography', path: '/archive/photography' },
  { label: 'MOTION', title: 'Filmmaking', path: '/archive/filmmaking' },
  { label: 'ROADS', title: 'Travel', path: '/archive/travel' },
  { label: 'MILESTONES', title: 'Achievements', path: '/archive/achievements' }
];

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
  font-family: 'Quicksand', 'Helvetica Neue', sans-serif;
  font-size: 1.5rem;
  color: #808080;
  cursor: pointer;
  flex-shrink: 0;
  margin-right: auto;
  font-weight: 600;
  letter-spacing: 1.2px;

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

const ArchiveMenuWrapper = styled.div`
  position: relative;
`;

const ArchiveTrigger = styled.button<{ $active: boolean }>`
  background: transparent;
  border: none;
  color: ${props => props.$active ? '#fff' : 'rgba(255, 255, 255, 0.7)'};
  cursor: pointer;
  padding: 0.5rem 0;
  font-family: 'Fira Code', monospace;
  font-size: 1rem;
  position: relative;
  transition: color 0.3s ease;

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

const ArchiveDropdown = styled(motion.div)`
  position: absolute;
  top: calc(100% + 10px);
  left: 50%;
  transform: translateX(-50%);
  min-width: 240px;
  padding: 16px 14px;
  border-radius: 16px;
  background: rgba(7, 7, 10, 0.88);
  border: 1px solid rgba(255, 255, 255, 0.14);
  box-shadow: 0 0 0 1px rgba(255, 255, 255, 0.02), 0 20px 50px rgba(0, 0, 0, 0.45);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  z-index: 10000;

  @media (max-width: 768px) {
    position: static;
    transform: none;
    min-width: 0;
    width: 100%;
    margin-top: 8px;
    border-radius: 14px;
  }
`;

const DropdownTitle = styled.div`
  font-family: 'Fira Code', monospace;
  font-size: 0.74rem;
  letter-spacing: 0.24em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.56);
  padding-bottom: 10px;
  margin-bottom: 10px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
`;

const DropdownSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  margin-top: 12px;
`;

const DropdownLabel = styled.div`
  font-family: 'Fira Code', monospace;
  font-size: 0.68rem;
  letter-spacing: 0.24em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.48);
  margin-top: 4px;
`;

const DropdownItem = styled.button<{ $active: boolean }>`
  width: 100%;
  background: transparent;
  border: none;
  color: ${props => props.$active ? '#fff' : 'rgba(255, 255, 255, 0.74)'};
  text-align: left;
  padding: 8px 8px;
  border-radius: 10px;
  cursor: pointer;
  font-family: 'Fira Code', monospace;
  font-size: 0.95rem;
  transition: background 0.2s ease, color 0.2s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.06);
    color: #fff;
  }
`;

const Navbar: React.FC = () => {
  const [activeSection, setActiveSection] = useState<Section>('home');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isArchiveOpen, setIsArchiveOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const archiveRef = useRef<HTMLDivElement>(null);

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
      if (path.startsWith('archive')) {
        setActiveSection('home');
      } else if (mainSections.includes(path as Section)) {
        setActiveSection(path as Section);
      }
    }
  }, [location.pathname, handleScroll]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (archiveRef.current && !archiveRef.current.contains(event.target as Node)) {
        setIsArchiveOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

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
    setIsArchiveOpen(false);
  };

  const handleArchiveNavigate = (path: string) => {
    navigate(path);
    setIsArchiveOpen(false);
    setIsMenuOpen(false);
  };

  const getNavItems = () => {
    return mainSections.map((section) => {
      const displayName = section === 'services' ? 'Proficiency' : section.charAt(0).toUpperCase() + section.slice(1);

      return (
        <NavItem
          key={section}
          $active={activeSection === section}
          onClick={() => scrollToSection(section)}
        >
          {displayName}
        </NavItem>
      );
    });
  };

  const desktopNavSections = mainSections.slice(0, 4);
  const desktopTrailingSections = mainSections.slice(4);

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
          &lt;SUBHASISH/&gt;
        </Logo>
        <NavLinks>
          {desktopNavSections.map((section) => {
            const displayName = section === 'services' ? 'Proficiency' : section.charAt(0).toUpperCase() + section.slice(1);
            return (
              <NavItem
                key={section}
                $active={activeSection === section}
                onClick={() => scrollToSection(section)}
              >
                {displayName}
              </NavItem>
            );
          })}
          <ArchiveMenuWrapper ref={archiveRef}>
            <ArchiveTrigger
              $active={location.pathname.startsWith('/archive')}
              onClick={() => {
                navigate('/archive');
                setIsArchiveOpen(true);
                setIsMenuOpen(false);
              }}
              onMouseEnter={() => setIsArchiveOpen(true)}
              onMouseLeave={() => setIsArchiveOpen(false)}
              onFocus={() => setIsArchiveOpen(true)}
              onBlur={() => setIsArchiveOpen(false)}
              onKeyDown={(event) => {
                if (event.key === 'Escape') {
                  setIsArchiveOpen(false);
                }
              }}
              aria-expanded={isArchiveOpen}
            >
              Archive
            </ArchiveTrigger>
            <AnimatePresence>
              {isArchiveOpen && (
                <ArchiveDropdown
                  initial={{ opacity: 0, y: -6, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -6, scale: 0.98 }}
                  transition={{ duration: 0.2, ease: 'easeOut' }}
                >
                  <DropdownTitle>ARCHIVE</DropdownTitle>
                  <DropdownSection>
                    <DropdownLabel>FRAMES</DropdownLabel>
                    <DropdownItem
                      $active={location.pathname === '/archive/photography'}
                      onClick={() => handleArchiveNavigate('/archive/photography')}
                    >
                      Photography
                    </DropdownItem>
                  </DropdownSection>
                  <DropdownSection>
                    <DropdownLabel>MOTION</DropdownLabel>
                    <DropdownItem
                      $active={location.pathname === '/archive/filmmaking'}
                      onClick={() => handleArchiveNavigate('/archive/filmmaking')}
                    >
                      Filmmaking
                    </DropdownItem>
                  </DropdownSection>
                  <DropdownSection>
                    <DropdownLabel>ROADS</DropdownLabel>
                    <DropdownItem
                      $active={location.pathname === '/archive/travel'}
                      onClick={() => handleArchiveNavigate('/archive/travel')}
                    >
                      Travel
                    </DropdownItem>
                  </DropdownSection>
                  <DropdownSection>
                    <DropdownLabel>MILESTONES</DropdownLabel>
                    <DropdownItem
                      $active={location.pathname === '/archive/achievements'}
                      onClick={() => handleArchiveNavigate('/archive/achievements')}
                    >
                      Achievements
                    </DropdownItem>
                  </DropdownSection>
                </ArchiveDropdown>
              )}
            </AnimatePresence>
          </ArchiveMenuWrapper>
          {desktopTrailingSections.map((section) => {
            const displayName = section === 'services' ? 'Proficiency' : section.charAt(0).toUpperCase() + section.slice(1);
            return (
              <NavItem
                key={section}
                $active={activeSection === section}
                onClick={() => scrollToSection(section)}
              >
                {displayName}
              </NavItem>
            );
          })}
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
          <ArchiveMenuWrapper>
            <ArchiveTrigger
              $active={location.pathname.startsWith('/archive')}
              onClick={() => {
                setIsArchiveOpen((prev) => !prev);
              }}
              aria-expanded={isArchiveOpen}
            >
              Archive
            </ArchiveTrigger>
            <AnimatePresence>
              {isArchiveOpen && (
                <ArchiveDropdown
                  initial={{ opacity: 0, y: -6, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -6, scale: 0.98 }}
                  transition={{ duration: 0.2, ease: 'easeOut' }}
                >
                  <DropdownTitle>ARCHIVE</DropdownTitle>
                  {archiveItems.map((item) => (
                    <DropdownItem
                      key={item.path}
                      $active={location.pathname === item.path}
                      onClick={() => handleArchiveNavigate(item.path)}
                    >
                      {item.title}
                    </DropdownItem>
                  ))}
                </ArchiveDropdown>
              )}
            </AnimatePresence>
          </ArchiveMenuWrapper>
        </MobileMenu>
      )}
    </Nav>
  );
};

export default Navbar; 
