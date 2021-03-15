import React, { useState } from "react";
import { useHistory } from "react-router-dom";

import { createUser } from "client/script/api/userRequests";
import { handleEmailInput } from "client/script/helpers/inputChanges";

import "client/styles/block/form/form.css";

const Registration = () => {
  const [user, setUser] = useState({ email: "" });
  const [formError, setFormError] = useState("");
  const [isCreationSuccess, setIsCreationSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [tick, setTick] = useState(5);
  const history = useHistory();

  const tickTimer = () => {
    setInterval(() => {
      setTick((tick) => tick - 1);
    }, 1000);
  };

  const handleFormSubmit = async (event: React.SyntheticEvent) => {
    event.preventDefault();

    try {
      setIsLoading(true);
      setFormError("");
      await createUser({ email: `${user.email}@mindbox.ru` });
      setIsCreationSuccess(true);
      tickTimer();
      setTimeout(() => {
        history.push("/");
      }, 5000);
    } catch (error) {
      setFormError(error.response.data);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form
      className="ui form"
      id="auth__form_registration"
      onSubmit={handleFormSubmit}
    >
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
              required
              value={user.email}
              onChange={(event) => {
                setUser({ email: handleEmailInput(event.target.value) });
              }}
            />
            <div className="ui basic label">@mindbox.ru</div>
          </div>
          <p className="form__description">
            Пароль мы сделаем автоматически и пришлем на почту
          </p>
        </div>
      </fieldset>
      <div className="form__buttons">
        <button
          type="submit"
          className={`form__button_reg ui button basic green ${
            isLoading && "loading"
          }`}
        >
          Регистрация
        </button>
      </div>
      {formError && (
        <div className="ui error message visible" id="error">
          <div className="header">Ошибка регистрации</div>
          <p>{formError}</p>
          <p>
            Возможно ошибка в почте. <br /> Если ошибки нет, то напиши в слаке
            @moskalev
          </p>
        </div>
      )}
      {isCreationSuccess && (
        <div className="ui success message visible" id="success">
          <div className="header">Зарегистрирован!</div>
          <p>
            Пароль мы отправили на почту.{" "}
            <a href="https://mail.google.com/" target="_blank">
              Проверить в gmail
            </a>
          </p>
          <p>
            Через <span id="timer">{tick}</span>с откроется страница логина.{" "}
            <br /> <a href="/">Но можно перейти прямо сейчас</a>{" "}
          </p>
        </div>
      )}
    </form>
  );
};

export default Registration;
