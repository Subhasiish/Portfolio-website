import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { motion, useMotionValue, useSpring } from 'framer-motion';

const CursorDot = styled(motion.div)`
  width: 8px;
  height: 8px;
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
  border: 1.5px solid rgba(255, 255, 255, 0.5);
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
  
  const springConfig = {
    dot: { damping: 50, stiffness: 1000, mass: 0.2 },
    ring: { damping: 30, stiffness: 400, mass: 0.4, restSpeed: 0.5 }
  };

  const cursorXSpring = useSpring(cursorX, springConfig.dot);
  const cursorYSpring = useSpring(cursorY, springConfig.dot);
  const ringXSpring = useSpring(ringX, springConfig.ring);
  const ringYSpring = useSpring(ringY, springConfig.ring);
  
  useEffect(() => {
    let prevMouseX = 0;
    let prevMouseY = 0;
    let frameId: number;

    const moveCursor = (e: MouseEvent) => {
      const mouseX = e.clientX;
      const mouseY = e.clientY;

      const velocityX = Math.abs(mouseX - prevMouseX);
      const velocityY = Math.abs(mouseY - prevMouseY);
      const velocity = velocityX + velocityY;

      const dynamicStiffness = Math.min(2000, 1000 + velocity * 2);
      
      cursorX.set(mouseX - 4);
      cursorY.set(mouseY - 4);
      
      frameId = requestAnimationFrame(() => {
        ringX.set(mouseX - 20);
        ringY.set(mouseY - 20);
      });

      prevMouseX = mouseX;
      prevMouseY = mouseY;
    };

    const handleMouseEnter = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest('.square')) {
        setIsHovering(true);
      }
      if (target.closest('button, a, .interactive')) {
        setIsButtonHovering(true);
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

    document.addEventListener('mousemove', moveCursor);
    document.addEventListener('mouseenter', handleMouseEnter, true);
    document.addEventListener('mouseleave', handleMouseLeave, true);
    document.addEventListener('mousedown', handleMouseDown);

    return () => {
      document.removeEventListener('mousemove', moveCursor);
      document.removeEventListener('mouseenter', handleMouseEnter, true);
      document.removeEventListener('mouseleave', handleMouseLeave, true);
      document.removeEventListener('mousedown', handleMouseDown);
      cancelAnimationFrame(frameId);
    };
  }, [cursorX, cursorY, ringX, ringY]);
  
  return (
    <>
      <CursorDot
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          scale: isHovering ? 2 : 1,
        }}
        transition={{
          scale: { type: "spring", damping: 20, stiffness: 300 }
        }}
      />
      <CursorRing
        style={{
          x: ringXSpring,
          y: ringYSpring,
          scale: isHovering ? 1.8 : 1,
          opacity: isButtonHovering ? 0.8 : 0.5,
          borderWidth: isButtonHovering ? '2px' : '1.5px',
        }}
        transition={{
          scale: { type: "spring", damping: 25, stiffness: 200 },
          opacity: { duration: 0.2 }
        }}
      />
      {ripples.map(ripple => (
        <Ripple
          key={ripple.id}
          initial={{ scale: 0, opacity: 0.8 }}
          animate={{ scale: 2, opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
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