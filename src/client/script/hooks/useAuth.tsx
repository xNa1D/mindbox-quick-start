import React, { useContext, createContext, useState, useEffect } from "react";
import { useCookies } from "react-cookie";

import { loginUser, checkToken } from "client/script/api/userRequests";

import { AuthRequestBody } from "src/declarations";

type UseProviderReturnedValue = {
  isLoggedIn: boolean;
  token: string;
  loginErrors: string;
  login: (user: AuthRequestBody) => Promise<void>;
  checkAuth: () => Promise<void>;
};

const initialContext: UseProviderReturnedValue = {
  isLoggedIn: false,
  token: "",
  loginErrors: "",
  login: async (user) => {},
  checkAuth: async () => {},
};

export const ProvideAuth = ({ children }: any) => {
  const auth = useProvideAuth();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
};

const useProvideAuth = () => {
  const [token, setToken] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginErrors, setLoginErrors] = useState("");
  const [cookies, setCookie] = useCookies(["token"]);

  const login = async (user: AuthRequestBody) => {
    try {
      const token = await loginUser(user);
      setCookie("token", token.data);
      setToken(token.data);
      setIsLoggedIn(true); 
    } catch (error) {
      console.log(error.response.data);
      if (error.response.data.errorMessage) {
        setLoginErrors(error.response.data.errorMessage);
      } else if (error.response.data) {
        setLoginErrors(error.response.data);
      } else {
        setLoginErrors(error.toString());
      }
      setIsLoggedIn(false);
      throw error; 
    }

  };

  const checkAuth = async () => {
    // TODO: add extra state for checkToken errors 
    try {
      const newToken = await checkToken();
      setToken(newToken.data);
      setIsLoggedIn(true);
    } catch (error) {
      if (error.response.data.errorMessage) {
        setLoginErrors(error.response.data.errorMessage);
      } else if (error.response.data) {
        setLoginErrors(error.response.data);
      } else {
        setLoginErrors(error.toString());
      }
      setIsLoggedIn(false);
      throw error; 
    }
  };

  useEffect(() => {
    checkAuth() 
  }, [])

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
