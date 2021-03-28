import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

import { StartScenarioBody, ScenarioNames } from "src/declarations";
import { handleProjectNameInput } from "client/script/helpers/inputChanges";
import startScenario from "client/script/api/scenarioRequests";
import useAuth from "client/script/hooks/useAuth";
import scenarios from "src/data";

import "client/styles/block/form/form.css";

const Scenario = () => {
  const [scenario, setScenario] = useState({
    scenario: scenarios[0],
    projectName: "",
    campaign: 0,
  } as StartScenarioBody);

  const [isStarted, setIsStarted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const history = useHistory();
  const auth = useAuth();

  const handleFormSubmit = async (event: React.SyntheticEvent) => {
    event.preventDefault();

    try {
      setIsLoading(true);
      await startScenario(scenario);
      setIsStarted(true);
    } catch (error) {
      if (error.response.status === 403) {
        history.push("/");
      }
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
            <fieldset className="field form__input-container ">
              <label htmlFor="projectName" className="form__label">
                Системное имя проекта
              </label>
              <div className="ui right labeled input">
                <input
                  type="text"
                  id="projectName"
                  className="form__input"
                  name="projectName"
                  placeholder="nexus"
                  required
                  onChange={(event) => {
                    const eventValue = handleProjectNameInput(
                      event.target.value
                    );
                    setScenario({ ...scenario, projectName: eventValue });
                    setIsStarted(false);
                  }}
                  value={scenario.projectName}
                />
                <div className="ui basic label">.mindbox.ru</div>
              </div>
              <p className="form__description">
                Можно вставить ссылку прямо вот так:{" "}
                <i>https://demo-new.mindbox.ru/</i>, она подрежится сама
              </p>
            </fieldset>
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
                <option value="ecommerce">
                  Для стандартного интернет магазина
                </option>
                <option value="loyaltyOnline">
                  Программа лояльности на сайте
                </option>
                <option value="loyaltyOffline">
                  Программа лояльности в офлайне
                </option>
                <option value="mobilePush">
                  Для мобильного приложения и пушей
                </option>
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
                https://demo-new.mindbox.ru/campaigns/
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
          <div className="ui message">
            <div className="header">Что дальше?</div>
            <ul className="list">
              <li>
                Сейчас мы запустили сценарий автозаведения. На проекте
                создадутся точки интеграции, операции, ШД и прочее.{" "}
              </li>
              <li>Минут через 10-15 должно прийти письмо с результатом</li>
              <li>
                Пока оно заводится, сделай копию гугльдока и замени в нем на
                название проекта
              </li>
              <li>
                После получения письма обязательно проверь все операции по ТЗ.
                Если чего-то нет, то напиши про это в слаке{" "}
                <a href="https://mindbox.slack.com/archives/C01G12FQQ0Z">
                  #mindbox-quick-start
                </a>
              </li>
            </ul>
          </div>
          <a
            className="ui button green fluid"
            href={scenario.scenario.docs}
            id="lintToTZ"
            target="_blank"
          >
            <i className="file alternate outline icon"></i>Заготовка под ТЗ{" "}
          </a>
        </div>
      </div>
    </>
  );
};

export default Scenario;
