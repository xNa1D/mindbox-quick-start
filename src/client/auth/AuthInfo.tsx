import React from 'react'
import { Header } from 'semantic-ui-react';

const AuthInfo = () => {
  return (
    <>
      <Header content="Подключение к проекту" textAlign="left" />
      <p>
        Введите URL, логин и пароль от проекта, в котором нужно развернуть
        операции.
      </p>
      <p>Логин и пароль не сохраняются</p>
    </>
  );
}

export default AuthInfo
