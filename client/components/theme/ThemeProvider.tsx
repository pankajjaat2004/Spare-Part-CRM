import { createContext, useContext, useEffect, useState } from 'react';

type Theme = 'system';

interface ThemeContextType {
  theme: Theme;
  actualTheme: 'light' | 'dark';
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

interface ThemeProviderProps {
  children: React.ReactNode;
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  const [actualTheme, setActualTheme] = useState<'light' | 'dark'>('light');

  // Get the actual theme from system preference
  const getSystemTheme = (): 'light' | 'dark' => {
    if (typeof window !== 'undefined') {
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    return 'light';
  };

  // Update the actual theme based on system preference
  useEffect(() => {
    const updateTheme = () => {
      const systemTheme = getSystemTheme();
      setActualTheme(systemTheme);

      // Apply theme to document
      const root = document.documentElement;
      root.classList.remove('light', 'dark');
      root.classList.add(systemTheme);

      // Also set data attribute for compatibility
      root.setAttribute('data-theme', systemTheme);
    };

    // Set initial theme
    updateTheme();

    // Listen for system theme changes
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    mediaQuery.addEventListener('change', updateTheme);

    return () => mediaQuery.removeEventListener('change', updateTheme);
  }, []);

  const value: ThemeContextType = {
    theme: 'system',
    actualTheme,
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
