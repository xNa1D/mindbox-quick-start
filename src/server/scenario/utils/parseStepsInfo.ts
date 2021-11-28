import { StartScenarioBody, Step } from "src/declarations";
import { StepsEntity } from "src/ScenarioResult";

type reducedStepsType = {
  [k: string]: { status?: boolean | null; name?: string };
};

const isStepsEmpty = (steps: StepsEntity[]) => steps?.length === 0;

const getStepName = (step: StepsEntity) =>
  step.notes
    ?.split("\n")[0]
    .replace("Imported from: Петр - ", "")
    .split("-")[1]
    .trim();

const isNewStep = (stepsObject: reducedStepsType, id: number) =>
  stepsObject[id] === undefined;

const wasStepSkipped = (step: StepsEntity) => step.passing === null;

const isReducedStepStatusEmpty = (steps: reducedStepsType, id: number) =>
  steps[id]["status"] === null;

export const parseStepsInfo = (steps: StepsEntity[]) => {
  if (isStepsEmpty(steps)) {
    return [];
  }
  const reducedSteps: reducedStepsType = {};

  steps.reduce((reducedSteps, step) => {
    const stepId = step.extra?.rootSequence;

    if (stepId !== undefined) {
      if (isNewStep(reducedSteps, stepId)) {
        reducedSteps[stepId] = {
          name: getStepName(step),
          status: step.passing,
        };
      } else {
        if (wasStepSkipped(step)) {
          if (isReducedStepStatusEmpty(reducedSteps, stepId)) {
            // сохраняем статус null, только если текущее null
            reducedSteps[stepId]["status"] = step.passing;
          }
        } else {
          reducedSteps[stepId]["status"] = step.passing;
        }
      }
    }

    return reducedSteps;
  }, reducedSteps);

  return Object.values(reducedSteps) as Step[];
};

export default parseStepsInfo;
