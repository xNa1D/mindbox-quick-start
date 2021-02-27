import React from "react";

const Registration = () => {
  return (
    <form className="ui form" id="auth__form_registration">
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
      <div className="ui error message " id="error">
        <div className="header">Такого пользователя нет</div>
        <p>
          Возможно ошибка в почте. <br /> Если ошибки нет, то напиши в слаке
          @moskalev
        </p>
      </div>

      <div className="ui success message" id="success">
        <div className="header">Зарегистрирован!</div>
        <p>
          Пароль мы отправили на почту.{" "}
          <a href="https://mail.google.com/" target="_blank">
            Проверить в gmail
          </a>
        </p>
        <p>
          Через <span id="timer">5</span>с откроется страница логина. <br />{" "}
          <a href="/">Но можно перейти прямо сейчас</a>{" "}
        </p>
      </div>
    </form>
  );
};

export default Registration;
