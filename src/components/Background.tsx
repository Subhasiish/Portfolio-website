import React from 'react';
import styled from 'styled-components';

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
`;

const HorizontalLine = styled.div<{ $top: number }>`
  position: absolute;
  left: 0;
  top: ${props => props.$top}%;
  width: 100%;
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
  top: 0;
  left: ${props => props.$left}%;
  width: 1px;
  height: 100%;
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

const Background: React.FC = () => {
  return (
    <BackgroundContainer>
      <GridLines>
        {/* Horizontal lines */}
        {Array.from({ length: 12 }).map((_, index) => (
          <HorizontalLine key={`h-${index}`} $top={(100 / 11) * index} />
        ))}
        {/* Vertical lines */}
        {Array.from({ length: 12 }).map((_, index) => (
          <VerticalLine key={`v-${index}`} $left={(100 / 11) * index} />
        ))}
      </GridLines>
    </BackgroundContainer>
  );
};

export default Background; 