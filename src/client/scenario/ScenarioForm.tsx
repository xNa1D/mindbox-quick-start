import React, { useState } from "react";

import { StartScenarioBody } from "src/declarations";
import startScenario from "src/client/api/scenarioRequests";
import scenarios from "src/data";

import { Button, Divider, Form, Icon, Input, Message } from "semantic-ui-react";

type ScenarioFormProps = {
  scenarioInfo: StartScenarioBody;
  updateScenarioInfo: React.Dispatch<React.SetStateAction<StartScenarioBody>>;
};

const ScenarioForm = ({
  scenarioInfo,
  updateScenarioInfo,
}: ScenarioFormProps) => {
  const [wasStarted, setWasStarted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleFormSubmit = async (event: React.SyntheticEvent) => {
    event.preventDefault();

    try {
      setIsLoading(true);
      await startScenario(scenarioInfo);
      setWasStarted(true);
    } catch (error) {
      // @ts-ignore
      setError(error.response.data);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <Form onSubmit={handleFormSubmit} id="scenario">
      <Form.Field>
        <label htmlFor="task" className="form__label">
          Какие операции заводить
        </label>
        <select
          className="ui fluid dropdown"
          name="task"
          id="task"
          onChange={(event) => {
            const eventValue = event.target.value;
            const selectedScenario =
              scenarios.find((scenario) => scenario.type === eventValue) ||
              scenarios[0];
            updateScenarioInfo({ ...scenarioInfo, scenario: selectedScenario });
            setWasStarted(false);
          }}
          value={scenarioInfo.scenario.type}
        >
          {scenarios.map((scenario) => (
            <option value={scenario.type} key={scenario.type}>
              {scenario.name}
            </option>
          ))}
        </select>
      </Form.Field>
      <Form.Field>
        <label htmlFor="campaign" className=" form__label">
          Номер кампании
        </label>
        <Input
          fluid
          type="number"
          id="campaign"
          name="campaign"
          placeholder="1, 2 или 100500. Кто знает, сколько у вас там кампаний"
          onChange={(event) => {
            const eventValue = +event.target.value as number;
            if (eventValue) {
              updateScenarioInfo({ ...scenarioInfo, campaign: eventValue });
            }
            setWasStarted(false);
          }}
          value={scenarioInfo.campaign}
        />

        <p style={{ color: "#b9b9b9", fontSize: ".9rem" }}>
          https://{scenarioInfo.projectName}.mindbox.ru/campaigns/
          <b className="ui black circular label">вот эта цифра</b>
          /operations
        </p>
      </Form.Field>
      <Divider />
      <Form.Field>
        <label htmlFor="emailForNotification" className=" form__label">
          Email для оповещений
        </label>
        <Input
          type="email"
          required
          fluid
          id="emailForNotification"
          name="emailForNotification"
          placeholder="Почта, на которую мы отправим письмо, когда сценарий добежит до конца"
          onChange={(event) => {
            updateScenarioInfo({
              ...scenarioInfo,
              emailForNotification: event.target.value,
            });
            setWasStarted(false);
          }}
          value={scenarioInfo.emailForNotification}
        />
      </Form.Field>

      <div>
        <Button
          type="submit"
          disabled={wasStarted}
          loading={isLoading}
          id="submit"
          positive
        >
          <i className="play icon"></i>
          Запустить
        </Button>
        {wasStarted && (
          <Message success visible>
            <Icon name="check circle" />
            Автозаведение запущено
          </Message>
        )}
        {error && (
          <Message error visible header="Ошибка запуска" content={error} />
        )}
      </div>
    </Form>
  );
};

export default ScenarioForm;
