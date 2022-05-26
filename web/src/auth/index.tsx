import React, { useState, useEffect, createContext } from "react";

interface AuthProps {
  userData?: {
    user?: {
      id?: string;
      email?: string;
      first_name?: string;
      last_name: string;
      rules: string;
    };
    token?: string;
  };
  isAuthenticated?: boolean;
}

export const Auth = createContext<AuthProps>({
  userData: {
    user: {
      id: "",
      email: "",
      first_name: "",
      last_name: "",
      rules: "",
    },
    token: "",
  },
  isAuthenticated: false,
});

export const AuthProvider = ({ children, token, user }: any) => {
  const [isAuthenticated, setAuthenticated] = useState(false);
  const [userData, setUserData] = useState({});
  useEffect(() => {
    if (token && user) {
      setUserData({ token, user });
      setAuthenticated(!isAuthenticated);
    }
  }, []);
  //   console.log(router.pathname);
  return (
    <Auth.Provider value={{ userData, isAuthenticated }}>
      {children}
    </Auth.Provider>
  );
};
