import React from "react";
import { Divider, Header, List, Segment } from "semantic-ui-react";

const YmlInstructions = () => {
  return (
    <Segment color="yellow" raised>
      <Header as="h3">Как это работает:</Header>
      <List ordered>
        <List.Item>Авторизуетесь в проекте</List.Item>
        <List.Item>Создайте файл по инструкции</List.Item>
        <List.Item>
          Загрузите файл и проверьте, что все колонки заполнены
        </List.Item>
        <List.Item>
          Укажите общие настройки для фидов: внешнюю ситсемы и бренд
        </List.Item>
        <List.Item>Отправьте запрос</List.Item>
        <List.Item>
          Если чего-то нет, то напиши про это в слаке{" "}
          <a href={"https://mindbox.slack.com/archives/C01G12FQQ0Z"}>
            #mindbox-quick-start
          </a>
        </List.Item>
        
      </List>
    </Segment>
  );
};

export default YmlInstructions;
