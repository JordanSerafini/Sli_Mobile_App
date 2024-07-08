import React, { createContext, useContext, useState, ReactNode } from 'react';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../@types/type';
import { StackNavigationProp } from '@react-navigation/stack';

interface AuthContextType {
  isAuthenticated: boolean;
  login: () => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  const login = () => {
    setIsAuthenticated(true);
    navigation.navigate('home');
  };

  const logout = () => {
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
