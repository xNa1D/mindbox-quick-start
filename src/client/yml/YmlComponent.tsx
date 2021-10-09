import React, { useState } from "react";
import {
  Container,
  Grid,
  Header,
  Message,
  Segment,
  Table,
} from "semantic-ui-react";
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
            <Message warning>
              <b>ИМПОРТ ПЕРЕЗАТЕРАЕТ СТАРЫЕ ДАННЫЕ</b>
              <p>
                Если у вас сейчас что-то уже настроено в проекте, то импорт
                перезатрет эти настройки. Увы, пока так. Старые настройки надо
                будет восстановить руками после импорта
              </p>
            </Message>
            <YmlForm sendData={sendYmlData} parseCsv={parseCsv} />
            <YmlInstructions />
          </Segment>
        </Grid.Column>
        <Grid.Column width={10}>
          <Segment attached>
            <b>Какой нужен файл:</b> CSV табличка с 3 колонками.{" "}
            <a href="https://drive.google.com/file/d/1h-Ts-lZ0FGlkRYCAFP5-uTMhcxoSViMo/view?usp=sharing">
              Пример файла
            </a>
          </Segment>
          <Table attached>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Название колонки</Table.HeaderCell>
                <Table.HeaderCell>Обязательность</Table.HeaderCell>
                <Table.HeaderCell>Описание колонки</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              <Table.Row>
                <Table.Cell>name</Table.Cell>
                <Table.Cell>обзятельно</Table.Cell>
                <Table.Cell>название фида</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>url</Table.Cell>
                <Table.Cell>обзятельно</Table.Cell>
                <Table.Cell>ссылка на фид</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>areaExternalId</Table.Cell>
                <Table.Cell>опционально</Table.Cell>
                <Table.Cell>внешний идентификатор зоны</Table.Cell>
              </Table.Row>
            </Table.Body>
          </Table>

          <Message
            warning
            attached="bottom"
            icon="warning circle"
            header="Проверьте данные"
            content="Колонки name и url должны быть заполнены. Если пустые, значит неправильный заголовок в таблице. Нажо поправить и загрузить заново"
          />
          <CsvDataPreview ymlTable={ymlTable} />
        </Grid.Column>
      </Grid>
    </Container>
  );
};

export default YmlComponent;
