import React from 'react'
import { Header } from 'semantic-ui-react';

const AuthInfo = () => {
  return (
    <>
      <Header content="Подключение к проекту" textAlign="left" />
      <p>
        Введите данные для подключения к тому проекту, на котором нужно
        развернуть операции
      </p>
      <p>Нужны: ссылка на проект, логин и пароль</p>
      <p>Логины и пароли не сохраняются</p>
    </>
  );
}

export default AuthInfo
