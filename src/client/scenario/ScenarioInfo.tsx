import React, { useEffect, useState } from "react";
import { Button, Header, List, Message, Segment } from "semantic-ui-react";
import ReactMarkdown from "react-markdown";

import getScenarioDescription from "./getScenarioDescription";

type ScenarioInfo = {
  documentationLink: string;
  scenarioType: string;
};

const ScenarioInfo = ({ documentationLink, scenarioType }: ScenarioInfo) => {
  const [scenarioDescription, setScenarioDescription] = useState("");
  const [isDescriptionLoading, setIsDescriptionLoading] = useState(false);
  const [gettingDescriptionError, setGettingDescriptionError] = useState("");

  useEffect(() => {
    setIsDescriptionLoading(true);
    getScenarioDescription(scenarioType)
      .then((description) => setScenarioDescription(description))
      .catch((error) => setGettingDescriptionError(error.toString()))
      .finally(() => setIsDescriptionLoading(false));
  }, [scenarioType]);

  return (
    <>
      <div style={{ paddingBottom: "1rem" }}>
        <Header as="h3">Как это работает?</Header>
        <List ordered>
          <List.Item>Авыторизуетесь в проекте</List.Item>
          <List.Item>Выбираете сценарий, кампанию и запускаете</List.Item>
          <List.Item>
            Бот войдет в нужный проект и заведет все, что нужно для стандартного
            ТЗ
          </List.Item>
          <List.Item>
            Когда бот закончит, на почту прийдет письмо со статусом по каждой
            операции
          </List.Item>
        </List>
      </div>
      <Segment loading={isDescriptionLoading}>
        <ReactMarkdown>{scenarioDescription}</ReactMarkdown>
        {gettingDescriptionError && (
          <Message error visible content={gettingDescriptionError} />
        )}
      </Segment>
      {documentationLink && (
        <Button positive href={documentationLink} id="lintToTZ" target="_blank">
          <i className="file alternate outline icon"></i>Заготовка под ТЗ{" "}
        </Button>
      )}
    </>
  );
};

export default ScenarioInfo;
