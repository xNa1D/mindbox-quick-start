import React, { useEffect, useState } from "react";
import { Button, Header, List, Message, Segment } from "semantic-ui-react";
import ReactMarkdown from "react-markdown";

import getScenarioDescription from "./getScenarioDescription";
import { Scenario } from "src/declarations";

type ScenarioInfo = {
  scenario: Scenario;
};

const ScenarioInfo = ({ scenario }: ScenarioInfo) => {
  const [scenarioDescription, setScenarioDescription] = useState("");
  const [isDescriptionLoading, setIsDescriptionLoading] = useState(false);
  const [gettingDescriptionError, setGettingDescriptionError] = useState("");

  useEffect(() => {
    setIsDescriptionLoading(true);
    getScenarioDescription(scenario.type)
      .then((description) => setScenarioDescription(description))
      .catch((error) => setGettingDescriptionError(error.toString()))
      .finally(() => setIsDescriptionLoading(false));
  }, [scenario]);

  return (
    <>
      <Segment loading={isDescriptionLoading} basic>
        <Header content={scenario.name} />
        {scenario.docs && (
          <Button positive href={scenario.docs} id="lintToTZ" target="_blank">
            <i className="file alternate outline icon"></i>Заготовка под ТЗ{" "}
          </Button>
        )}
        <ReactMarkdown>{scenarioDescription}</ReactMarkdown>
        {gettingDescriptionError && (
          <Message error visible content={gettingDescriptionError} />
        )}
      </Segment>
    </>
  );
};

export default ScenarioInfo;
