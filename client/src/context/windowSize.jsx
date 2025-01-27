import React, { createContext, useContext, useState, useEffect } from 'react';

const WindowWidthContext = createContext();

const WindowWidthProvider = ({ children }) => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Pass an object with isMobile to match usage
  return (
    <WindowWidthContext.Provider value={{ isMobile }}>
      {children}
    </WindowWidthContext.Provider>
  );
};

export { WindowWidthProvider, WindowWidthContext };