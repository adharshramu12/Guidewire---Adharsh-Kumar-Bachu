import { useState, useEffect, createContext, useContext } from 'react';
import { authApi } from '../utils/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedUser = localStorage.getItem('gs_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  const login = async (phone, otp) => {
    const { data } = await authApi.verifyOtp(phone, otp);
    if (data.success) {
      localStorage.setItem('gs_user', JSON.stringify(data.worker));
      setUser(data.worker);
      return data.worker;
    }
    throw new Error(data.message || 'Login failed');
  };

  const logout = () => {
    localStorage.removeItem('gs_user');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
