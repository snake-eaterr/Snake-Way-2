import { useState, useContext, useEffect, createContext } from 'react';
import { useApolloClient } from '@apollo/client';
import { useRouter } from 'next/router';


interface Auth {
  isAuthenticated: boolean;
  isLoading: boolean;
  logout?: () => void;
  logIn?: (arg0: string) => void;
}

const initialAuth: Auth = {
  isAuthenticated: false,
  isLoading: true
}
const AuthContext = createContext<Auth>(
  initialAuth
);



function AuthProvider({ children }: { children: React.ReactElement[] }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  
  const client = useApolloClient();
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('snake-way-2');
    if(!(token === null || token === 'undefined')) {
      setIsAuthenticated(true)
    }

    setIsLoading(false);
  }, [])

  const logout = () => {
    localStorage.removeItem('snake-way-2');
    setIsAuthenticated(false);
    setIsLoading(true);
    client.resetStore();
    router.push('/');
    
  }

  const logIn = (token: string) => {
    setIsAuthenticated(true);
    setIsLoading(false);
    localStorage.setItem('snake-way-2', token);
    router.push('/');
  }

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        isLoading,
        logIn,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

const useAuth = () => useContext(AuthContext);

export { AuthProvider, useAuth };