import React, { CSSProperties, useEffect, useState } from "react";
import {
  Accordion,
  Icon,
  Label,
  Button,
  Grid,
  Header,
  Transition,
  Container,
} from "semantic-ui-react";
import Logo from "../common/Logo";
import LoginByAdmin from "./LoginByAdmin";
import useAuth from "./useAuth";

const AuthComponent = () => {
  const auth = useAuth();

  const [isAuthShown, setIsAuthShown] = useState(false);

  useEffect(() => {
    setIsAuthShown(!auth.isLoggedIn);
  }, [auth.isLoggedIn]);

  const titleStyle: CSSProperties = {
    display: "flex",
    justifyContent: "space-between",
  };

  const accordionToggler: CSSProperties = {
    textAlign: "right",
    margin: "2rem 0",
  };

  return (
    <Container>
      <div style={titleStyle}>
        <Logo />
        <div style={accordionToggler}>
          Статус подключения к Mindbox:{" "}
          {auth.loginForProject ? (
            <>
              <Button
                color="green"
                onClick={() => setIsAuthShown(!isAuthShown)}
              >
                Авторизован в проекте: {auth.loginForProject}.mindbox.ru
              </Button>{" "}
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
            <Button color="orange" onClick={() => setIsAuthShown(!isAuthShown)}>
              Нужно авторизоваться
            </Button>
          )}
        </div>
      </div>

      {/* <Icon name="dropdown" /> */}

      <Transition
        transitionOnMount
        visible={isAuthShown}
        animation="slide down"
        duration={500}
      >
        <Grid columns={2} divided stackable>
          <Grid.Row>
            <Grid.Column>
              <LoginByAdmin />
            </Grid.Column>
            <Grid.Column>
              <Header content="Подключение к проекту" textAlign="left" />
              <p>
                Введите данные для подключения к тому проекту, на котором нужно
                развернуть операции
              </p>
              <p>Нужны: ссылка на проект, логин и пароль</p>
              <p>Логины и пароли не сохраняются</p>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Transition>
    </Container>
  );
};

export default AuthComponent;
