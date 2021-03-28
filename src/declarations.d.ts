
export type ScenarioApiCalls = {
  ecommerce: (projectName: string, campaignNumber: number) => Promise<any>;
  loyaltyOnline: (projectName: string, campaignNumber: number) => Promise<any>;
  loyaltyOffline: (projectName: string, campaignNumber: number) => Promise<any>;
  mobilePush: (projectName: string, campaignNumber: number) => Promise<any>;
};

export type Scenario = {
  type: string;
  name: string;
  docs: string;
  api: string;
};

export type ScenarioNames = keyof ScenarioApiCalls;

export type StartScenarioBody = {
  scenario: Scenario;
  projectName: string;
  campaign: number;
};

export type AuthRequestBody = {
  email: string;
  password: string;
};

export type RegistrationRequest = Pick<AuthRequestBody, "email">;

export type ScenarioDocs = { [T in ScenarioNames]: string };

export type TaskNameHumanType = { [K in ScenarioNames]: string };