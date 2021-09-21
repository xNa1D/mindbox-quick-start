import React from "react";
import logo from "client/images/logo.png";

const Logo = () => {
  return (
    <div style={{ maxWidth: "200px" }}>
      <img
        className="auth__logo"
        src={logo}
        alt="Логотип Mindbox Quick Start"
        style={{ width: "200px" }}
      />
    </div>
  );
};

export default Logo;
