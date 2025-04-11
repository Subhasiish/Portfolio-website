declare module 'react-typing-effect' {
  interface ReactTypingEffectProps {
    text: string[];
    speed?: number;
    eraseDelay?: number;
    typingDelay?: number;
    staticText?: string;
    displayTextRenderer?: (text: string, i: number) => React.ReactNode;
    cursor?: React.ReactNode;
    cursorClassName?: string;
    cursorRenderer?: (cursor: React.ReactNode) => React.ReactNode;
    onDone?: () => void;
    onStart?: () => void;
    onErase?: () => void;
    onTyping?: () => void;
    className?: string;
    style?: React.CSSProperties;
  }

  const ReactTypingEffect: React.FC<ReactTypingEffectProps>;
  export default ReactTypingEffect;
} 