import React, { createContext, useContext, useState, ReactNode } from 'react';
import { DEMO_USER, DEMO_DRIVER_USER } from '../data/demo';

export type UserRole = 'customer' | 'driver' | 'admin' | null;

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: string;
  avatar: string;
  joinDate: string;
  [key: string]: unknown;
}

interface AuthContextType {
  user: AuthUser | null;
  role: UserRole;
  isAuthenticated: boolean;
  signIn: (email: string, password: string, role: UserRole) => Promise<{ success: boolean; error?: string }>;
  signOut: () => void;
  register: (name: string, email: string, password: string, phone: string, role: UserRole) => Promise<{ success: boolean; error?: string }>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [role, setRole] = useState<UserRole>(null);

  const signIn = async (email: string, _password: string, selectedRole: UserRole): Promise<{ success: boolean; error?: string }> => {
    // Demo authentication — replace with real API call when backend is configured
    await new Promise((r) => setTimeout(r, 800));

    if (!email || !_password) {
      return { success: false, error: 'Please enter your email and password.' };
    }

    if (selectedRole === 'driver') {
      setUser(DEMO_DRIVER_USER as AuthUser);
      setRole('driver');
    } else if (selectedRole === 'admin') {
      setUser({ ...DEMO_USER, role: 'admin', name: 'Admin User', avatar: 'AD' });
      setRole('admin');
    } else {
      setUser(DEMO_USER as AuthUser);
      setRole('customer');
    }
    return { success: true };
  };

  const signOut = () => {
    setUser(null);
    setRole(null);
  };

  const register = async (name: string, email: string, _password: string, phone: string, selectedRole: UserRole): Promise<{ success: boolean; error?: string }> => {
    await new Promise((r) => setTimeout(r, 1000));
    if (!name || !email || !phone) {
      return { success: false, error: 'Please fill all required fields.' };
    }
    const newUser: AuthUser = {
      id: 'u_new',
      name,
      email,
      phone,
      role: selectedRole || 'customer',
      avatar: name.split(' ').map((n) => n[0]).join('').toUpperCase().slice(0, 2),
      joinDate: new Date().toISOString().split('T')[0],
    };
    setUser(newUser);
    setRole(selectedRole);
    return { success: true };
  };

  return (
    <AuthContext.Provider value={{ user, role, isAuthenticated: !!user, signIn, signOut, register }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
