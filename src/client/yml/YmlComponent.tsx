import React, { FormEvent, useState } from "react";
import {
  Button,
  Container,
  Divider,
  Form,
  Grid,
  Header,
  Label,
  List,
  Message,
  Segment,
  Table,
} from "semantic-ui-react";
import Papa, { ParseResult } from "papaparse";
import axios from "axios";

import { YmlRequestType, Link, Settings, AuthParams } from "src/declarations";
import YmlInstructions from "./YmlInstructions";

const YmlComponent = () => {
  const [ymlTable, setYmlTable] = useState<Link[]>();

  const [ymlSettings, setYmlSettings] = useState<Settings>({
    brand: "",
    externalSystem: "",
    launchPeriod: 2,
  });

  const [authParams, setAuthParams] = useState<AuthParams>();

  const [isSentSuccessfully, setIsSentSuccessfully] = useState<boolean>();
  const [errorsWithSending, setErrorsWithSending] = useState<string>("");
  const [isSending, setIsSending] = useState<boolean>();

  const handleCompleteOfParsing = (results: ParseResult<Link>) => {
    setYmlTable(results.data);
    console.log(results.data);
  };

  const sendData = async (data: YmlRequestType) =>
    await axios.post("/api/yml/start", data, {
      headers: { "content-type": "application/json" },
    });

  const findRowsWithIncorrectFields = (links: Link[]) =>
    links.filter((link) => link.name === undefined || link.url === undefined);

  const validateCsv = (links: Link[]) => {
    if (findRowsWithIncorrectFields(links).length > 0) {
      throw new Error("Загружен некорректный файл");
    }
  };

  const handleFormSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      if (ymlTable) {
        setIsSending(true);
        validateCsv(ymlTable);
        console.log(ymlTable);

        const data: YmlRequestType = {
          links: ymlTable,
          settings: ymlSettings,
          authParams,
        };
        await sendData(data);
        setIsSentSuccessfully(true);
      }
    } catch (error) {
      if (error instanceof Error) {
        setErrorsWithSending(error.message);
      }
      setIsSentSuccessfully(false);
    } finally {
      setIsSending(false);
    }
  };

  const handleSettingsChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ): void => {
    switch (e.target.name) {
      case "brand":
        setYmlSettings({
          ...ymlSettings,
          brand: e.target.value,
        });
        break;
      case "externalSystem":
        setYmlSettings({
          ...ymlSettings,
          externalSystem: e.target.value,
        });
        break;
      case "launchPeriod":
        setYmlSettings({
          ...ymlSettings,
          launchPeriod: +e.target.value,
        });
        break;

      default:
        break;
    }
  };

  const handleFileSelected = (e: React.ChangeEvent<HTMLInputElement>): void => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      Papa.parse(files[0], {
        complete: handleCompleteOfParsing,
        header: true,
      });
    }
  };

  return (
    <Container fluid>
      <Header as="h1">Импорт YML фидов</Header>
      <Grid columns={2} stackable>
        <Grid.Column width={6} style={{ maxWidth: "450px" }}>
          <Segment style={{ position: "sticky", top: "15px" }}>
            <>
              <Form onSubmit={handleFormSubmit} id="scenario">
                <Form.Field>
                  <label htmlFor="csvWithYmlData">Файл с фидами</label>
                  <input
                    type="file"
                    name="csvWithYmlData"
                    id="csvWithYmlData"
                    accept=".csv"
                    required
                    onChange={handleFileSelected}
                  />
                </Form.Field>
                <Message info>
                  <Message.Header>Какой нужен файл:</Message.Header>
                  <Message.Content>
                    Формат файла: <code>.CSV</code>
                  </Message.Content>
                  <Message.Content>
                    Названия колонок:
                    <List bulleted>
                      <List.Item>externalId</List.Item>
                      <List.Item>name</List.Item>
                      <List.Item>url</List.Item>
                    </List>
                    <a href="https://drive.google.com/file/d/1h-Ts-lZ0FGlkRYCAFP5-uTMhcxoSViMo/view?usp=sharing">
                      Пример файла
                    </a>
                  </Message.Content>
                </Message>
                <Divider />
                <Form.Field>
                  <label htmlFor="brand">Системное имя бренда</label>
                  <input
                    type="text"
                    name="brand"
                    id="brand"
                    value={ymlSettings.brand}
                    required
                    onChange={handleSettingsChange}
                  />
                </Form.Field>
                <Form.Field>
                  <label htmlFor="externalSystem">
                    Индетификатор внешней системы
                  </label>
                  <input
                    type="text"
                    name="externalSystem"
                    id="externalSystem"
                    value={ymlSettings.externalSystem}
                    required
                    onChange={handleSettingsChange}
                  />
                </Form.Field>
                <Form.Field>
                  <label htmlFor="launchPeriod">Период загрузки</label>
                  <input
                    type="number"
                    name="launchPeriod"
                    id="launchPeriod"
                    value={ymlSettings.launchPeriod}
                    required
                    onChange={handleSettingsChange}
                  />
                </Form.Field>
                <Button positive loading={isSending} type="submit" primary>
                  Загрузить фиды
                </Button>
                {!isSending && isSentSuccessfully ? (
                  <Message
                    visiblу={!isSending}
                    success
                    header="Ура"
                    content="Данные успешно отправлены в Mindbox"
                  />
                ) : (
                  <Message
                    error
                    visible={errorsWithSending !== ""}
                    content={errorsWithSending}
                    header="Ошибка"
                  />
                )}
              </Form>
              <YmlInstructions />
            </>
          </Segment>
        </Grid.Column>
        <Grid.Column width={10}>
          {ymlTable && ymlTable.length > 0 && (
            <>
              <Table striped>
                <Table.Header>
                  <Table.Row>
                    <Table.HeaderCell>externalId</Table.HeaderCell>
                    <Table.HeaderCell>name</Table.HeaderCell>
                    <Table.HeaderCell>url</Table.HeaderCell>
                  </Table.Row>
                </Table.Header>
                <Table.Body>
                  {ymlTable.map((row) => (
                    <Table.Row>
                      <Table.Cell>{row.externalId}</Table.Cell>
                      <Table.Cell>{row.name}</Table.Cell>
                      <Table.Cell>{row.url}</Table.Cell>
                    </Table.Row>
                  ))}
                </Table.Body>
              </Table>
              <Message
                warning
                icon="warning circle"
                header="Проверьте данные"
                content="Все колонки должны быть заполнены. Если колонка пустая, значит у нее неправильный заголовок.
                  Поправьте свой файл и загрузите заново"
              ></Message>
            </>
          )}
        </Grid.Column>
      </Grid>
    </Container>
  );
};

export default YmlComponent;
