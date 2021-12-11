import React, { FormEvent, useState } from "react";
import {
  Button,
  Checkbox,
  Container,
  Form,
  Grid,
  Header,
  Message,
  Segment,
  Table,
} from "semantic-ui-react";
import { CustomFieldObject } from "src/server/custom-fields";
import { startCf } from "../../shared/api/startCF";
import { parseCsv } from "../../shared/csv-to-json";

const initialFormState = {
  status: "idle",
  error: "",
};

export const CustomFields = () => {
  const [data, setData] = useState<CustomFieldObject[]>([]);
  const [formState, setFormState] = useState(initialFormState);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const [file] = Array.from(event.target.files);

      parseCsv<CustomFieldObject[]>(file, setData);
    }
  };

  const handleFormSubmit = async (event: FormEvent) => {
    event.preventDefault();

    try {
      if (data) {
        setFormState({
          status: "sending",
          error: "",
        });
        await startCf(data);
        setFormState({
          status: "sent",
          error: "",
        });
      } else {
        throw new Error("CSV was not provided");
      }
    } catch (error) {
      let message = "Ошибка при отправке данных";
      if (error instanceof Error) {
        message = error.message;
      }
      setFormState({
        status: "error",
        error: message,
      });
    }
  };

  return (
    <Container fluid>
      <Header as="h1">Заведение дополнительных полей по списку</Header>
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
                  onChange={handleFileChange}
                />
              </Form.Field>

              <Button
                positive
                loading={formState.status === "sending"}
                type="submit"
                primary
              >
                Запустить заведение доп полей
              </Button>
              <Message
                visible={formState.status === "sent"}
                success
                header="Ура"
                content="Данные успешно отправлены в Mindbox"
              />
              <Message
                error
                visible={formState.status === "error"}
                content={formState.error}
                header="Ошибка"
              />
            </Form>
          </Segment>
        </Grid.Column>
        <Grid.Column width={10}>
          <Table striped fixed selectable>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Сущность</Table.HeaderCell>
                <Table.HeaderCell>Название</Table.HeaderCell>
                <Table.HeaderCell>Системное имя</Table.HeaderCell>
                <Table.HeaderCell>Тип данных</Table.HeaderCell>
                <Table.HeaderCell>Очищать, если не передано</Table.HeaderCell>
                <Table.HeaderCell>Множественное</Table.HeaderCell>
                <Table.HeaderCell>Публичное</Table.HeaderCell>
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
        </Grid.Column>
      </Grid>
    </Container>
  );
};
