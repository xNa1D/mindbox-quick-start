import React from 'react'
import { ScenarioNames } from "src/declarations"
import config from "src/config"

const clearButtonDisabledAttribute = () => {
  const submitBtn = document.querySelector("#submit");
  submitBtn?.removeAttribute("disabled");
};

export const handleEmailInput = (inputValue: string) => {
  if (inputValue.indexOf("@") > 0) {
   return  inputValue.split("@")[0];
  }
  return inputValue; 
};

export const handleProjectNameInput = (inputValue: string) => {
  let resultValue = inputValue; 
  if (inputValue.indexOf("http://") >= 0) {
    resultValue = inputValue.replace("http://", "");
  }
  if (inputValue.indexOf("https://") >= 0) {
    // TODO: on PASTE don't cut this part
    console.log(inputValue);
    
    resultValue = inputValue.replace("https://", "");
  }
  if (inputValue.indexOf(".") >= 0) {
    resultValue = inputValue.split(".")[0];
  }

  return resultValue; 
};

export const handleScenarioChange = (event: Event) => {
  const target = event.target as HTMLInputElement;
  const specificationLint = document.querySelector("#lintToTZ");
  const formInputCampaign = document.querySelector("#form__input_campaign");

  specificationLint?.setAttribute(
    "href",
    config.docs[target.value as ScenarioNames]
  );
  clearButtonDisabledAttribute();
};

export const handleCampaignNumberChange = () => {
  clearButtonDisabledAttribute();
};
