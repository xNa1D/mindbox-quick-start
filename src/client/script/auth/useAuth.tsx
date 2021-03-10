import React, { useContext, createContext, useState } from "react";

import { loginUser, checkToken } from "client/script/api/userRequests";

import { AuthRequestBody } from "src/declarations";

export const ProvideAuth = ({ children }: any) => {
  const auth = useProvideAuth();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
};

export const useAuth = () => {
  return useContext(authContext);
};

const useProvideAuth = () => {
  const [token, setToken] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginErrors, setLoginErrors] = useState({});

  const login = async (user: AuthRequestBody) => {
    try {
      const token = await loginUser(user);
      setToken(token.data);
      setIsLoggedIn(true);
    } catch (error) {
      setLoginErrors(error.toString());
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

const authContext = createContext(useProvideAuth());

export default useAuth;
