'use client'

import React, {useEffect, useState, useRef} from "react";


const Video = ({src}) => {
    const containerRef = useRef(null);
    const [containerHeight, setContainerHeight] = useState(0.0);
  
    useEffect(() => {
        function updateSize() {
            console.log("hello")
            const maxWidth = 960;  // Maximum width you want to set
            const aspectRatio = 9 / 16;  // 16:9 Aspect Ratio
            
            const width = containerRef.current.offsetWidth;
            console.log("width", width)
            let adjustedWidth = width;
      
            if (width > maxWidth) {
              adjustedWidth = maxWidth;
            }
      
            const adjustedHeight = adjustedWidth * aspectRatio;
            console.log("height",adjustedHeight)
            setContainerHeight(adjustedHeight);
            console.log(containerHeight)
          }
      
          // Initialize the size on first load
          updateSize();
          
          // Add an event listener to update the size whenever the window resizes
          window.addEventListener('resize', updateSize);
      
          // Remove the event listener on cleanup
          return () => window.removeEventListener('resize', updateSize);
        }, []);
    return (
    <section className="w-full" ref={containerRef}>
      <div style={{ height: `${containerHeight}px` }} className={`relative w-full mx-auto`}>
      <iframe className="absolute top-0 left-0 w-full h-full" 
      src={src} frameBorder="0" allow="autoplay; fullscreen; picture-in-picture" allowFullScreen />
      </div></section>
  )};


  export default Video;