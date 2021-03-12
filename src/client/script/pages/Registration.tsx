import React, { useState } from "react";
import { Redirect } from "react-router-dom";

import { createUser } from "client/script/api/userRequests";
import { handleEmailInput } from "client/script/helpers/inputChanges";

const Registration = () => {
  const [user, setUser] = useState({ email: "" });
  const [formError, setFormError] = useState("");
  const [isCreationSuccess, setIsCreationSuccess] = useState(false);
  const [tick, setTick] = useState(5);

  const tickTimer = () => {
    setInterval(() => setTick(tick - 1), 100);
  };

  
  const handleFormSubmit = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    
    try {
      await createUser(user);
      setIsCreationSuccess(true);
      tickTimer();
      setTimeout(() => <Redirect to="/" />, 500);
    } catch (error) {
      setFormError(error.data);
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
          className="form__button_reg ui button basic green"
        >
          Регистрация
        </button>
      </div>
      {formError && (
        <div className="ui error message " id="error">
          <div className="header">Ошибка регистрации</div>
          <p>{formError}</p>
          <p>
            Возможно ошибка в почте. <br /> Если ошибки нет, то напиши в слаке
            @moskalev
          </p>
        </div>
      )}
      {isCreationSuccess && (
        <div className="ui success message" id="success">
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
