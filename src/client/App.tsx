import React from "react";
import Main from "./Main";
import Logo from "./common/Logo";
import { ProvideAuth } from "./auth/useAuth";

import "client/styles/block/main/main.css";

export default function App() {
  return (
    <ProvideAuth>
      <Main />
    </ProvideAuth>
  );
}
