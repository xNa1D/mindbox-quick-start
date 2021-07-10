import React from "react";
import Main from "./pages/Main";
import Logo from "./components/Logo";
import { ProvideAuth } from "src/client/script/hooks/useAuth";

import "client/styles/block/main/main.css";

export default function App() {
  return (
    <ProvideAuth>
      <section className="header">
        <Logo />
      </section>
      <main className="main">
        <Main />
      </main>
    </ProvideAuth>
  );
}
