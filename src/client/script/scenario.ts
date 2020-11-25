import axios from "axios";

import { ScenarioRequestBody, Scenarios } from "../..";

const scenario = async (event: Event, authForm: HTMLFormElement) => {
  event.preventDefault();

  const formData = new FormData(authForm);

  const requestBody: ScenarioRequestBody = {
    taskName: (formData.get("task") as keyof Scenarios) || "",
    projectName: (formData.get("projectName") as string) || "",
    campaingNumber: +(formData.get("campaign") || "") as number,
  };

  try {
    await axios.post<ScenarioRequestBody>("/api/scenario/start", requestBody, {
      headers: { "content-type": "application/json" },
    });

    alert("Все ок");
  } catch (error) {
    alert(error);
  }
};

export default scenario;
