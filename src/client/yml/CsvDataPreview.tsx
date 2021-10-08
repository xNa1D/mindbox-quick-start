import React from "react";
import { Table } from "semantic-ui-react";
import { Link } from "src/declarations";

type CsvDataPreviewProps = {
  ymlTable: Link[];
};

const CsvDataPreview = ({ ymlTable }: CsvDataPreviewProps) => {
  return (
    <Table striped>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>areaExternalId</Table.HeaderCell>
          <Table.HeaderCell>name</Table.HeaderCell>
          <Table.HeaderCell>url</Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {ymlTable.map((row) => (
          <Table.Row>
            <Table.Cell>{row.areaExternalId}</Table.Cell>
            <Table.Cell>{row.name}</Table.Cell>
            <Table.Cell>{row.url}</Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  );
};

export default CsvDataPreview;
