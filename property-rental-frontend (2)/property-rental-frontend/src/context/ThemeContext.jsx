import React, { createContext, useState, useContext, useEffect } from 'react';

const ThemeContext = createContext();

const LIGHT_BG = '#ffffff';
const DARK_BG  = '#0f172a';

export function ThemeProvider({ children }) {
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem('darkMode');
    return saved ? JSON.parse(saved) : false;
  });

  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
    if (darkMode) {
      document.documentElement.classList.add('dark-mode');
      document.documentElement.style.backgroundColor = DARK_BG;
      document.body.style.backgroundColor = DARK_BG;
    } else {
      document.documentElement.classList.remove('dark-mode');
      document.documentElement.style.backgroundColor = LIGHT_BG;
      document.body.style.backgroundColor = LIGHT_BG;
    }
  }, [darkMode]);

  const toggleDarkMode = () => setDarkMode(prev => !prev);

  return (
    <ThemeContext.Provider value={{ darkMode, toggleDarkMode }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
