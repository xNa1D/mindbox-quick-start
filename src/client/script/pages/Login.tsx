import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";

import useAuth from "client/script/hooks/useAuth";

import { AuthRequestBody } from "src/declarations";
import { handleEmailInput } from "client/script/helpers/inputChanges";

import "client/styles/block/form/form.css";

const Login = () => {
  const initialUser: AuthRequestBody = {
    email: "",
    password: "",
  };

  const auth = useAuth();
  const [user, setUser] = useState(initialUser);
  const [isLoading, setIsLoading] = useState(false);

  const handleLoginFromSubmit = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    setIsLoading(true);
    await auth.login({ ...user, email: `${user.email}@mindbox.ru` });
    setIsLoading(false);
  };

  return (
    <form className="ui form" id="auth__form" onSubmit={handleLoginFromSubmit}>
      <fieldset className="field form__input-container">
        <div className="fluid field">
          <label htmlFor="email" className="form__label">
            Логин
          </label>
          <div className="ui right labeled input">
            <input
              type="text"
              className="form__login"
              id="email"
              name="email"
              value={user.email}
              required
              onChange={(event) =>
                setUser({
                  ...user,
                  email: handleEmailInput(event.target.value),
                })
              }
            />
            <div className="ui basic label">@mindbox.ru</div>
          </div>
        </div>
      </fieldset>
      <fieldset className="field form__input-container">
        <div className="fluid field">
          <label htmlFor="password" className="form__label form__label_pass">
            Пароль
          </label>
          <input
            type="password"
            className="form__password"
            id="password"
            name="password"
            value={user.password}
            required
            onChange={(event) =>
              setUser({ ...user, password: event.target.value })
            }
          />
        </div>
      </fieldset>
      <fieldset className="form__input-container">
        <div className="form__buttons">
          <button
            type="submit"
            className={`form__button_login ui button basic green ${
              isLoading && "loading"
            }`}
            id="submit"
          >
            Войти
          </button>
          <Link
            className="form__button_reg ui button basic black"
            to="/registration"
          >
            Регистрация
          </Link>
        </div>
      </fieldset>
      {auth.loginErrors && (
        <div className="ui error message visible" id="error">
          <div className="header">Ошибка входа</div>
          <p>{auth.loginErrors}</p>
        </div>
      )}
    </form>
  );
};

export default Login;
