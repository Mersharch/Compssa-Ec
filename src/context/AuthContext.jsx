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
      if (res.auth_error) {
        throw new Error(res.auth_error)
      }
        setUser({ email: res.user, otp: res.otp, voted:res.voted })
        setToken(res.token)
      setIsAuthenticated(true)
      return {
        success:true
      }
        
    } catch (error) {
      return {
        success: false,
        error:error.message
      }
    }
  };

  const vote = async (data) => {
    try {
      const response = await fetch('https://dcsvoting.pythonanywhere.com/api/v1/vote/',{
          method: 'POST',
          body: JSON.stringify(data),
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          }
      })
      const res = await response.json()
        console.log('res: ', res)
        setUser({ ...user, voted:true })
      return {
        success: true,
        message:res.message
      }
        
    } catch (error) {
      return {
        success: false,
        error:error.message
      }
    }
  };

  const signOut = () => {
    setIsAuthenticated(false)
    setToken('')
    setUser({})
    router.push('/')
  };
  return (
    <AuthContext.Provider value={{ isAuthenticated, signIn, signOut, token, vote }}>
      {children}
    </AuthContext.Provider>
  );
};
