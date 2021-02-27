import React from "react";

const Login = () => {
  return (
    <form className="ui form" id="auth__form">
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
            required
          />
        </div>
      </fieldset>
      <fieldset className="form__input-container">
        <div className="form__buttons">
          <button
            type="submit"
            className="form__button_login ui button basic green"
            id="submit"
          >
            Войти
          </button>
          <a
            href="./reg.html"
            className="form__button_reg ui button basic black"
          >
            Регистрация
          </a>
        </div>
      </fieldset>

      <div className="ui error message " id="error">
        <div className="header">Неправильный логин или пароль</div>
        <p>
          Можешь получить новый пароль{" "}
          <a href="/registration">на странице регистрации</a>
        </p>
      </div>
    </form>
  );
};

export default Login;
