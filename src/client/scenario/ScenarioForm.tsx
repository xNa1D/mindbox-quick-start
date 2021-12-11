import axios from "axios";
import React, { useState } from "react";
import { Button, Divider, Form, Icon, Input, Message } from "semantic-ui-react";
import startScenario from "src/client/shared/api/scenarioRequests";
import { Scenario, StartScenarioBody } from "src/declarations";
import useAuth from "../processes/auth/useAuth";
import { fallbackScenario } from "./ScenarioComponent";


type ScenarioFormProps = {
  allScenarios: Scenario[];
  selectedScenario: string;
  onChangeSelectedScenario: React.Dispatch<React.SetStateAction<string>>;
};

const ScenarioForm = ({
  allScenarios,
  selectedScenario: selected,
  onChangeSelectedScenario,
}: ScenarioFormProps) => {
  const auth = useAuth();

  const [wasStarted, setWasStarted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const [formState, setFormState] = useState<StartScenarioBody>({
    scenario: fallbackScenario,
    projectName: auth.loginForProject,
    campaign: 0,
    emailForNotification: "",
  });

  // useEffect(() => {
  //   const selectedScenario =
  //     allScenarios.find((scenario) => scenario.type === selected) ||
  //     fallbackScenario;
  //   setFormState({ ...formState, scenario: selectedScenario });
  // }, [allScenarios]);

  const handleFormSubmit = async (event: React.SyntheticEvent) => {
    event.preventDefault();

    try {
      setIsLoading(true);
      await startScenario(formState);
      setWasStarted(true);
    } catch (error) {
      let message;

      if (axios.isAxiosError(error)) {
        message = error.response?.data;
      } else if (error instanceof Error) {
        message = error.message;
      }
      setError(message);
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
          onChange={event => {
            const selectedScenarioType = event.target.value;
            const selectedScenario =
              allScenarios.find(
                scenario => scenario.type === selectedScenarioType
              ) || fallbackScenario;
            setFormState({ ...formState, scenario: selectedScenario });
            onChangeSelectedScenario(selectedScenarioType);
            setWasStarted(false);
          }}
          value={formState?.scenario?.type}
        >
          {allScenarios.length > 0 &&
            allScenarios.map(scenario => (
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
          onChange={event => {
            const eventValue = +event.target.value as number;
            if (eventValue) {
              setFormState({ ...formState, campaign: eventValue });
            }
            setWasStarted(false);
          }}
          value={formState.campaign}
        />

        <p style={{ color: "#b9b9b9", fontSize: ".9rem" }}>
          https://{formState.projectName}.mindbox.ru/campaigns/
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
          onChange={event => {
            setFormState({
              ...formState,
              emailForNotification: event.target.value,
            });
            setWasStarted(false);
          }}
          value={formState.emailForNotification}
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
