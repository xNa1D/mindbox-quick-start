import React from "react";
import useAuth from "client/script/hooks/useAuth";

const MockConsumer = () => {
  const auth = useAuth();
  return (
    <div>
      <p>Auth: {auth.isLoggedIn.toString()}</p>
      <button onClick={() => auth.login({ email: "test", password: "test" }, false)}>
        Login
      </button>
      <button onClick={() => auth.checkAuth()}>Check</button>
      <p>Errors: {auth.loginErrors}</p>
    </div>
  );
};

export default MockConsumer;
