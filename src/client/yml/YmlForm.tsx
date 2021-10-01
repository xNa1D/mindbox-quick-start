import React, { FormEvent } from "react";
import { Button, Divider, Form, List, Message } from "semantic-ui-react";
import { Settings } from "src/declarations";

type YmlFormProps = {
  handleFormSubmit: (event: FormEvent<HTMLFormElement>) => void;
  handleFileSelected: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleSettingsChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  ymlSettings: Settings;
  formState: {
    isSentSuccessfully?: boolean;
    errorsWithSending: string;
    isSending: boolean;
  };
};

const YmlForm = ({
  handleFormSubmit,
  handleFileSelected,
  ymlSettings,
  handleSettingsChange,
  formState,
}: YmlFormProps) => {
  return (
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
          <label htmlFor="externalSystem">Индетификатор внешней системы</label>
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
        <Button positive loading={formState.isSending} type="submit" primary>
          Загрузить фиды
        </Button>
        {!formState.isSending && formState.isSentSuccessfully ? (
          <Message
            visiblу={!formState.isSending}
            success
            header="Ура"
            content="Данные успешно отправлены в Mindbox"
          />
        ) : (
          <Message
            error
            visible={formState.errorsWithSending !== ""}
            content={formState.errorsWithSending}
            header="Ошибка"
          />
        )}
      </Form>
    </>
  );
};

export default YmlForm;
