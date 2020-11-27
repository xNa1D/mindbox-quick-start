import { ScenarioNames } from "../..";
import config from "../../config";

export const handleEmailInput = (event: Event) => {
  const target = event.target as HTMLInputElement;
  if (target.value.indexOf("@") > 0) {
    target.value = target.value.split("@")[0];
  }
};

export const handleProjectNameInput = (event: Event) => {
  const target = event.target as HTMLInputElement;
  if (target.value.indexOf("http://") >= 0) {
    target.value = target.value.replace("http://", "");
  }
  if (target.value.indexOf("https://") >= 0) {
    target.value = target.value.replace("https://", "");
  }
  if (target.value.indexOf(".") >= 0) {
    target.value = target.value.split(".")[0];
  }
};

export const handleScenarioChange = (event: Event) => {
  const target = event.target as HTMLInputElement;
  const specificationLint = document.querySelector("#lintToTZ");
  const formInputCampaign = document.querySelector("#form__input_campaign");

  specificationLint?.setAttribute(
    "href",
    config.docs[target.value as ScenarioNames]
  );
};
