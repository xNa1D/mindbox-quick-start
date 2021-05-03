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
  api: string[];
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
  project: string;
};

export type RegistrationRequest = {
  email: string;
};

export type Step = {
  status: boolean | null;
  name: string;
};

type BaseMessageParameters = {
  task: string;
  projectName: string;
  steps: Step[];
};

export type SuccessMessageParameters = BaseMessageParameters & {
  documentationLink: string;
};

export type ErrorMessageParameters = BaseMessageParameters & {
  errorMessage: string;
  videoLink: string;
};


// JWT

export type JwtUser = {
  email: string;
  project?: string;
  tokenFromAdminPanel?: string;
};