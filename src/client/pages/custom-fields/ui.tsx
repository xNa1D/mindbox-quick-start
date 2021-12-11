import { CfPreview } from "client/entities/cf-preview/";
import React, { FormEvent, useState } from "react";
import {
  Button,
  Container,
  Form,
  Grid,
  Header,
  Message,
  Segment,
} from "semantic-ui-react";
import {
  column,
  CsvDataInstruction,
} from "src/client/entities/csv-instruction";
import { CustomFieldObject } from "src/server/custom-fields";
import { parseCsv } from "client/processes/csv-to-json";
import { startCf } from "client/shared/api/startCF";

const initialFormState = {
  status: "idle",
  error: "",
};

const columns: column[] = [
  { header: "CustomFieldEntity", description: "Сущность", isRequired: true },
  { header: "CustomFieldName", description: "Название", isRequired: true },
  {
    header: "CustomFieldSystemName",
    description: "Системное имя",
    isRequired: true,
  },
  {
    header: "CustomFieldValueTypes",
    description: "Тип данных",
    isRequired: true,
  },
  {
    header: "isClearable",
    description: "Очищать, если не передано",
    isRequired: true,
  },
  { header: "isMultiple", description: "Множественное", isRequired: true },
  { header: "isPublic", description: "Публичное", isRequired: true },
];

export const CustomFields = () => {
  const [data, setData] = useState<CustomFieldObject[]>([]);
  const [formState, setFormState] = useState(initialFormState);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const [file] = Array.from(event.target.files);

      parseCsv<CustomFieldObject[]>(file).then(setData);
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
                <label htmlFor="csv">Файл с доп полями</label>
                <input
                  type="file"
                  name="csv"
                  id="csv"
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
          <CsvDataInstruction columns={columns} linkToExample="" />
        </Grid.Column>
      </Grid>
      <Grid columns={1} stackable>
        <CfPreview columns={columns} data={data} />
      </Grid>
    </Container>
  );
};
