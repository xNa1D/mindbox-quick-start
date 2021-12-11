import React, { useState } from "react";
import { Container, Grid, Header, Segment } from "semantic-ui-react";

import { YmlInstructions } from "../../yml/entities/instruction";
import YmlForm from "../../yml/entities/form/ui";
import { CsvDataPreview } from "../../yml/entities/csv-preview";

import sendYmlData from "src/client/shared/api/sendYmlData";
import { column, CsvDataInstruction } from "../../yml/entities/csv-instruction";
import { parseCsv } from "../../shared/csv-to-json";
import { Link } from "../../yml/entities/form";

const columns: column[] = [
  { header: "name", description: "Название фида", isRequired: true },
  { header: "url", description: "Ссылка на фид", isRequired: true },
  {
    header: "areaExternalId",
    description: "Внешний идентификатор зоны",
    isRequired: false,
  },
];

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
          <CsvDataInstruction columns={columns} />
          <CsvDataPreview ymlTable={ymlTable} />
        </Grid.Column>
      </Grid>
    </Container>
  );
};

export default YmlComponent;
