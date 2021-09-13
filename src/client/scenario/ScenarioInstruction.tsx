import React from 'react'
import { Header, List, Segment } from 'semantic-ui-react'

const ScenarioInstruction = () => {
  return (
    <Segment color="yellow" raised>
      <Header as="h3">Как это работает?</Header>
      <List ordered>
        <List.Item>Авыторизуетесь в проекте</List.Item>
        <List.Item>Выбираете сценарий, кампанию и запускаете</List.Item>
        <List.Item>
          Бот войдет в нужный проект и заведет все, что нужно для стандартного
          ТЗ
        </List.Item>
        <List.Item>
          Когда бот закончит, на почту прийдет письмо со статусом по каждой
          операции
        </List.Item>
      </List>
    </Segment>
  );
}

export default ScenarioInstruction
