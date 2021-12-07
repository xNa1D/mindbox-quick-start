import React from "react";
import { ScenarioNames } from "src/declarations";
import config from "src/data";

const clearButtonDisabledAttribute = () => {
  const submitBtn = document.querySelector("#submit");
  submitBtn?.removeAttribute("disabled");
};

export const handleEmailInput = (inputValue: string) => {
  if (inputValue.indexOf("@") > 0) {
    return inputValue.split("@")[0];
  }
  return inputValue;
};

export const handleProjectNameInput = (inputValue: string) => {
  let resultValue = inputValue;
  if (inputValue.indexOf("http://") >= 0) {
    resultValue = resultValue.replace("http://", "");
  }
  if (inputValue.indexOf("https://") >= 0) {
    resultValue = resultValue.replace("https://", "");
  }
  if (inputValue.indexOf(".") >= 0) {
    resultValue = resultValue.split(".")[0];
  }

  return resultValue;
};

export const handleCampaignNumberChange = () => {
  clearButtonDisabledAttribute();
};
