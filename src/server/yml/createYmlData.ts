import { YmlImportSetting } from "./sendYmlToMindbox";

type Url = string;
type AreaId = string;
type Name = string;

export type Link = { url: Url; name: Name; externalId?: AreaId };
export type AuthParams = {
  password: string;
  username: string;
};
export type Settings = {
  brand: string;
  externalSystem: string;
  launchPeriod: number;
};

export type createYmlDataType = (
  links: Link[],
  settings: Settings,
  AuthParams?: AuthParams
) => YmlImportSetting[];

const createYmlData: createYmlDataType = (links, settings, AuthParams) => {
  const ymlData = links.map((linkAndName) => {
    const { url, name, externalId } = linkAndName;
    
    const area = externalId ? { externalId } : null;

    return {
      area,
      name,
      url,
      brandSystemName: settings.brand,
      externalSystemSystemName: settings.externalSystem,
      launchPeriod: settings.launchPeriod.toString(),
      password: AuthParams?.password || null,
      username: AuthParams?.username || null,
    };
  });

  return ymlData;
};

export default createYmlData;
