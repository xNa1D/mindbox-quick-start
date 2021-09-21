import React, { useContext, createContext, useState, useEffect } from "react";
import Cookies from "universal-cookie";
import { useHistory } from "react-router-dom";

import { loginUser, checkToken, loginUserByAdminPanel } from "src/client/api/userRequests";

import { AuthRequestBody, UseProviderReturnedValue } from "src/declarations";


const initialContext: UseProviderReturnedValue = {
  isLoggedIn: false,
  loginErrors: "",
  loginForProject: "",
  login: async (user) => {},
  checkAuth: async () => {},
};

export const ProvideAuth = ({ children }: any) => {
  const auth = useProvideAuth();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
};

const useProvideAuth = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginErrors, setLoginErrors] = useState("");
  const [loginForProject, setLoginForProject] = useState("");
  const [checkTokenErrors, setCheckTokenErrors] = useState("");
  const [project, setProject] = useState("");
  const history = useHistory();

  const cookies = new Cookies();

  const login = async (user: AuthRequestBody, isLoginByAdmin: boolean) => {
    try {
      setLoginErrors("");
      const token = await loginUser(user, isLoginByAdmin);
      cookies.set("token", token.data);
      if (isLoginByAdmin) {
        setLoginForProject(user.project);
      }
      setIsLoggedIn(true);
    } catch (error) {
      setIsLoggedIn(false);
      let errorText;
      // @ts-ignore
      if (error.response.data.errorMessage) {
        // @ts-ignore
        errorText = error.response?.data?.errorMessage;
        // @ts-ignore
      } else if (error.response.data) {
        // @ts-ignore
        errorText = error.response?.data;
      } else {
        // @ts-ignore
        errorText = error.toString();
      }
      setLoginErrors(errorText);
    }
  };
  const checkAuth = async () => {
    try {
      setCheckTokenErrors("");
      const newToken = await checkToken();
      setLoginForProject(newToken.data);
      setIsLoggedIn(true);
    } catch (error) {
      setLoginForProject("");
      setIsLoggedIn(false);
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  return {
    isLoggedIn,
    loginErrors,
    loginForProject,
    login,
    checkAuth,
  };
};

const authContext = createContext<UseProviderReturnedValue>(initialContext);

export const useAuth = () => {
  return useContext(authContext);
};

export default useAuth;
