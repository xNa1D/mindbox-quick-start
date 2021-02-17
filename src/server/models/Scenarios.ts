import axios from "axios";

import { ScenarioApiCalls } from "../..";
import config from "../../config";

const scenarios: ScenarioApiCalls = {
  ecommerce: async (projectName: string, campaignNumber?: number) =>
    axios.post(
      config.scenarioApi.ecommerce,
      { projectName },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    ),
  loyaltyOnline: async (projectName: string, campaignNumber: number) =>
    axios.post(
      config.scenarioApi.loyaltyOnline,
      { projectName, campaign: campaignNumber },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    ),
  loyaltyOffline: async (projectName: string, campaignNumber: number) => {
    await axios.post(
      config.scenarioApi.loyaltyOffline,
      { projectName, campaign: campaignNumber },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return axios.post(
      config.scenarioApi.mobilePush,
      { projectName, campaign: campaignNumber },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  },
  mobilePush: async (projectName: string, campaignNumber: number) =>
    axios.post(
      `https://api.ghostinspector.com/v1/tests/5fb2689f89be016e97029052/execute/?apiKey=777edc3b47a553359340c186dca0a1923bc51c77
      `,
      { projectName, campaign: campaignNumber },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    ),
};

export default scenarios;
