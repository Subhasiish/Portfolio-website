import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  html {
    scroll-behavior: smooth;
    scroll-padding-top: 60px;
    height: 100%;
    background-color: #000000;
    font-family: 'JetBrains Mono', 'Fira Code', monospace;
  }

  body {
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
      'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
      sans-serif;
    background-color: #000000;
    color: #ffffff;
    line-height: 1.5;
    min-height: 100%;
    overflow-x: hidden;
    position: relative;
  }

  #root {
    min-height: 100vh;
    position: relative;
    background-color: #000000;
  }

  section {
    scroll-margin-top: 60px;
    position: relative;
  }

  .smooth-scroll {
    transition: all 0.3s ease-in-out;
  }

  h1, h2, h3, h4, h5, h6 {
    font-family: 'JetBrains Mono', 'Fira Code', monospace;
    font-weight: 600;
    color: #d4d4d4;
    letter-spacing: -0.5px;
  }

  p, span, a, li, button, input, textarea {
    font-family: 'JetBrains Mono', 'Fira Code', monospace;
    color: #9e9e9e;
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  button {
    border: none;
    background: none;
    cursor: pointer;
    font-family: inherit;
  }

  code, pre {
    font-family: 'JetBrains Mono', 'Fira Code', monospace;
    background: rgba(255, 255, 255, 0.05);
    padding: 0.2em 0.4em;
    border-radius: 4px;
    font-size: 0.9em;
  }

  ::selection {
    background: rgba(255, 255, 255, 0.1);
    color: #d4d4d4;
  }

  ::-webkit-scrollbar {
    width: 10px;
  }

  ::-webkit-scrollbar-track {
    background: #1a1a1a;
  }

  ::-webkit-scrollbar-thumb {
    background: #333;
    border-radius: 5px;
    
    &:hover {
      background: #444;
    }
  }

  @media (max-width: 768px) {
    body {
      font-size: 14px;
    }

    h1 {
      font-size: 2rem;
    }

    h2 {
      font-size: 1.5rem;
    }

    h3 {
      font-size: 1.2rem;
    }
  }
`;

export default GlobalStyles; 