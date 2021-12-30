import React, { FormEvent, useReducer, useState } from "react";
import { Button, Divider, Form, Header, Message } from "semantic-ui-react";
import {
  AuthParams,
  finishWithError,
  finishWithSuccess,
  initialState,
  Link,
  reducer,
  Settings,
  start,
  statuses,
  validateCsv,
  YmlFormProps,
} from ".";

import { CsvWarning } from "../../entities/csv-warning";

const YmlForm = ({ parseCsv, sendData, setYmlTable }: YmlFormProps) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const [csvData, setCsvData] = useState<Link[]>([]);

  const [ymlSettings, setYmlSettings] = useState<Settings>({
    brand: "",
    externalSystem: "Website",
    launchPeriod: 2,
  });

  const [authParams, setAuthParams] = useState<AuthParams>({
    password: "",
    username: "",
  });

  const handleSettingsChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setYmlSettings({
      ...ymlSettings,
      [e.target.name]: e.target.value,
    });
  };

  const handleAuthSettingsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAuthParams({ ...authParams, [e.target.name]: e.target.value || "" });
  };

  const handleFormSubmit = async (event: FormEvent) => {
    event.preventDefault();

    try {
      if (csvData) {
        dispatch(start());

        validateCsv(csvData);

        await sendData({
          links: csvData,
          settings: ymlSettings,
          authParams,
        });
        dispatch(finishWithSuccess());
      } else {
        throw new Error("CSV was not provided");
      }
    } catch (error) {
      let message;
      if (error instanceof Error) {
        message = error.message;
      }
      dispatch(finishWithError(message || "Error with sending"));
    }
  };

  const handleFileSelected = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    if (event.target.files) {
      const files = Array.from(event.target.files);

      parseCsv<Link[]>(files[0])
        .then(data => {
          setYmlTable(data);
          setCsvData(data);
        })
        .catch((message: string) => dispatch(finishWithError(message)));
    }
  };

  const authForm = () => (
    <>
      <Divider />
      <Header as="h3">Авторизаця</Header>
      <Form.Field>
        <label htmlFor="auth_login">Логин</label>
        <input
          type="text"
          name="username"
          id="auth_login"
          value={authParams.username}
          onChange={handleAuthSettingsChange}
        />
      </Form.Field>
      <Form.Field>
        <label htmlFor="auth_password">Пароль</label>
        <input
          type="password"
          name="password"
          id="auth_password"
          value={authParams.password}
          onChange={handleAuthSettingsChange}
        />
      </Form.Field>
    </>
  );

  const settingsForm = () => (
    <>
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
    </>
  );

  return (
    <>
      {CsvWarning()}
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

        {settingsForm()}
        {authForm()}
        <Button
          positive
          loading={state.status === statuses.sending}
          type="submit"
          primary
        >
          Загрузить фиды
        </Button>
        <Message
          visible={state.status === statuses.fulfilled}
          success
          header="Ура"
          content="Данные успешно отправлены в Mindbox"
        />
        <Message
          error
          visible={state.status === statuses.error}
          content={state.error}
          header="Ошибка"
        />
      </Form>
    </>
  );
};

export default YmlForm;
