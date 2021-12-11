import React from "react";
import { Checkbox, Table } from "semantic-ui-react";
import { CustomFieldObject } from "src/server/custom-fields";
import { column } from "src/client/entities/csv-instruction";

export const CfPreview = ({
  data, columns,
}: {
  data: CustomFieldObject[];
  columns: column[];
}) => {
  return (
    <Table striped fixed selectable>
      <Table.Header>
        <Table.Row>
          {columns.map(column => (
            <Table.HeaderCell key={column.header}>
              {column.description}
            </Table.HeaderCell>
          ))}
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {data.map(row => (
          <Table.Row key={row.CustomFieldSystemName}>
            <Table.Cell>{row.CustomFieldEntity}</Table.Cell>
            <Table.Cell>{row.CustomFieldName}</Table.Cell>
            <Table.Cell>{row.CustomFieldSystemName}</Table.Cell>
            <Table.Cell>{row.CustomFieldValueTypes}</Table.Cell>
            <Table.Cell>
              <Checkbox checked={row.isClearable} />
            </Table.Cell>
            <Table.Cell>
              <Checkbox checked={row.isMultiple} />
            </Table.Cell>
            <Table.Cell>
              <Checkbox checked={row.isPublic} />
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  );
};
