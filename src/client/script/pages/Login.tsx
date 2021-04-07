import React, { useState } from "react";

import { Tab } from "semantic-ui-react";

import LoginByAdmin from "client/script/components/LoginByAdmin";
import LoginClassic from "client/script/components/LoginClassic";

const panes = [
  {
    menuItem: "Авторизация (legacy)",
    render: () => (
      <Tab.Pane>
        <LoginClassic />
      </Tab.Pane>
    ),
  },
  {
    menuItem: "Авторизация через проект",
    render: () => (
      <Tab.Pane>
        <LoginByAdmin />
      </Tab.Pane>
    ),
  },
];

const TabExampleBasic = () => (
  <div className="auth">
    <Tab panes={panes} />
  </div>
);

export default TabExampleBasic;
