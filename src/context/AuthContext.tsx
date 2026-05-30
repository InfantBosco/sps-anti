import { createContext, useContext, useEffect, useState, ReactNode } from 'react';

interface AuthContextProps {
  isAuthenticated: boolean;
  user: { name: string } | null;
  logout: () => void;
}

const AuthContext = createContext<AuthContextProps>({
  isAuthenticated: false,
  user: null,
  logout: () => {}
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [user, setUser] = useState<{ name: string } | null>(null);

  useEffect(() => {
    const token = localStorage.getItem('admin_token');
    const storedUser = localStorage.getItem('admin_user');
    if (token && storedUser) {
      try {
        const parsed = JSON.parse(storedUser);
        setUser({ name: parsed.name || 'Admin' });
        setIsAuthenticated(true);
      } catch (_) {
        // ignore parsing errors
      }
    }
  }, []);

  const logout = () => {
    localStorage.removeItem('admin_token');
    localStorage.removeItem('admin_user');
    setUser(null);
    setIsAuthenticated(false);
    // redirect handled by layout
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
