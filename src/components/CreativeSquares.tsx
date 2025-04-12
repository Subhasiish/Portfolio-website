import React, { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";

type CreativeSquaresProps = {
  activePage: string;
};

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

const SquaresContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  z-index: -1;
  pointer-events: none;
`;

const Square = styled.div<{ size: number; top: number; left: number; delay: number; duration: number }>`
  position: absolute;
  width: ${props => props.size}px;
  height: ${props => props.size}px;
  top: ${props => props.top}%;
  left: ${props => props.left}%;
  background: rgba(255, 255, 255, 0.05);
  border: 2px solid rgba(255, 255, 255, 0.1);
  animation: ${float} ${props => props.duration}s ease-in-out infinite;
  animation-delay: ${props => props.delay}s;
  backdrop-filter: blur(5px);
  border-radius: 10px;
`;

const CreativeSquares: React.FC<CreativeSquaresProps> = ({ activePage }) => {
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
    const newSquares = Array.from({ length: 15 }, (_, index) => ({
      id: index,
      size: Math.random() * 100 + 50, // Size between 50 and 150px
      top: Math.random() * 100,
      left: Math.random() * 100,
      delay: Math.random() * 5,
      duration: Math.random() * 10 + 10, // Duration between 10 and 20 seconds
    }));
    setSquares(newSquares);
  }, []);

  return (
    <SquaresContainer>
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
    </SquaresContainer>
  );
};

export default CreativeSquares;
