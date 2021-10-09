import React from "react";
import { Header, Message, Table } from "semantic-ui-react";
import { Link } from "src/declarations";

type CsvDataPreviewProps = {
  ymlTable: Link[];
};

const CsvDataPreview = ({ ymlTable }: CsvDataPreviewProps) => {
  return (
    <>
      <Header as="h3">Загруженные данные</Header>
      <Message
        warning
        icon="warning circle"
        header="Проверьте данные"
        content="Колонки name и url должны быть заполнены. Если пустые, значит неправильный заголовок в таблице. Нажо поправить и загрузить заново"
      />
      <Table striped>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>name</Table.HeaderCell>
            <Table.HeaderCell>url</Table.HeaderCell>
            <Table.HeaderCell>areaExternalId</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {ymlTable.map((row) => (
            <Table.Row key={`${row.name}-${row.url}`}>
              <Table.Cell>{row.name}</Table.Cell>
              <Table.Cell>{row.url}</Table.Cell>
              <Table.Cell>{row.areaExternalId}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </>
  );
};

export default CsvDataPreview;
