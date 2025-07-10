import React, { createContext, useContext, useState, ReactNode } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'user' | 'driver' | 'admin';
  phone?: string;
  rating?: number;
  vehicleType?: string;
  vehicleId?: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string, role: string) => Promise<boolean>;
  logout: () => void;
  updateProfile: (updates: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  const login = async (email: string, password: string, role: string): Promise<boolean> => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Mock user data based on role
    const mockUser: User = {
      id: `${role}-${Date.now()}`,
      name: role === 'user' ? 'Juan Pérez' : role === 'driver' ? 'Carlos Mendoza' : 'Admin System',
      email,
      role: role as 'user' | 'driver' | 'admin',
      phone: '+51 999 888 777',
      rating: role === 'driver' ? 4.8 : role === 'user' ? 4.5 : undefined,
      vehicleType: role === 'driver' ? 'sedan' : undefined,
      vehicleId: role === 'driver' ? 'ABC-123' : undefined
    };

    setUser(mockUser);
    return true;
  };

  const logout = () => {
    setUser(null);
  };

  const updateProfile = (updates: Partial<User>) => {
    if (user) {
      setUser({ ...user, ...updates });
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, updateProfile }}>
      {children}
    </AuthContext.Provider>
  );
};