import fs from "fs";
import path from "path";
import { Scenario } from "src/declarations";

const fileWithScenarios = "../../../data/scenarios.json";

const convertToScenarioJSON = (rawScenario: Buffer): Scenario[] =>
  JSON.parse(rawScenario.toString());

const getScenariosFromFile = () => {
  return new Promise<Scenario[]>((resolve, reject) => {
    fs.readFile(
      path.resolve(__dirname, fileWithScenarios),
      (err, scenarios) => {
        if (err) {
          reject(err);
        }

        resolve(convertToScenarioJSON(scenarios));
      }
    );
  });
};

const saveScenarios = (newData: Scenario[]) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(
      path.resolve(__dirname, fileWithScenarios),
      JSON.stringify(newData),
      (err) => {
        if (err) {
          reject(err);
        }
      }
    );
  });
};

export const getAllScenarios = async () => {
  return await getScenariosFromFile();
};

export const addNewScenario = async (scenario: Scenario) => {
  const scenarioArray: Scenario[] = await getScenariosFromFile();


  
  
  if ((scenarioArray.find((item) => item.type === scenario.type))) {
    console.log(scenarioArray.find((item) => item.type === scenario.type));
    
    throw new Error("Такой сценарий уже есть");
  }

  scenarioArray.push(scenario);
  saveScenarios(scenarioArray);

  return true;
};

export const updateScenario = async (scenario: Scenario) => {
  const scenarioArray: Scenario[] = await getScenariosFromFile();

  const updatedScenarioArray = scenarioArray.map((item) => {
    return item.type === scenario.type ? scenario : item;
  });

  saveScenarios(updatedScenarioArray);

  return true;
};
