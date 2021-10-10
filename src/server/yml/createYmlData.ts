// import { Link, Settings, AuthParams } from "src/declarations";
import { YmlImportSetting } from "./sendYmlToMindbox";

type Link = {
  url: string;
  name: string;
  externalId?: string | undefined;
};

type Settings = {
  brand: string;
  externalSystem: string;
  launchPeriod: number;
};

type AuthParams = {
  password: string;
  username: string;
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
