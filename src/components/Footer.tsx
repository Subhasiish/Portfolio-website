import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FaLinkedin, FaGithub, FaInstagram } from 'react-icons/fa'; // Import icons

const FooterContainer = styled.footer`
  width: 100%;
  padding: 30px 20px;
  background: transparent;
  position: relative;
  z-index: 1;
  border-top: 1px solid rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(5px);
`;

const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 20px;
`;

const Copyright = styled.div`
 color: rgba(255, 255, 255, 0.6);
  font-size: 0.8rem;
  font-weight: bold; /* Make the text bold */
  font-family: 'Arial', sans-serif; /* Change the font style */
  letter-spacing: 0.5px;
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 15px;
`;

const SocialIcon = styled(motion.a)`
  color: rgba(255, 255, 255, 0.7);
  font-size: 1.5rem; /* Adjust size for icons */
  text-decoration: none;
  position: relative;
  transition: color 0.3s ease;
  
  &:hover {
    color: white;
  }
`;

const Footer: React.FC = () => {
  const socialLinks = [
    { icon: <FaLinkedin />, url: 'https://www.linkedin.com/in/subhasishgnkk/', label: 'LinkedIn' },
    { icon: <FaGithub />, url: 'https://github.com/Subhasiish', label: 'GitHub' },
    { icon: <FaInstagram />, url: 'https://www.instagram.com/subhasiishh?igsh=MTdlc2FyOG1rb3g2eg== ', label: 'Instagram' },
  ];

  return (
    <FooterContainer>
      <FooterContent>
        <SocialLinks>
          {socialLinks.map((link, index) => (
            <SocialIcon
              key={index}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ y: -3 }}
              whileTap={{ scale: 0.95 }}
            >
              {link.icon}
            </SocialIcon>
          ))}
        </SocialLinks>
        <Copyright>
          © {new Date().getFullYear()} Created by SUBHASISH GARNAYAK ❤️
        </Copyright>
      </FooterContent>
    </FooterContainer>
  );
};

export default Footer;