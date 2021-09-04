import React, { useState, useEffect } from "react";

import { StartScenarioBody, ScenarioNames } from "src/declarations";
import startScenario from "client/script/api/scenarioRequests";
import useAuth from "client/script/hooks/useAuth";
import scenarios from "src/data";

import "client/styles/block/form/form.css";

const Scenario = () => {
  const [isStarted, setIsStarted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const auth = useAuth();

  const [scenario, setScenario] = useState({
    scenario: scenarios[0],
    projectName: auth.loginForProject,
    campaign: 0,
  } as StartScenarioBody);

  const handleFormSubmit = async (event: React.SyntheticEvent) => {
    event.preventDefault();

    try {
      setIsLoading(true);
      await startScenario(scenario);
      setIsStarted(true);
    } catch (error) {
      setError(error.response.data);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <>
      <h1 className="options__header">Завести операции ...</h1>
      <div className="ui stackable grid">
        <div className="ten wide column">
          <form className="ui form" id="scenario" onSubmit={handleFormSubmit}>
            <fieldset className="field form__input-container">
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
                  setIsStarted(false);
                }}
                value={scenario.scenario.type}
              >
                {scenarios.map((scenario) => (
                  <option value={scenario.type} key={ scenario.type}>{scenario.name}</option>
                ))}
              </select>
            </fieldset>
            <fieldset
              className="field  form__input-container"
              id="form__input_campaign"
            >
              <label htmlFor="campaign" className=" form__label">
                Номер кампании
              </label>
              <input
                type="number"
                id="campaign"
                className="fluid  "
                name="campaign"
                placeholder="1, 2 или 100500. Кто знает, сколько у вас там кампаний"
                onChange={(event) => {
                  const eventValue = +event.target.value as number;
                  if (eventValue) {
                    setScenario({ ...scenario, campaign: eventValue });
                  }
                  setIsStarted(false);
                }}
                value={scenario.campaign}
              />

              <p className="form__description">
                https://{scenario.projectName}.mindbox.ru/campaigns/
                <b className="ui black circular label">вот эта цифра</b>
                /operations
              </p>
            </fieldset>
            <div className="form__buttons">
              <button
                type="submit"
                className={`form__button_login ui button basic green 
                            ${isStarted && "disabled"} 
                            ${isLoading && "loading"}`}
                id="submit"
              >
                <i className="play icon"></i>
                Запустить
              </button>
              {isStarted && (
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
          </form>
        </div>
        <div className="six wide column">
          <ScenarioInfo documentationLink={scenario.scenario.docs} />
        </div>
    </>
  );
};

export default Scenario;
