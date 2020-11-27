export type ScenarioApiCalls = {
  ecommerce: (projectName: string, campaignNumber: number) => Promise<any>;
  loyaltyOnline: (projectName: string, campaignNumber: number) => Promise<any>;
  loyaltyOffline: (projectName: string, campaignNumber: number) => Promise<any>;
  mobilePush: (projectName: string, campaignNumber: number) => Promise<any>;
};

export type ScenarioNames = keyof ScenarioApiCalls;

export type ScenarioRequestBody = {
  taskName: keyof ScenarioApiCalls;
  projectName: string;
  campaingNumber: number;
};

export type AuthRequestBody = {
  email: string;
  password: string;
};

export type RegistrationRequest = Pick<AuthRequestBody, "email">;
