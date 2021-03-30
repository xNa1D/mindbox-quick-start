import React, { useContext, createContext, useState, useEffect } from "react";
import Cookies from "universal-cookie";
import { useHistory } from "react-router-dom";

import { loginUser, checkToken, loginUserByAdminPanel } from "client/script/api/userRequests";

import { AuthRequestBody, AuthByAdminPanelRequestBody } from "src/declarations";

type UseProviderReturnedValue = {
  isLoggedIn: boolean;
  loginErrors: string;
  project: string;
  login: (user: AuthRequestBody) => Promise<void>;
  loginByAdminPanel: (user: AuthByAdminPanelRequestBody) => Promise<void>;
  checkAuth: () => Promise<void>;
};

const initialContext: UseProviderReturnedValue = {
  isLoggedIn: false,
  loginErrors: "",
  project: "",
  login: async (user) => {},
  loginByAdminPanel: async (user) => {},
  checkAuth: async () => {},
};

export const ProvideAuth = ({ children }: any) => {
  const auth = useProvideAuth();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
};

const useProvideAuth = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginErrors, setLoginErrors] = useState("");
  const [checkTokenErrors, setCheckTokenErrors] = useState("");
  const [project, setProject] = useState("");
  const history = useHistory();

  const cookies = new Cookies();

  const login = async (user: AuthRequestBody) => {
    try {
      setLoginErrors("");
      const token = await loginUser(user);
      cookies.set("token", token.data);
      setIsLoggedIn(true);
      history.push("/scenario");      
    } catch (error) {
      
      if (error.response.data.errorMessage) {
        setLoginErrors(error.response?.data?.errorMessage);
      } else if (error.response.data) {
        setLoginErrors(error.response?.data);
      } else {
        setLoginErrors(error.toString());
      }
      setIsLoggedIn(false);
    }
  };
  const loginByAdminPanel = async (user: AuthByAdminPanelRequestBody) => {
    try {
      setLoginErrors("");
      const token = await loginUserByAdminPanel(user);
      cookies.set("token", token.data);
      setProject(user.project);
      setIsLoggedIn(true);
      history.push("/scenario");      
    } catch (error) {
      
      if (error.response.data.errorMessage) {
        setLoginErrors(error.response?.data?.errorMessage);
      } else if (error.response.data) {
        setLoginErrors(error.response?.data);
      } else {
        setLoginErrors(error.toString());
      }
      setIsLoggedIn(false);
    }
  };

  const checkAuth = async () => {
    try {
      setCheckTokenErrors("");
      const newToken = await checkToken();
      cookies.set("token", newToken.data);
      setIsLoggedIn(true);
      history.push("/scenario");      
    } catch (error) {
      setIsLoggedIn(false);
      history.push("/");      
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  return {
    isLoggedIn,
    loginErrors,
    project,
    login,
    checkAuth,
    loginByAdminPanel
  };
};

const authContext = createContext<UseProviderReturnedValue>(initialContext);

export const useAuth = () => {
  return useContext(authContext);
};

export default useAuth;
