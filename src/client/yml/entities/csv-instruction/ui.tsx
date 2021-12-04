import React from "react";
import { Header, Segment, Table } from "semantic-ui-react";

export const CsvDataInstruction = () => {
  return (
    <>
      <Header as="h3">
        Какой нужен файл
        <Header.Subheader>
          CSV табличка с 3 колонками. <br />
          <a href="https://drive.google.com/file/d/1h-Ts-lZ0FGlkRYCAFP5-uTMhcxoSViMo/view?usp=sharing">
            Пример файла
          </a>
        </Header.Subheader>
      </Header>
      <Table attached definition>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>
              <Header as="h5">Колонки</Header>
            </Table.HeaderCell>
            <Table.HeaderCell>name</Table.HeaderCell>
            <Table.HeaderCell>url</Table.HeaderCell>
            <Table.HeaderCell>areaExternalId</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          <Table.Row>
            <Table.Cell>Описание</Table.Cell>
            <Table.Cell>Название фида</Table.Cell>
            <Table.Cell>Ссылка на фид</Table.Cell>
            <Table.Cell>Внешний идентификатор зоны</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>Обязательно?</Table.Cell>
            <Table.Cell>да</Table.Cell>
            <Table.Cell>да</Table.Cell>
            <Table.Cell>нет</Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
    </>
  );
};

export default CsvDataInstruction;
