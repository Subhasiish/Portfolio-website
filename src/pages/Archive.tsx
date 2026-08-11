import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Link, useParams } from 'react-router-dom';
import Achievements from './Achievements';

const ArchiveContainer = styled.section`
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
  gap: 28px;
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
  max-width: 720px;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 20px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const ArchiveCard = styled(motion.div)`
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 20px;
  padding: 24px;
  backdrop-filter: blur(10px);
  box-shadow: 0 0 0 1px rgba(255, 255, 255, 0.02), 0 18px 40px rgba(0, 0, 0, 0.28);
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const CardLabel = styled.span`
  font-family: 'Fira Code', monospace;
  font-size: 0.75rem;
  letter-spacing: 0.24em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.56);
`;

const CardTitle = styled.h2`
  font-size: 1.2rem;
  color: #f5f5f5;
  margin: 0;
  font-family: 'JetBrains Mono', 'Fira Code', 'Consolas', monospace;
`;

const CardText = styled.p`
  color: rgba(255, 255, 255, 0.72);
  line-height: 1.7;
  margin: 0;
  font-size: 0.96rem;
`;

const CardLink = styled(Link)`
  margin-top: auto;
  color: #d0d0d0;
  text-decoration: none;
  font-family: 'Fira Code', monospace;
  font-size: 0.9rem;
  transition: color 0.3s ease;

  &:hover {
    color: #fff;
  }
`;

const DetailContainer = styled(motion.div)`
  width: min(1100px, 100%);
  display: flex;
  flex-direction: column;
  gap: 18px;
`;

const DetailHeader = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const DetailTitle = styled.h2`
  font-size: clamp(1.6rem, 3.5vw, 2.2rem);
  color: #f5f5f5;
  margin: 0;
  font-family: 'JetBrains Mono', 'Fira Code', 'Consolas', monospace;
`;

const DetailText = styled.p`
  color: rgba(255, 255, 255, 0.72);
  line-height: 1.8;
  margin: 0;
  max-width: 760px;
`;

const ArchiveSectionLink = styled(Link)`
  color: #d0d0d0;
  text-decoration: none;
  font-family: 'Fira Code', monospace;
  font-size: 0.9rem;
  align-self: flex-start;

  &:hover {
    color: #fff;
  }
`;

const archiveItems = [
  {
    slug: 'photography',
    label: 'FRAMES',
    title: 'Photography',
    description: 'A cinematic archive of still moments, portraits, and visual studies gathered across projects and travels.'
  },
  {
    slug: 'filmmaking',
    label: 'MOTION',
    title: 'Filmmaking',
    description: 'A collection of moving-image experiments, visual narratives, and story-driven edits.'
  },
  {
    slug: 'travel',
    label: 'ROADS',
    title: 'Travel',
    description: 'Notes, impressions, and frames from places that shaped the way the work is seen and felt.'
  },
  {
    slug: 'achievements',
    label: 'MILESTONES',
    title: 'Achievements',
    description: 'A timeline of milestones, metrics, and creative outcomes that continue to define the practice.'
  }
];

const Archive: React.FC = () => {
  const { section } = useParams<{ section?: string }>();

  if (section === 'achievements') {
    return (
      <ArchiveContainer>
        <Content>
          <Eyebrow>Archive</Eyebrow>
          <Title>&lt;MILESTONES/&gt;</Title>
          <Description>Selected highlights and outcomes from the body of work, gathered in one place.</Description>
          <ArchiveSectionLink to="/archive">← Back to archive</ArchiveSectionLink>
          <Achievements />
        </Content>
      </ArchiveContainer>
    );
  }

  if (section) {
    const current = archiveItems.find((item) => item.slug === section);

    if (!current) {
      return null;
    }

    return (
      <ArchiveContainer>
        <DetailContainer
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
        >
          <DetailHeader>
            <Eyebrow>Archive</Eyebrow>
            <DetailTitle>{current.title}</DetailTitle>
            <DetailText>{current.description}</DetailText>
            <ArchiveSectionLink to="/archive">← Back to archive</ArchiveSectionLink>
          </DetailHeader>
        </DetailContainer>
      </ArchiveContainer>
    );
  }

  return (
    <ArchiveContainer>
      <Content>
        <Eyebrow>Archive</Eyebrow>
        <Title>&lt;Archive/&gt;</Title>
        <Description>A curated collection of creative chapters, each one connected to a different mode of storytelling and exploration.</Description>
        <Grid>
          {archiveItems.map((item, index) => (
            <ArchiveCard
              key={item.slug}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: index * 0.08 }}
              whileHover={{ y: -6, scale: 1.01, transition: { duration: 0.2 } }}
            >
              <CardLabel>{item.label}</CardLabel>
              <CardTitle>{item.title}</CardTitle>
              <CardText>{item.description}</CardText>
              <CardLink to={`/archive/${item.slug}`}>Open section →</CardLink>
            </ArchiveCard>
          ))}
        </Grid>
      </Content>
    </ArchiveContainer>
  );
};

export default Archive;
