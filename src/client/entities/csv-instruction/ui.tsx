import React from "react";
import { Header, Table } from "semantic-ui-react";

export type column = {
  header: string;
  description: string | JSX.Element;
  isRequired: boolean;
};

export const CsvDataInstruction = ({
  columns,
  linkToExample,
}: {
  columns: column[];
  linkToExample: string;
}) => {
  return (
    <>
      <Header as="h3">
        Какой нужен файл
        <Header.Subheader>
          CSV табличка с 3 колонками. <br />
          <a href={linkToExample}>Пример файла</a>
        </Header.Subheader>
      </Header>
      <Table attached definition padded>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>
              <Header as="h5">Колонки</Header>
            </Table.HeaderCell>
            {columns.map(column => (
              <Table.HeaderCell key={column.header}>
                <div style={{ width: "250px" }}>{column.header}</div>
              </Table.HeaderCell>
            ))}
          </Table.Row>
        </Table.Header>
        <Table.Body>
          <Table.Row verticalAlign="top">
            <Table.Cell>Описание</Table.Cell>
            {columns.map(column => (
              <Table.Cell key={column.header}>{column.description}</Table.Cell>
            ))}
          </Table.Row>
          <Table.Row verticalAlign="top">
            <Table.Cell>Обязательно?</Table.Cell>
            {columns.map(column => (
              <Table.Cell key={column.header}>
                {column.isRequired ? "да" : "нет"}
              </Table.Cell>
            ))}
          </Table.Row>
        </Table.Body>
      </Table>
    </>
  );
};

export default CsvDataInstruction;
