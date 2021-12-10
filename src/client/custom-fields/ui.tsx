import React, { FormEvent } from "react";
import {
  Button,
  Container,
  Form,
  Grid,
  Header,
  Message,
  Segment,
  Table,
} from "semantic-ui-react";
import { CustomFieldObject } from "src/server/custom-fields";

const handleFormSubmit = (e: FormEvent) => {
  console.log(e);
};

const handleFileSelected = (e: FormEvent) => {
  console.log(e);
};

const ymlTable: CustomFieldObject[] = [
  {
    CustomFieldEntity: "entity",
    CustomFieldName: "name",
    CustomFieldSystemName: "sysName",
    CustomFieldValueTypes: "valueType",
    isClearable: false,
    isMultiple: false,
    isPublic: false,
  },
];

const state = {
  loading: false,
  error: "",
};

export const CustomFields = () => {
  return (
    <Container fluid>
      <Header as="h1">Импорт YML фидов</Header>
      <Grid columns={2} stackable>
        <Grid.Column width={6} style={{ maxWidth: "450px" }}>
          <Segment style={{ position: "sticky", top: "15px" }}>
            <Form onSubmit={handleFormSubmit} id="scenario">
              <Form.Field>
                <label htmlFor="csvWithYmlData">Файл с доп полями</label>
                <input
                  type="file"
                  name="csvWithYmlData"
                  id="csvWithYmlData"
                  accept=".csv"
                  required
                  onChange={handleFileSelected}
                />
              </Form.Field>

              <Button positive loading={state.loading} type="submit" primary>
                Запустить заведение доп полей
              </Button>
              <Message
                visible={state.loading}
                success
                header="Ура"
                content="Данные успешно отправлены в Mindbox"
              />
              <Message
                error
                visible={state.loading}
                content={state.error}
                header="Ошибка"
              />
            </Form>
          </Segment>
        </Grid.Column>
        <Grid.Column width={10}>
          <Table striped>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>CustomFieldEntity</Table.HeaderCell>
                <Table.HeaderCell>CustomFieldName</Table.HeaderCell>
                <Table.HeaderCell>CustomFieldSystemName</Table.HeaderCell>
                <Table.HeaderCell>CustomFieldValueTypes</Table.HeaderCell>
                <Table.HeaderCell>isClearable</Table.HeaderCell>
                <Table.HeaderCell>isMultiple</Table.HeaderCell>
                <Table.HeaderCell>isPublic</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {ymlTable.map(row => (
                <Table.Row key={row.CustomFieldSystemName}>
                  <Table.Cell>{row.CustomFieldEntity}</Table.Cell>
                  <Table.Cell>{row.CustomFieldName}</Table.Cell>
                  <Table.Cell>{row.CustomFieldSystemName}</Table.Cell>
                  <Table.Cell>{row.CustomFieldValueTypes}</Table.Cell>
                  <Table.Cell>{row.isClearable}</Table.Cell>
                  <Table.Cell>{row.isMultiple}</Table.Cell>
                  <Table.Cell>{row.isPublic}</Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        </Grid.Column>
      </Grid>
    </Container>
  );
};
