export type Scenarios = {
  ecommerce: (projectName: string, campaignNumber: number) => Promise<any>;
  loyaltyOnline: (projectName: string, campaignNumber: number) => Promise<any>;
  loyaltyOfline: (projectName: string, campaignNumber: number) => Promise<any>;
  mobilePush: (projectName: string, campaignNumber: number) => Promise<any>;
};

export type ScenarioRequestBody = {
  taskName: keyof Scenarios;
  projectName: string;
  campaingNumber: number;
};
