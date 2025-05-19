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

const Title = styled.h1`
  font-size: 3rem;
  color: #808080;
  margin-bottom: 30px;
  text-align: center;
  font-family: 'Fira Code', monospace;
  text-shadow: 0 0 10px rgba(128, 128, 128, 0.3);

  @media (max-width: 768px) {
    font-size: 2.2rem;
    margin-bottom: 20px;
  }
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
    <Title>&lt;Testimonials/&gt;</Title>
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
