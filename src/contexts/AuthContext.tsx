import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import axios from 'axios';

type AppRole = 'user' | 'admin';

interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: AppRole;
}

interface Profile {
  id: string;
  userId: string;
  firstName: string;
  lastName: string;
  email: string;
  avatarUrl?: string | null;
  phone?: string | null;
}

export interface AuthContextType {
  user: User | null;
  token: string | null;
  profile: Profile | null;
  roles: AppRole[];
  isLoading: boolean;
  isAdmin: boolean;
  signIn: (email: string, password: string) => Promise<{ error: string | null }>;
  signUp: (email: string, password: string, extra: { firstName: string; lastName: string }) => Promise<{ error: string | null }>;
  signOut: () => void;
  refreshProfile: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [roles, setRoles] = useState<AppRole[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // On mount, check for token in localStorage
  useEffect(() => {
    const storedToken = localStorage.getItem('jwt_token');
    if (storedToken) {
      setToken(storedToken);
      fetchMe(storedToken);
    } else {
      setIsLoading(false);
    }
    // eslint-disable-next-line
  }, []);

  // Fetch /api/auth/me to get user info
  const fetchMe = async (jwt: string) => {
    try {
      const { data } = await axios.get('/api/auth/me', {
        headers: { Authorization: `Bearer ${jwt}` },
      });
      setUser(data.user);
      setRoles([data.user.role]);
      fetchProfileData(jwt, data.user.id);
    } catch (error) {
      setUser(null);
      setRoles([]);
      setProfile(null);
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch /api/profiles/:id to get profile info
  const fetchProfileData = async (jwt: string, userId: string) => {
    try {
      const { data } = await axios.get(`/api/profiles/${userId}`, {
        headers: { Authorization: `Bearer ${jwt}` },
      });
      setProfile(data);
    } catch (error) {
      setProfile(null);
    }
  };


  // Login
  const signIn = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const { data } = await axios.post('/api/auth/login', { email, password });
      setToken(data.token);
      localStorage.setItem('jwt_token', data.token);
      setUser(data.user);
      setRoles([data.user.role]);
      fetchProfileData(data.token, data.user.id);
      setIsLoading(false);
      return { error: null };
    } catch (error: unknown) {
      setUser(null);
      setToken(null);
      setRoles([]);
      setProfile(null);
      setIsLoading(false);
      let errMsg = 'Erreur de connexion';
      if (typeof error === 'object' && error !== null && 'response' in error && typeof (error as any).response === 'object') {
        errMsg = (error as any).response?.data?.error || errMsg;
      }
      return { error: errMsg };
    }
  };

  // Register
  const signUp = async (email: string, password: string, extra: { firstName: string; lastName: string }) => {
    setIsLoading(true);
    try {
      const { data } = await axios.post('/api/auth/register', {
        email,
        password,
        firstName: extra.firstName,
        lastName: extra.lastName
      });
      setToken(data.token);
      localStorage.setItem('jwt_token', data.token);
      setUser(data.user);
      setRoles([data.user.role]);
      fetchProfileData(data.token, data.user.id);
      setIsLoading(false);
      return { error: null };
    } catch (error: unknown) {
      setUser(null);
      setToken(null);
      setRoles([]);
      setProfile(null);
      setIsLoading(false);
      let errMsg = "Erreur d'inscription";
      if (typeof error === 'object' && error !== null && 'response' in error && typeof (error as any).response === 'object') {
        errMsg = (error as any).response?.data?.error || errMsg;
      }
      return { error: errMsg };
    }
  };

  // Logout
  const signOut = () => {
    setUser(null);
    setToken(null);
    setRoles([]);
    setProfile(null);
    localStorage.removeItem('jwt_token');
  };

  // Refresh profile
  const refreshProfile = async () => {
    if (token && user) {
      await fetchProfileData(token, user.id);
    }
  };

  const isAdmin = roles.includes('admin');

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        profile,
        roles,
        isLoading,
        isAdmin,
        signIn,
        signUp,
        signOut,
        refreshProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}


export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
