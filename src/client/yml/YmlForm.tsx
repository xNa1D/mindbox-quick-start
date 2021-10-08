import React, { FormEvent, useState } from "react";
import { Button, Divider, Form, List, Message } from "semantic-ui-react";
import { AuthParams, Link, Settings, YmlFormProps } from "src/declarations";

const YmlForm = ({ parseCsv, sendData }: YmlFormProps) => {
  const [isSentSuccessfully, setIsSentSuccessfully] = useState<boolean>();
  const [errorsWithSending, setErrorsWithSending] = useState<string>("");
  const [isSending, setIsSending] = useState<boolean>(false);

  const [csvData, setCsvData] = useState<Link[]>();

  const [ymlSettings, setYmlSettings] = useState<Settings>({
    brand: "",
    externalSystem: "Website",
    launchPeriod: 2,
  });

  const [authParams, setAuthParams] = useState<AuthParams>();

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

  const validateCsv = (links: Link[]) => {
    const findRowsWithIncorrectFields = () =>
      links.filter((link) => link.name === undefined || link.url === undefined);

    if (findRowsWithIncorrectFields().length > 0) {
      throw new Error("Загружен некорректный файл");
    }
  };

  const handleFormSubmit = async (event: FormEvent) => {
    event.preventDefault();
    console.log("handleFormSubmit");

    try {

      if (csvData) {
        setIsSending(true);

        validateCsv(csvData);
        await sendData({
          links: csvData,
          settings: ymlSettings,
          authParams,
        });
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

  const handleFileSelected = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    if (event.target.files) {
      const files = Array.from(event.target.files);

      parseCsv(files[0]).then(setCsvData).catch(setErrorsWithSending);
    }
  };

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
              <List.Item>areaExternalId</List.Item>
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
    </>
  );
};

export default YmlForm;
