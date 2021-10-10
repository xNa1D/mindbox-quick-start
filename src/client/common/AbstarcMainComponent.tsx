import React, { ReactFragment } from "react";
import { Container, Grid, Header, Segment } from "semantic-ui-react";

type AbstractMainComponentProps = {
  header: string;
  form: () => JSX.Element;
  instruction: () => JSX.Element;
  infoPanel: () => JSX.Element;
};

const AbstarcMainComponent = ({
  header,
  form,
  instruction,
  infoPanel,
}: AbstractMainComponentProps) => {
  return (
    <Container fluid>
      <Header as="h1" content={header} />
      <Grid columns={2} stackable>
        <Grid.Column width={6} style={{ maxWidth: "450px" }}>
          <Segment style={{ position: "sticky", top: "15px" }}>
            {form}
            {instruction}
          </Segment>
        </Grid.Column>
        <Grid.Column width={10}>{infoPanel}</Grid.Column>
      </Grid>
    </Container>
  );
};

export default AbstarcMainComponent;
