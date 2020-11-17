import axios from "axios";

export const createBasicEcommersOperations = async (projectName: string) =>
  axios.post(
    `https://api.ghostinspector.com/v1/tests/5ec6c26197e4531b3a9d9864/execute/?apiKey=777edc3b47a553359340c186dca0a1923bc51c77`,
    { projectName }
  );

export const createLoayltyOnlineOperations = async (
  projectName: string,
  campaignNumber: number
) =>
  axios.post(
    `https://api.ghostinspector.com/v1/tests/5ec6c26197e4531b3a9d9864/execute/?apiKey=777edc3b47a553359340c186dca0a1923bc51c77`,
    { projectName, campaign: campaignNumber }
  );

export const createLoayltyOfflineOperations = async (
  projectName: string,
  campaignNumber: number
) =>
  axios.post(
    `https://api.ghostinspector.com/v1/tests/5ec6c26197e4531b3a9d9864/execute/?apiKey=777edc3b47a553359340c186dca0a1923bc51c77`,
    { projectName, campaign: campaignNumber }
  );

export const createMobilePushOperations = async (
  projectName: string,
  campaignNumber: number
) =>
  axios.post(
    `https://api.ghostinspector.com/v1/tests/5ec6c26197e4531b3a9d9864/execute/?apiKey=777edc3b47a553359340c186dca0a1923bc51c77`,
    { projectName, campaign: campaignNumber }
  );
