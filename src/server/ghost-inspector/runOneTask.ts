import axios, { AxiosResponse } from "axios";
import { ScenarioResult } from "src/server/ghost-inspector/ScenarioResult";
import { settings } from ".";

const isSuccessfulStart = (result: AxiosResponse<any>) => {
  if (result.data.code !== "SUCCESS") {
    throw new Error("Internal error in Scenario Server");
  }
};

export const runOneTask = async <requestBody>(
  setting: settings<requestBody>
) => {
  const result = await axios.post<ScenarioResult>(
    setting.url,
    setting.body,
    setting.options
  );

  isSuccessfulStart(result);

  return result.data.data;
};
