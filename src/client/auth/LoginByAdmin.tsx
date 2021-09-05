import React, { useState } from "react";
import { Button, Checkbox, Form, Input } from "semantic-ui-react";
import useAuth from "./useAuth";
import { handleProjectNameInput } from "./inputChanges";

import { AuthRequestBody } from "src/declarations";

const LoginByAdmin = () => {
  const initialUser: AuthRequestBody = {
    email: "",
    password: "",
    project: "",
  };

  const auth = useAuth();
  const [user, setUser] = useState(initialUser);
  const [isLoading, setIsLoading] = useState(false);

  const handleLoginFromSubmit = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    setIsLoading(true);
    await auth.login(user, true);
    setIsLoading(false);
  };

  return (
    <Form onSubmit={handleLoginFromSubmit}>
      <Form.Field>
        <label htmlFor="project">
          Системное имя проекта
          <Input
            required
            label={{ basic: true, content: ".mindbox.ru" }}
            labelPosition="right"
            placeholder="Домен проекта"
            name="project"
            id="project"
            onChange={(event) =>
              setUser({
                ...user,
                project: handleProjectNameInput(event.target.value),
              })
            }
          />
        </label>
        <p className="form__description">
          Можно вставить ссылку прямо вот так:{" "}
          <i>https://demo-new.mindbox.ru/</i>, она подрежится сама
        </p>
      </Form.Field>
      <Form.Group widths={2}>
        <Form.Field>
          <label>
            Логин
            <Input
              placeholder="Логин от проекта"
              name="login"
              id="login"
              onChange={(event) =>
                setUser({
                  ...user,
                  email: event.target.value.trim(),
                })
              }
            />
          </label>
        </Form.Field>
        <Form.Field>
          <label>
            Пароль
            <Input
              name="password"
              id="password"
              required
              placeholder="Пароль от проекта"
              onChange={(event) =>
                setUser({ ...user, password: event.target.value })
              }
              type="password"
            />
          </label>
        </Form.Field>
      </Form.Group>

      <fieldset className="form__input-container">
        <div className="form__buttons">
          <Button positive type="submit" loading={isLoading} id="submit">
            Войти
          </Button>
        </div>
      </fieldset>
      {auth.loginErrors && (
        <div className="ui error message visible" id="error">
          <div className="header">Ошибка входа</div>
          <p>{auth.loginErrors}</p>
        </div>
      )}
    </Form>
  );
};

export default LoginByAdmin;
