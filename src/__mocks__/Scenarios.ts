import { ScenarioApiCalls } from "..";

const scenarios: ScenarioApiCalls = {
  ecommerce: jest.fn().mockImplementation(async (projectName: string) => ""),
  loyaltyOnline: jest
    .fn()
    .mockImplementation(async (projectName: string, campaignNumber: number) =>
      jest.fn().mockResolvedValue("")
    ),
  loyaltyOffline: jest
    .fn()
    .mockImplementation(async (projectName: string, campaignNumber: number) =>
      jest.fn().mockResolvedValue("")
    ),
  mobilePush: jest
    .fn()
    .mockImplementation(async (projectName: string, campaignNumber: number) =>
      jest.fn().mockResolvedValue("")
    ),
};

export default scenarios;
