import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Container = styled.section`
  min-height: calc(100vh - 60px);
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 100px 24px 80px;
  position: relative;
  overflow: hidden;
  background: transparent;
  scroll-margin-top: 60px;

  @media (max-width: 768px) {
    padding: 80px 16px 40px;
  }
`;

const Content = styled.div`
  width: min(1100px, 100%);
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const Eyebrow = styled.p`
  font-family: 'Fira Code', monospace;
  font-size: 0.85rem;
  letter-spacing: 0.24em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.6);
  margin: 0;
`;

const Title = styled.h1`
  font-size: clamp(2rem, 5vw, 3rem);
  color: #a0a0a0;
  margin: 0;
  font-family: 'JetBrains Mono', 'Fira Code', 'Consolas', monospace;
  text-shadow: 0 0 10px rgba(255, 255, 255, 0.2);
`;

const Description = styled.p`
  font-size: 1rem;
  line-height: 1.8;
  color: rgba(255, 255, 255, 0.72);
  margin: 0;
  max-width: 760px;
`;

const BackLink = styled(Link)`
  color: #d0d0d0;
  text-decoration: none;
  font-family: 'Fira Code', monospace;
  font-size: 0.9rem;
  align-self: flex-start;

  &:hover {
    color: #fff;
  }
`;

type ArchiveSectionPageProps = {
  title: string;
  description: string;
  eyebrow?: string;
  children?: React.ReactNode;
};

const ArchiveSectionPage: React.FC<ArchiveSectionPageProps> = ({
  title,
  description,
  eyebrow = 'Archive',
  children
}) => {
  return (
    <Container>
      <Content>
        <Eyebrow>{eyebrow}</Eyebrow>
        <Title>{title}</Title>
        <Description>{description}</Description>
        <BackLink to="/archive">← Back to archive</BackLink>
        {children}
      </Content>
    </Container>
  );
};

export default ArchiveSectionPage;
