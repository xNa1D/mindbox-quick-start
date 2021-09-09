import React, { CSSProperties } from "react";
import logo from "client/images/logo.png";

const Logo = () => {
  const style: CSSProperties = {
    width: "200px",
  };

  return (
    <div style={{ maxWidth: "200px" }}>
      <img
        className="auth__logo"
        src={logo}
        alt="Логотип Mindbox Quick Start"
        style={style}
      />
    </div>
  );
};

export default Logo;
