import React, { useState } from "react";
import { Container, Grid, Header, Segment } from "semantic-ui-react";

import { YmlInstructions } from "../entities/instruction";
import YmlForm from "../entities/form/ui";
import { CsvDataPreview } from "../entities/csv-preview";

import sendYmlData from "src/client/shared/api/sendYmlData";
import { CsvDataInstruction } from "../entities/csv-instruction";
import { parseCsv } from "../process";
import { Link } from "../entities/form";

export const YmlComponent = () => {
  const [ymlTable, setYmlTable] = useState<Link[]>([]);

  return (
    <Container fluid>
      <Header as="h1">Импорт YML фидов</Header>
      <Grid columns={2} stackable>
        <Grid.Column width={6} style={{ maxWidth: "450px" }}>
          <Segment style={{ position: "sticky", top: "15px" }}>
            <YmlForm
              sendData={sendYmlData}
              parseCsv={parseCsv}
              setYmlTable={setYmlTable}
            />
            <YmlInstructions />
          </Segment>
        </Grid.Column>
        <Grid.Column width={10}>
          <CsvDataInstruction />
          <CsvDataPreview ymlTable={ymlTable} />
        </Grid.Column>
      </Grid>
    </Container>
  );
};

export default YmlComponent;
