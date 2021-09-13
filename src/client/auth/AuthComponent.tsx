import React, { useEffect, useState } from "react";
import {
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

  return (
    <Container>
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
              <AuthInfo />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Transition>
    </Container>
  );
};

export default AuthComponent;
