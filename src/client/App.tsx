import React from "react";
import Main from "./Main";
import { ProvideAuth } from "./processes/auth/useAuth";

export default function App() {
  return (
    <ProvideAuth>
      <Main />
    </ProvideAuth>
  );
}
