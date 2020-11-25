import auth from "./auth";
import registration from "./registration";
import scenario from "./scenario";
import {
  handleEmailInput,
  handleProjectNameInput,
  handleScenarioChange,
} from "./inputChanges";

const authForm =
  (document.querySelector("#auth__form") as HTMLFormElement) || undefined;

authForm?.addEventListener("submit", (event) => auth(event, authForm));

const registrationForm =
  (document.querySelector("#auth__form_registration") as HTMLFormElement) ||
  undefined;

registrationForm?.addEventListener("submit", (event) =>
  registration(event, registrationForm)
);

const scenarioForm =
  (document.querySelector("#scenario") as HTMLFormElement) || undefined;

scenarioForm?.addEventListener("submit", (event) =>
  scenario(event, scenarioForm)
);
const emailInput =
  (document.querySelector("#email") as HTMLFormElement) || undefined;

emailInput?.addEventListener("blur", (event) => handleEmailInput(event));

const projectName =
  (document.querySelector("#projectName") as HTMLFormElement) || undefined;

projectName?.addEventListener("blur", (event) => handleProjectNameInput(event));

const task = (document.querySelector("#task") as HTMLFormElement) || undefined;

task?.addEventListener("change", (event) => handleScenarioChange(event));
