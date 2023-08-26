'use client';

import { useState, useEffect } from 'react';

const TypewriterText = ({texts}) => {
  const [index, setIndex] = useState(0);
  
  const [text, setText] = useState("");
  const [animating, setAnimating] = useState(true);  // Flag to check if we're currently animating
  const [erasing, setErasing] = useState(false);    // Flag to check if we're erasing
  

  useEffect(() => {
    const maxIndex = texts.length - 1;

    if (animating) {
      if (!erasing) {
        // Typing
        const typingTimer = setTimeout(() => {
          setText((prevText) => prevText + texts[index].charAt(prevText.length));
          if (text === texts[index]) {
            setAnimating(false);
          }
        }, 100);  // Speed of typing
        return () => clearTimeout(typingTimer);
      } else {
        // Erasing
        const erasingTimer = setTimeout(() => {
          setText((prevText) => prevText.substring(0, prevText.length - 1));
          if (text === '') {
            setErasing(false);
            setAnimating(true);
            setIndex((prevIndex) => (prevIndex === maxIndex ? 0 : prevIndex + 1));
          }
        }, 50);  // Speed of erasing
        return () => clearTimeout(erasingTimer);
      }
    } else {
      // Pause after typing before erasing
      const pauseTimer = setTimeout(() => {
        setAnimating(true);
        setErasing(true);
      }, 2000);  // Pause duration
      return () => clearTimeout(pauseTimer);
    }
  }, [text, erasing, animating, index]);

  return (
    <div 
      className="typewriter-effect text-center" 
    >
      {text}
    </div>
  );
}

export default TypewriterText;
