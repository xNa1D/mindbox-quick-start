import auth from "./auth";
import registration from "./registration";
import scenario from "./scenario";

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
