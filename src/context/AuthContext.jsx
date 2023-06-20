"use client";
import { useRouter } from "next/navigation";
import { createContext, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [token, setToken] = useState("");
  const router = useRouter()
  const signIn = async (data) => {
    try {
      const response = await fetch('https://dcsvoting.pythonanywhere.com/api/v1/login/',{
          method: 'POST',
          body: JSON.stringify(data),
          headers: {
              'Content-Type': 'application/json'
          }
      })
      const res = await response.json()
      console.log('type: ', typeof res)
        console.log('res: ', res)
        setUser({ email: res.user, otp: res.otp, voted:res.voted })
        setToken(res.token)
      setIsAuthenticated(true)
        
    } catch (error) {
      console.log(error);
    }
  };
  const signOut = () => {
    setIsAuthenticated(false)
    setToken('')
    setUser({})
    router.push('/')
  };
  return (
    <AuthContext.Provider value={{ isAuthenticated, signIn, signOut, token }}>
      {children}
    </AuthContext.Provider>
  );
};
