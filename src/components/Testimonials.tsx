import React from 'react';
import styled from 'styled-components';

const Section = styled.section`
  width: 100%;
  padding: 80px 0;
  background: rgba(255,255,255,0.01);
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled.h2`
  font-size: 2rem;
  color: #fff;
  margin-bottom: 40px;
  font-family: 'JetBrains Mono', 'Fira Code', monospace;
`;

const TestimonialsGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 30px;
  justify-content: center;
`;

const TestimonialCard = styled.div`
  background: rgba(255,255,255,0.04);
  border-radius: 16px;
  box-shadow: 0 2px 12px rgba(0,0,0,0.15);
  padding: 30px 24px;
  max-width: 350px;
  color: #d4d4d4;
  font-size: 1rem;
  font-family: 'JetBrains Mono', 'Fira Code', monospace;
`;

const Author = styled.div`
  margin-top: 20px;
  font-weight: bold;
  color: #fff;
`;

const Testimonials: React.FC = () => (
  <Section id="testimonials">
    <Title>Testimonials</Title>
    <TestimonialsGrid>
      <TestimonialCard>
        "Working with Subhasish was a fantastic experience. The website exceeded our expectations!"
        <Author>- Yash R.Nawale</Author>
      </TestimonialCard>
      <TestimonialCard>
        "Professional, creative, and always on time. Highly recommended for any web project."
        <Author>- K.Ayush Aman</Author>
      </TestimonialCard>
      <TestimonialCard>
        "The attention to detail and smooth animations made our site stand out. Thank you!"
        <Author>- Ashank Shukla</Author>
      </TestimonialCard>
    </TestimonialsGrid>
  </Section>
);

export default Testimonials; 