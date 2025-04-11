import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@300;400;500;600;700&display=swap');
  
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html {
    scroll-behavior: smooth;
  }

  body {
    font-family: 'JetBrains Mono', 'Fira Code', 'Consolas', monospace;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    background: #000000;
    color: #9e9e9e;
    line-height: 1.6;
    letter-spacing: -0.3px;
  }

  h1, h2, h3, h4, h5, h6 {
    font-family: 'JetBrains Mono', 'Fira Code', 'Consolas', monospace;
    font-weight: 600;
    color: #d4d4d4;
    letter-spacing: -0.5px;
  }

  p, span, a, li, button, input, textarea {
    font-family: 'JetBrains Mono', 'Fira Code', 'Consolas', monospace;
    color: #9e9e9e;
  }

  a {
    text-decoration: none;
    color: #b0b0b0;
    transition: color 0.3s ease;

    &:hover {
      color: #d4d4d4;
    }
  }

  button {
    font-family: 'JetBrains Mono', 'Fira Code', 'Consolas', monospace;
    letter-spacing: -0.3px;
  }

  code, pre {
    font-family: 'JetBrains Mono', 'Fira Code', 'Consolas', monospace;
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
    width: 8px;
    height: 8px;
  }

  ::-webkit-scrollbar-track {
    background: rgba(255, 255, 255, 0.02);
  }

  ::-webkit-scrollbar-thumb {
    background: rgba(255, 255, 255, 0.1);
    border-radius: 4px;

    &:hover {
      background: rgba(255, 255, 255, 0.15);
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