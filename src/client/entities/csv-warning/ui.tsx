import React from "react";
import { Message } from "semantic-ui-react";

export const CsvWarning = () => {
  return (
    <Message warning>
      <b>ИМПОРТ ПЕРЕЗАТЕРАЕТ СТАРЫЕ ДАННЫЕ</b>
      <p>
        Если у вас сейчас что-то уже настроено в проекте, то импорт перезатрет
        эти настройки. Увы, пока так. Старые настройки надо будет восстановить
        руками после импорта
      </p>
    </Message>
  );
};
