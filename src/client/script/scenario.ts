import axios from "axios";

import { ScenarioRequestBody, ScenarioNames } from "src/declarations";

const scenario = async (event: Event, authForm: HTMLFormElement) => {
  event.preventDefault();

  const submitBtn = authForm.querySelector("#submit");
  const result = authForm.querySelector("#result");
  submitBtn?.classList.add("loading");
  submitBtn?.setAttribute("disabled", "disabled");

  const formData = new FormData(authForm);

  const requestBody: ScenarioRequestBody = {
    taskName: (formData.get("task") as ScenarioNames) || "",
    projectName: (formData.get("projectName") as string) || "",
    campaingNumber: +(formData.get("campaign") || "") as number,
  };

  try {
    await axios.post<ScenarioRequestBody>("/api/scenario/start", requestBody, {
      headers: { "content-type": "application/json" },
    });

    submitBtn?.classList.remove("loading");
    result?.classList.remove("form__result_hidden");
  } catch (error) {
    submitBtn?.classList.remove("loading");
  }
};

export default scenario;
