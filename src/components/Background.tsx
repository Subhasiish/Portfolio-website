import React, { useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';

const float = keyframes`
  0% {
    transform: translateY(0) rotate(0deg);
  }
  50% {
    transform: translateY(-20px) rotate(180deg);
  }
  100% {
    transform: translateY(0) rotate(360deg);
  }
`;

const BackgroundContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #000000;
  overflow: hidden;
  z-index: -1;
`;

const GridLines = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  transform: scale(1.5); // Increase grid size
  transform-origin: center;
`;

const HorizontalLine = styled.div<{ $top: number }>`
  position: absolute;
  left: -25%; // Extend lines beyond viewport
  top: ${props => props.$top}%;
  width: 150%; // Extend lines beyond viewport
  height: 1px;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(255, 255, 255, 0.1),
    rgba(255, 255, 255, 0.2),
    rgba(255, 255, 255, 0.1),
    transparent
  );
  opacity: 0.3;
`;

const VerticalLine = styled.div<{ $left: number }>`
  position: absolute;
  top: -25%; // Extend lines beyond viewport
  left: ${props => props.$left}%;
  width: 1px;
  height: 150%; // Extend lines beyond viewport
  background: linear-gradient(
    180deg,
    transparent,
    rgba(255, 255, 255, 0.1),
    rgba(255, 255, 255, 0.2),
    rgba(255, 255, 255, 0.1),
    transparent
  );
  opacity: 0.3;
`;

const Square = styled.div<{ size: number; top: number; left: number; delay: number; duration: number }>`
  position: absolute;
  width: ${props => props.size}px;
  height: ${props => props.size}px;
  top: ${props => props.top}%;
  left: ${props => props.left}%;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.05);
  animation: ${float} ${props => props.duration}s ease-in-out infinite;
  animation-delay: ${props => props.delay}s;
  backdrop-filter: blur(3px);
  border-radius: 4px;
`;

const Background: React.FC = () => {
  const [squares, setSquares] = useState<Array<{
    id: number;
    size: number;
    top: number;
    left: number;
    delay: number;
    duration: number;
  }>>([]);

  useEffect(() => {
    // Generate random squares
    const newSquares = Array.from({ length: 20 }, (_, index) => ({
      id: index,
      size: Math.random() * 60 + 20, // Size between 20 and 80px
      top: Math.random() * 100,
      left: Math.random() * 100,
      delay: Math.random() * 5,
      duration: Math.random() * 15 + 15, // Duration between 15 and 30 seconds
    }));
    setSquares(newSquares);
  }, []);

  return (
    <BackgroundContainer>
      <GridLines>
        {/* Horizontal lines */}
        {Array.from({ length: 15 }).map((_, index) => (
          <HorizontalLine key={`h-${index}`} $top={(100 / 14) * index} />
        ))}
        {/* Vertical lines */}
        {Array.from({ length: 15 }).map((_, index) => (
          <VerticalLine key={`v-${index}`} $left={(100 / 14) * index} />
        ))}
      </GridLines>
      {squares.map((square) => (
        <Square
          key={square.id}
          size={square.size}
          top={square.top}
          left={square.left}
          delay={square.delay}
          duration={square.duration}
        />
      ))}
    </BackgroundContainer>
  );
};

export default Background; 