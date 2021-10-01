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
import YmlForm from "./YmlForm";

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
            <YmlForm
              formState={{
                errorsWithSending,
                isSending,
                isSentSuccessfully,
              }}
              handleFileSelected={handleFileSelected}
              handleFormSubmit={handleFormSubmit}
              handleSettingsChange={handleSettingsChange}
              ymlSettings={ymlSettings}
                  />
              <YmlInstructions />
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
