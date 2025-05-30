import React from 'react';
import styled from 'styled-components';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import GlobalStyles from './styles/GlobalStyles';
import CustomCursor from './components/CustomCursor';
import Navbar from './components/Navbar';
import LandingPage from './components/LandingPage';
import Portfolio from './components/Portfolio';
import Services from './components/Services';
import About from './pages/About';
import Achievements from './pages/Achievements';
import BookCall from './components/BookCall';
import Footer from './components/Footer';
import CreativeSquares from './components/CreativeSquares';
import Background from './components/Background';
import ServiceDetails from './components/ServiceDetails';
import HireMeDetails from './components/HireMeDetails';
import BookCallDetails from './components/BookCallDetails';
// import Blog from './pages/Blog';
import Testimonials from './components/Testimonials';
import { Analytics } from "@vercel/analytics/react"
import { ThemeProvider } from 'styled-components';
import { darkTheme } from './styles/theme';

const AppContainer = styled.div`
  position: relative;
  min-height: 100vh;
  width: 100%;
  overflow-x: hidden;
  background-color: transparent;
`;

const MainContent = styled.main`
  position: relative;
  z-index: 1;
  min-height: 100vh;
  width: 100%;
  padding-top: 60px;
  background-color: transparent;
`;

const StyledSection = styled.section<{ id: string }>`
  min-height: 100vh;
  width: 100%;
  padding: 20px 0;
  position: relative;
  scroll-margin-top: 60px;
  background-color: transparent;
`;

const App = () => {
  return (
    <ThemeProvider theme={darkTheme}>
      <Router>
        <Analytics />
        <GlobalStyles />
        <AppContainer>
          <Background />
          <CustomCursor />
          <Navbar />
          <Routes>
            <Route path="/" element={
              <MainContent>
                <StyledSection id="home">
                  <LandingPage />
                </StyledSection>
                <StyledSection id="portfolio">
                  <Portfolio />
                </StyledSection>
                <CreativeSquares />
                <StyledSection id="services">
                  <Services />
                </StyledSection>
                <StyledSection id="about">
                  <About />
                </StyledSection>
                <StyledSection id="achievements">
                  <Achievements />
                </StyledSection>
                <StyledSection id="testimonials">
                  <Testimonials />
                </StyledSection>
                <StyledSection id="contact">
                  <BookCall />
                </StyledSection>
                {/* <StyledSection id="blog">
                  <Blog />
                </StyledSection> */}
                <Footer />
              </MainContent>
            } />
            <Route path="/services/:serviceId" element={<ServiceDetails />} />
            <Route path="/hire-me" element={<HireMeDetails />} />
            <Route path="/book-call" element={<BookCallDetails />} />
            {/* <Route path="/blog" element={<Blog />} /> */}
          </Routes>
        </AppContainer>
      </Router>
    </ThemeProvider>
  );
};

export default App;
