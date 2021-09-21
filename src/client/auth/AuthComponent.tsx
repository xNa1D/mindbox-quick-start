import React, { useEffect, useState } from "react";
import {
  Button,
  Grid,
  Header,
  Transition,
  Container,
  Segment,
  Message,
  Icon,
} from "semantic-ui-react";
import Logo from "../common/Logo";
import AuthInfo from "./AuthInfo";
import LoginByAdmin from "./LoginByAdmin";
import useAuth from "./useAuth";

const AuthComponent = () => {
  const auth = useAuth();

  const [isAuthShown, setIsAuthShown] = useState(false);

  useEffect(() => {
    setIsAuthShown(!auth.isLoggedIn);
  }, [auth.isLoggedIn]);

  return (
    <Container fluid>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Logo />
        <div
          style={{
            textAlign: "right",
            margin: "2rem 0",
          }}
        >
          Статус подключения к Mindbox:{" "}
          {auth.loginForProject ? (
            <>
              <Button
                color="green"
                onClick={() => setIsAuthShown(!isAuthShown)}
              >
                Авторизован в {auth.loginForProject}.mindbox.ru
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

      <div
        style={{
          position: "absolute",
          right: "16px",
          top: "90px",
          zIndex: 100,
        }}
      >
        <Transition
          transitionOnMount
          visible={isAuthShown}
          animation="scale"
          duration={500}
          unmountOnHide={true}
        >
          <>
            {/* <Grid columns={2} divided stackable>
            <Grid.Row>
              <Grid.Column>
                <LoginByAdmin />
              </Grid.Column>
              <Grid.Column>
                <AuthInfo />
              </Grid.Column>
            </Grid.Row>
          </Grid> */}
            <Segment raised padded>
              <Header>
                Подключение к проекту
                <Header.Subheader>
                  Введите URL, логин и пароль от проекта, в котором нужно
                  развернуть операции
                </Header.Subheader>
              </Header>

              <LoginByAdmin />
              <Message warning>
                <Icon name="warning" />
                Логин и пароль не сохраняются
              </Message>
            </Segment>
          </>
        </Transition>
      </div>
    </Container>
  );
};

export default AuthComponent;
