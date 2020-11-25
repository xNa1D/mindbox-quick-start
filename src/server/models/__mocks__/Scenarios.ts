import { Scenarios } from "../../..";

const scenarios: Scenarios = {
  ecommerce: jest.fn().mockImplementation(async (projectName: string) => ""),
  loyaltyOnline: jest
    .fn()
    .mockImplementation(async (projectName: string, campaignNumber: number) =>
      jest.fn().mockResolvedValue("")
    ),
  loyaltyOfline: jest
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
