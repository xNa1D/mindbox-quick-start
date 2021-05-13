import { StartScenarioBody, Step } from "src/declarations";
import { StepsEntity } from "src/ScenarioResult";

const parseStepsInfo = (steps: StepsEntity[]) => {
  if (steps?.length === 0) {
    return [];
  }
  const stepsObject: {
    [k: string]: { status?: boolean | null; name?: string };
  } = {};

  steps.reduce((stepsObject, step) => {
    const rootId = step.extra?.rootSequence;

    if (rootId !== undefined) {
      if (stepsObject[rootId] === undefined) {
        stepsObject[rootId] = {
          name: step.notes
            ?.split("\n")[0]
            .replace("Imported from: Петр - ", "")
            .split("-")[1]
            .trim(),
          status: step.passing,
        };
      } else {
        if (step.passing === null) {
          if (stepsObject[rootId]["status"] === null) {
            // сохраняем статус null, только если текущее null 
            stepsObject[rootId]["status"] = step.passing;
          }
        } else {
          stepsObject[rootId]["status"] = step.passing;
        }
      }
    }

    return stepsObject;
  }, stepsObject);

  return Object.values(stepsObject) as Step[];
};

export default parseStepsInfo;
