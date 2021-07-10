import React, { useState, useEffect } from "react";

import { Accordion, Icon, Label, Button } from "semantic-ui-react";

import LoginByAdmin from "client/script/components/LoginByAdmin";
import ScenarioForm from "client/script/components/ScenarioForm";

import useAuth from "client/script/hooks/useAuth";

import "client/styles/block/form/form.css";

const Main = () => {
  const auth = useAuth();

  const [isAuthShown, setIsAuthShown] = useState(false);

  useEffect(() => {
    setIsAuthShown(!auth.isLoggedIn);
  }, [auth.isLoggedIn]);

  return (
    <>
      <Accordion>
        <Accordion.Title
          active={isAuthShown}
          index={0}
          onClick={() => setIsAuthShown(!isAuthShown)}
        >
          <Icon name="dropdown" />
          {auth.loginForProject ? (
            <>
              <Label color="green">
                Авторизован в проекте: {auth.loginForProject}.mindbox.ru
              </Label>{" "}
              <Button
                basic
                size="mini"
                onClick={() => {
                  document.cookie = "token=";
                  auth.checkAuth();
                }}
              >
                Сменить проект
              </Button>
            </>
          ) : (
            <Label color="orange">Нужно авторизоваться</Label>
          )}
        </Accordion.Title>
        <Accordion.Content active={isAuthShown}>
          <LoginByAdmin />
        </Accordion.Content>
      </Accordion>

      <ScenarioForm />
    </>
  );
};

export default Main;
