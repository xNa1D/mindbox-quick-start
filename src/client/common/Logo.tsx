import React, { CSSProperties } from 'react'
import logo from "client/images/logo.png";

import 'client/styles/block/auth/auth.css'

const Logo = () => {

  const style: CSSProperties = {
    width: "200px"
  } 

  return (
    <a className="auth__link" href="/">
      <img
        className="auth__logo"
        src={logo}
        alt="Логотип Mindbox Quick Start"
        style={style}
      />
    </a>
  );
}

export default Logo
