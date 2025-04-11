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

const App: React.FC = () => {
  return (
    <Router>
      <GlobalStyles />
      <Background />
      <CustomCursor />
      <Navbar activePage="home" />
      <Routes>
        <Route path="/" element={
          <main>
            <LandingPage />
            <Portfolio />
            {/* <CreativeSquares /> */}
            <Services />
            <About />
            <Achievements />
            <BookCall />
            <Footer />
          </main>
        } />
        <Route path="/services/:serviceId" element={<ServiceDetails />} />
        <Route path="/hire-me" element={<HireMeDetails />} />
        <Route path="/book-call" element={<BookCallDetails />} />
        <Route path="/book-call-details" element={<BookCallDetails />} /> {/* Removed onClose */}
      </Routes>
    </Router>
  );
};

export default App;
