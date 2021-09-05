import React, { useState } from "react";

import { StartScenarioBody } from "src/declarations";
import startScenario from "src/client/api/scenarioRequests";
import scenarios from "src/data";

import { Button, Divider, Form, Icon, Input, Message } from "semantic-ui-react";

import "client/styles/block/form/form.css";
import ScenarioInfo from "./ScenarioInfo";

const Scenario = () => {
  const [wasStarted, setWasStarted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const auth = useAuth();

  const [scenario, setScenario] = useState({
    scenario: scenarios[0],
    projectName: auth.loginForProject,
    campaign: 0,
    emailForNotification: "",
  } as StartScenarioBody);

  const handleFormSubmit = async (event: React.SyntheticEvent) => {
    event.preventDefault();

    try {
      setIsLoading(true);
      await startScenario(scenario);
      setWasStarted(true);
    } catch (error) {
      // @ts-ignore
      setError(error.response.data);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <Container>
      <h1 className="options__header">Завести операции ...</h1>
      <Grid stackable>
        <div className="ten wide column">
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
                    scenarios.find(
                      (scenario) => scenario.type === eventValue
                    ) || scenarios[0];
                  setScenario({ ...scenario, scenario: selectedScenario });
                  setWasStarted(false);
                }}
                value={scenario.scenario.type}
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
                    setScenario({ ...scenario, campaign: eventValue });
                  }
                  setWasStarted(false);
                }}
                value={scenario.campaign}
              />

              <p className="form__description">
                https://{scenario.projectName}.mindbox.ru/campaigns/
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
                required
                fluid
                id="emailForNotification"
                name="emailForNotification"
                placeholder="Почта, на которую мы отправим письмо, когда сценарий добежит до конца"
                onChange={(event) => {
                  setScenario({
                    ...scenario,
                    emailForNotification: event.target.value,
                  });
                  setWasStarted(false);
                }}
                value={scenario.emailForNotification}
              />
            </Form.Field>

            <div className="form__buttons">
              <button
                type="submit"
                className={`form__button_login ui button basic green 
                            ${wasStarted && "disabled"} 
                            ${isLoading && "loading"}`}
                id="submit"
              >
                <i className="play icon"></i>
                Запустить
              </button>
              {wasStarted && (
                <span
                  className="form__result form__result_success "
                  id="result"
                >
                  <i className="check circle outline icon"></i>
                  Автозаведение запущено
                </span>
              )}
              {error && (
                <span className="form__result form__result_error " id="result">
                  {error}
                </span>
              )}
            </div>
          </Form>
        </div>
        <div className="six wide column">
          <ScenarioInfo documentationLink={scenario.scenario.docs} />
        </div>
      </Grid>
    </Container>
  );
};

export default Scenario;
