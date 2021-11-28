export type Link = {
  url: string;
  name: string;
  areaExternalId?: string | undefined;
};

export type Settings = {
  brand: string;
  externalSystem: string;
  launchPeriod: number;
};

export type AuthParams = {
  password: string;
  username: string;
};

export type createYmlDataType = (
  links: Link[],
  settings: Settings,
  AuthParams?: AuthParams
) => YmlImportSetting[];

export type Area = {
  externalId?: string;
};

export type YmlImportSetting = {
  brandSystemName: string;
  externalSystemSystemName: string;
  name: string;
  url: string;
  launchPeriod: string;
  area?: Area | null;
  username?: any;
  password?: any;
  nextStartDateTimeUtc?: Date;
  lastSuccessDateTimeUtc?: Date;
  isFaulty?: boolean;
};

export type setYmlType = (
  yml: YmlImportSetting[],
  project: string,
  authToken: string
) => Promise<void>;
