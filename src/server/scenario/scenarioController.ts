import { Scenario } from "src/declarations";
import { addNew, getAll, update } from "./model";

export const getAllScenarios = async () => {
  return await getAll();
};

export const addNewScenario = async (scenario: Scenario) => {
  await addNew(scenario);

  return true;
};

export const updateScenario = async (scenario: Scenario) => {
  await update(scenario);
  return true;
};
