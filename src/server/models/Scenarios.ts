import axios from "axios";

import { Scenarios } from "../index.d";

const scenarios: Scenarios = {
  ecommerce: async (projectName: string, campaignNumber?: number) =>
    axios.post(
      `https://api.ghostinspector.com/v1/tests/5ec6c26197e4531b3a9d9864/execute/?apiKey=777edc3b47a553359340c186dca0a1923bc51c77`,
      { projectName },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    ),
  loyaltyOnline: async (projectName: string, campaignNumber: number) =>
    axios.post(
      `https://api.ghostinspector.com/v1/tests/5ec6c26197e4531b3a9d9864/execute/?apiKey=777edc3b47a553359340c186dca0a1923bc51c77`,
      { projectName, campaign: campaignNumber },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    ),
  loyaltyOfline: async (projectName: string, campaignNumber: number) =>
    axios.post(
      `https://api.ghostinspector.com/v1/tests/5ec6c26197e4531b3a9d9864/execute/?apiKey=777edc3b47a553359340c186dca0a1923bc51c77`,
      { projectName, campaign: campaignNumber },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    ),
  mobilePush: async (projectName: string, campaignNumber: number) =>
    axios.post(
      `https://api.ghostinspector.com/v1/tests/5ec6c26197e4531b3a9d9864/execute/?apiKey=777edc3b47a553359340c186dca0a1923bc51c77`,
      { projectName, campaign: campaignNumber },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    ),
};

export default scenarios;
