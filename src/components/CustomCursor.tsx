import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const CursorWrapper = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 9999;
`;

const Cursor = styled(motion.div)`
  position: fixed;
  left: 0;
  top: 0;
  width: 32px;
  height: 32px;
  background: transparent;
  border: 2px solid white;
  border-radius: 50%;
  pointer-events: none;
  mix-blend-mode: difference;
  transition: all 0.2s ease;
  z-index: 9998;

  @media (max-width: 768px) {
    display: none;
  }
`;

const Dot = styled(motion.div)`
  position: fixed;
  width: 8px;
  height: 8px;
  background: white;
  border-radius: 50%;
  pointer-events: none;
  mix-blend-mode: difference;
  z-index: 9999;

  @media (max-width: 768px) {
    display: none;
  }
`;

const CustomCursor: React.FC = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const mousePosition = useRef({ x: 0, y: 0 });
  const cursorPosition = useRef({ x: 0, y: 0 });
  const dotPosition = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      mousePosition.current = { x: e.clientX, y: e.clientY };
    };

    const handleMouseEnter = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target && cursorRef.current) {
        const tagName = target.tagName?.toLowerCase() || '';
        const role = target.getAttribute('role') || '';
        if (tagName === 'a' || tagName === 'button' || role === 'button') {
          cursorRef.current.style.transform = 'scale(1.5)';
        }
      }
    };

    const handleMouseLeave = () => {
      if (cursorRef.current) {
        cursorRef.current.style.transform = 'scale(1)';
      }
    };

    const animate = () => {
      if (cursorRef.current && dotRef.current) {
        // Move circle (faster now)
        const cursorSpeed = 0.3; // Increased from 0.15
        cursorPosition.current.x += (mousePosition.current.x - cursorPosition.current.x - 16) * cursorSpeed;
        cursorPosition.current.y += (mousePosition.current.y - cursorPosition.current.y - 16) * cursorSpeed;
        
        cursorRef.current.style.left = `${cursorPosition.current.x}px`;
        cursorRef.current.style.top = `${cursorPosition.current.y}px`;

        // Make dot follow the circle with delay
        const dotSpeed = 0.2;
        const targetX = cursorPosition.current.x + 14; // Center of the circle
        const targetY = cursorPosition.current.y + 14; // Center of the circle
        
        dotPosition.current.x += (targetX - dotPosition.current.x) * dotSpeed;
        dotPosition.current.y += (targetY - dotPosition.current.y) * dotSpeed;
        
        dotRef.current.style.left = `${dotPosition.current.x}px`;
        dotRef.current.style.top = `${dotPosition.current.y}px`;
      }
      requestAnimationFrame(animate);
    };

    document.addEventListener('mousemove', moveCursor);
    document.addEventListener('mouseenter', handleMouseEnter, true);
    document.addEventListener('mouseleave', handleMouseLeave, true);
    
    // Initialize positions
    if (cursorRef.current) {
      cursorPosition.current = { x: mousePosition.current.x - 16, y: mousePosition.current.y - 16 };
      dotPosition.current = { x: mousePosition.current.x - 4, y: mousePosition.current.y - 4 };
    }
    
    // Start the animation loop
    const animationFrame = requestAnimationFrame(animate);

    return () => {
      document.removeEventListener('mousemove', moveCursor);
      document.removeEventListener('mouseenter', handleMouseEnter, true);
      document.removeEventListener('mouseleave', handleMouseLeave, true);
      cancelAnimationFrame(animationFrame);
    };
  }, []);

  // Hide cursor on mobile devices
  if (typeof window !== 'undefined' && window.matchMedia('(hover: none)').matches) {
    return null;
  }

  return (
    <CursorWrapper>
      <Cursor ref={cursorRef} />
      <Dot ref={dotRef} />
    </CursorWrapper>
  );
};

export default CustomCursor;