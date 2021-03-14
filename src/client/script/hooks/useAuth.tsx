import React, { useContext, createContext, useState, useEffect } from "react";
import { useCookies } from "react-cookie";

import { loginUser, checkToken } from "client/script/api/userRequests";

import { AuthRequestBody } from "src/declarations";

type UseProviderReturnedValue = {
  isLoggedIn: boolean;
  token: string;
  loginErrors: string;
  login: (user: AuthRequestBody) => Promise<true | undefined>;
  checkAuth: () => Promise<void>;
};

const initialContext: UseProviderReturnedValue = {
  isLoggedIn: false,
  token: "",
  loginErrors: "",
  login: async (user) => Promise.resolve(true),
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

      return true;
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
    }
  };

  const checkAuth = async () => {
    try {
      const newToken = await checkToken();
      setToken(newToken.data);
      setIsLoggedIn(true);
    } catch (error) {
      setIsLoggedIn(false);
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
