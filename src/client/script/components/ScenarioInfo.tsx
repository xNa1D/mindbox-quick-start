import React from "react";

type ScenarioInfo = {
  documentationLink: string;
};

const ScenarioInfo = ({ documentationLink }: ScenarioInfo) => {
  return (
    <>
      <div className="ui message">
        <div className="header">Что дальше?</div>
        <ul className="list">
          <li>
            Сейчас мы запустили сценарий автозаведения. На проекте создадутся
            точки интеграции, операции, ШД и прочее.{" "}
          </li>
          <li>Минут через 10-15 должно прийти письмо с результатом</li>
          <li>
            Пока оно заводится, сделай копию гугльдока и замени в нем на
            название проекта
          </li>
          <li>
            После получения письма обязательно проверь все операции по ТЗ. Если
            чего-то нет, то напиши про это в слаке{" "}
            <a href="https://mindbox.slack.com/archives/C01G12FQQ0Z">
              #mindbox-quick-start
            </a>
          </li>
        </ul>
      </div>
      {documentationLink && (
        <a
          className="ui button green fluid"
          href={documentationLink}
          id="lintToTZ"
          target="_blank"
        >
          <i className="file alternate outline icon"></i>Заготовка под ТЗ{" "}
        </a>
      )}
    </>
  );
}

export default ScenarioInfo;
