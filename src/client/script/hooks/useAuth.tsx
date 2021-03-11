import React, { useContext, createContext, useState } from "react";

import { loginUser, checkToken } from "client/script/api/userRequests";

import { AuthRequestBody } from "src/declarations";

type UseProviderReturnedValue = {
  isLoggedIn: boolean;
  token: string;
  loginErrors: string
  login: (user: AuthRequestBody) => Promise<void>
  checkAuth: () => Promise<void>
}

const initialContext:UseProviderReturnedValue = {
  isLoggedIn: false,
  token: '',
  loginErrors: "",
  login: async (user) => {},
  checkAuth: async () => {},
}

export const ProvideAuth = ({ children }: any) => {
  const auth = useProvideAuth();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
};



const useProvideAuth = () => {
  const [token, setToken] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginErrors, setLoginErrors] = useState("");

  const login = async (user: AuthRequestBody) => {
    try {
      const token = await loginUser(user);
      setToken(token.data);
      setIsLoggedIn(true);
    } catch (error) {     
      setLoginErrors( error.data);
      setIsLoggedIn(false);
    }
  };

  const checkAuth = async () => {
    try {
      const newToken = await checkToken(token);
      setToken(newToken.data);
      setIsLoggedIn(true);
    } catch (error) {
      setIsLoggedIn(false);
    }
  };

  return {
    isLoggedIn,
    token,
    loginErrors,
    login,
    checkAuth,
  };
};

const authContext = createContext<UseProviderReturnedValue>(initialContext);

export const useAuth = () => {
  return useContext(authContext);
};

export default useAuth;
