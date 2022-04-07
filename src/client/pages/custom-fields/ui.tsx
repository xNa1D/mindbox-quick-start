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
import {
  CustomFieldObject,
  entityTypes,
  valueTypes,
} from "src/server/custom-fields";
import { parseCsv } from "client/processes/csv-to-json";
import { startCf } from "client/shared/api/startCF";

const initialFormState = {
  status: "idle",
  error: "",
};

const CustomFieldEntityDescription = () => (
  <>
    <p>Сущность, к которой создается доп поле</p>
    <p>Возможные значения:</p>
    <ul>
      {entityTypes.map(entity => (
        <li key={entity}>{entity}</li>
      ))}
    </ul>
  </>
);
const CustomFieldNameDescription = () => (
  <>
    <p>Тип данных</p>
    <p>Возможные значения:</p>
    <ul>
      {valueTypes.map(value => (
        <li key={value}>{value}</li>
      ))}
    </ul>
  </>
);

const DescriptionForBooleanFields = (text: string) => (
  <>
    <p>{text}</p>
    <p>
      Принимает:
      <br />
      <code>true / false</code>
    </p>
  </>
);

export const columns: column[] = [
  {
    header: "CustomFieldEntity",
    description: CustomFieldEntityDescription(),
    isRequired: true,
  },
  { header: "CustomFieldName", description: "Название", isRequired: true },
  {
    header: "CustomFieldSystemName",
    description: "Системное имя",
    isRequired: true,
  },
  {
    header: "CustomFieldValueTypes",
    description: CustomFieldNameDescription(),
    isRequired: true,
  },
  {
    header: "isClearable",
    description: DescriptionForBooleanFields("Очищать, если не передано"),
    isRequired: true,
  },
  {
    header: "isMultiple",
    description: DescriptionForBooleanFields("Множественное"),
    isRequired: true,
  },
  {
    header: "isPublic",
    description: DescriptionForBooleanFields("Публичное"),
    isRequired: true,
  },
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
        <Grid.Column width={5} style={{ maxWidth: "450px" }}>
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
              {/* TODO:Add email for notification about result */}
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
        <Grid.Column width={11}>
          <div
            style={{
              width: "100%",
              overflowX: "scroll",
              padding: "5px",
              WebkitOverflowScrolling: "touch",
            }}
          >
            <CsvDataInstruction columns={columns} linkToExample="" />
          </div>
        </Grid.Column>
      </Grid>

      <CfPreview columns={columns} data={data} />
    </Container>
  );
};
