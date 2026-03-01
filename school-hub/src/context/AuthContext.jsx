import { createContext, useContext, useState, useEffect } from "react";
import api, { setAxiosToken } from "../api/axios";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [accessToken, setAccessToken] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await api.get("/users/auth/refresh");

        if (res.data?.accessToken) {
          setAccessToken(res.data.accessToken);
          setAxiosToken(res.data.accessToken);
          setUser(res.data.user);
        }
      } catch (err) {
        setAccessToken(null);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        accessToken,
        setAccessToken,
        user,
        setUser,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);