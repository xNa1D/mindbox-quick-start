import React, { useState } from "react";
import { Container, Grid, Header, Message, Segment } from "semantic-ui-react";
import Papa, { ParseError, ParseResult } from "papaparse";

import { Link, ParseCsv } from "src/declarations";
import YmlInstructions from "./YmlInstructions";
import YmlForm from "./YmlForm";
import CsvDataPreview from "./CsvDataPreview";

import sendYmlData from "client/api/sendYmlData";

const YmlComponent = () => {
  const [ymlTable, setYmlTable] = useState<Link[]>([]);

  const parseCsv: ParseCsv = (file) => {
    return new Promise((resolve, reject) => {
      Papa.parse(file, {
        complete: (result: ParseResult<Link>) => {
          setYmlTable(result.data);
          resolve(result.data);
        },
        header: true,
        error: (error: ParseError) => reject(error),
      });
    });
  };

  return (
    <Container fluid>
      <Header as="h1">Импорт YML фидов</Header>
      <Grid columns={2} stackable>
        <Grid.Column width={6} style={{ maxWidth: "450px" }}>
          <Segment style={{ position: "sticky", top: "15px" }}>
            <YmlForm sendData={sendYmlData} parseCsv={parseCsv} />
            <YmlInstructions />
          </Segment>
        </Grid.Column>
        <Grid.Column width={10}>
          <Message
            warning
            icon="warning circle"
            header="Проверьте данные"
            content="Все колонки должны быть заполнены. Если колонка пустая, значит у нее неправильный заголовок.
                  Поправьте свой файл и загрузите заново"
          />
          <CsvDataPreview ymlTable={ymlTable} />
        </Grid.Column>
      </Grid>
    </Container>
  );
};

export default YmlComponent;
