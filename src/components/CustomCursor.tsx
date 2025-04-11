import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { motion, useMotionValue, useSpring } from 'framer-motion';

const CursorDot = styled(motion.div)`
  width: 10px;
  height: 10px;
  background-color: white;
  border-radius: 50%;
  position: fixed;
  pointer-events: none;
  z-index: 9999;
  mix-blend-mode: difference;
  @media (max-width: 768px) {
    display: none; // Hide custom cursor on mobile phones
  }
`;

const CursorRing = styled(motion.div)`
  width: 40px;
  height: 40px;
  border: 2px solid rgba(255, 255, 255, 0.5);
  border-radius: 50%;
  position: fixed;
  pointer-events: none;
  z-index: 9998;
  mix-blend-mode: difference;
  @media (max-width: 768px) {
    display: none; // Hide custom cursor on mobile phones
  }
`;

const Ripple = styled(motion.div)`
  width: 20px;
  height: 20px;
  background: rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  position: fixed;
  pointer-events: none;
  z-index: 9997;
  @media (max-width: 768px) {
    display: none; // Hide custom cursor on mobile phones
  }
`;

const CustomCursor: React.FC = () => {
  const [isHovering, setIsHovering] = useState(false);
  const [isButtonHovering, setIsButtonHovering] = useState(false);
  const [ripples, setRipples] = useState<{ x: number; y: number; id: number }[]>([]);
  
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const ringX = useMotionValue(-100);
  const ringY = useMotionValue(-100);
  
  const springConfig = { damping: 25, stiffness: 700 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);
  const ringXSpring = useSpring(ringX, springConfig);
  const ringYSpring = useSpring(ringY, springConfig);
  
  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX - 5);
      cursorY.set(e.clientY - 5);
      ringX.set(e.clientX - 20);
      ringY.set(e.clientY - 20);
    };
    
    const handleMouseEnter = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;

      if (target instanceof HTMLElement) {
        if (target.closest('.card')) {
          setIsHovering(true);
        }
        if (target.closest('.button')) {
          setIsButtonHovering(true);
        }
      } else {
        console.warn('Target is not a valid HTMLElement:', target);
      }
    };
    
    const handleMouseLeave = () => {
      setIsHovering(false);
      setIsButtonHovering(false);
    };
    
    const handleMouseDown = (e: MouseEvent) => {
      setRipples(prev => [...prev, { x: e.clientX, y: e.clientY, id: Date.now() }]);
      setTimeout(() => {
        setRipples(prev => prev.filter(ripple => ripple.id !== Date.now()));
      }, 1000);
    };
    
    window.addEventListener('mousemove', moveCursor);
    document.addEventListener('mouseenter', handleMouseEnter, true);
    document.addEventListener('mouseleave', handleMouseLeave, true);
    document.addEventListener('mousedown', handleMouseDown);
    
    return () => {
      window.removeEventListener('mousemove', moveCursor);
      document.removeEventListener('mouseenter', handleMouseEnter, true);
      document.removeEventListener('mouseleave', handleMouseLeave, true);
      document.removeEventListener('mousedown', handleMouseDown);
    };
  }, [cursorX, cursorY, ringX, ringY]);
  
  return (
    <>
      <CursorDot
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          scale: isHovering ? 1.5 : 1,
        }}
      />
      <CursorRing
        style={{
          x: ringXSpring,
          y: ringYSpring,
          scale: isHovering ? 1.5 : 1,
          borderWidth: isButtonHovering ? '3px' : '2px',
        }}
      />
      {ripples.map(ripple => (
        <Ripple
          key={ripple.id}
          initial={{ scale: 0, opacity: 1 }}
          animate={{ scale: 2, opacity: 0 }}
          transition={{ duration: 1 }}
          style={{
            x: ripple.x - 10,
            y: ripple.y - 10,
          }}
        />
      ))}
    </>
  );
};

export default CustomCursor;