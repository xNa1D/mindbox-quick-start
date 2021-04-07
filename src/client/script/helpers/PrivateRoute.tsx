import React from 'react'
import {
  Route, 
  Redirect, 
} from "react-router-dom";

import useAuth from 'client/script/hooks/useAuth';


function PrivateRoute({ children, ...rest }:any) {
  let auth = useAuth();
  return (
    <Route
      {...rest}
      render={({ location }) =>
        auth.isLoggedIn ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/",
              state: { from: location },
            }}
          />
        )
      }
    />
  );
}

export default PrivateRoute
