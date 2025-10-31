import React, { createContext, useState, useEffect, useContext } from 'react';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'light');

  useEffect(() => {
    document.body.className = `theme-${theme}`;
    localStorage.setItem('theme', theme);
  }, [theme]);

  const updateTheme = (newTheme) => {
    const validThemes = ['light', 'dark', 'orange', 'purple', 'green'];
    if (validThemes.includes(newTheme)) {
      setTheme(newTheme);
    } else {
      console.warn(`Invalid theme: ${newTheme}. Falling back to default.`);
      setTheme('light');
    }
  };

  return (
    <ThemeContext.Provider value={{ theme, updateTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);