import React from 'react'
import logo from "../../images/logo.png";

const Logo = () => {
  return (
    <a className="auth__link" href="/">
      <img
        className="auth__logo"
        src={logo}
        alt="Логотип Mindbox Quick Start"
      />
    </a>
  );
}

export default Logo
