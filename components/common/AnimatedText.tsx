
import React, { useState, useEffect } from 'react';

interface AnimatedTextProps {
  text: string;
  speed?: number;
  className?: string;
}

const AnimatedText: React.FC<AnimatedTextProps> = ({ text, speed = 30, className = '' }) => {
  const [displayedText, setDisplayedText] = useState('');
  
  useEffect(() => {
    // Reset displayed text and start animation when 'text' prop changes
    setDisplayedText(''); 
    if (text && text.length > 0) {
      let i = 0;
      const intervalId = setInterval(() => {
        setDisplayedText((prev) => prev + text[i]);
        i++;
        if (i === text.length) {
          clearInterval(intervalId);
        }
      }, speed);
      // Cleanup function to clear interval if component unmounts or text changes again
      return () => clearInterval(intervalId);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text, speed]); // Rerun effect if text or speed changes

  // Use min-h-[1em] to prevent layout shift while text is empty and then populates
  return <div className={`whitespace-pre-wrap min-h-[1em] ${className}`}>{displayedText}</div>;
};

export default AnimatedText;
