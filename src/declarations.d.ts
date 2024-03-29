export type ScenarioApiCalls = {
  ecommerce: (projectName: string, campaignNumber: number) => Promise<unknown>;
  loyaltyOnline: (
    projectName: string,
    campaignNumber: number
  ) => Promise<unknown>;
  loyaltyOffline: (
    projectName: string,
    campaignNumber: number
  ) => Promise<unknown>;
  mobilePush: (projectName: string, campaignNumber: number) => Promise<unknown>;
};

export type Scenario = {
  type: string;
  name: string;
  docs: string;
  api: string[];
  ghType: "old" | "new";
};

export type ScenarioNames = keyof ScenarioApiCalls;

export type StartScenarioBody = {
  scenario: Scenario;
  projectName: string;
  campaign: number;
  emailForNotification: string;
};

export type AuthRequestBody = {
  email: string;
  password: string;
  project: string;
};

export type RegistrationRequest = {
  email: string;
};
export type AuthByAdminPanelRequestBody = {
  login: string;
  password: string;
  project: string;
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
  project: string;
  tokenFromAdminPanel: string;
};

export type UseProviderReturnedValue = {
  isLoggedIn: boolean;
  loginErrors: string;
  loginForProject: string;
  login: (user: AuthRequestBody, isLoginByAdmin: boolean) => Promise<void>;
  checkAuth: () => Promise<void>;
};
