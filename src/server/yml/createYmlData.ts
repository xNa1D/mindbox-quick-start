import { createYmlDataType } from "./";
import { Link } from "./";

const validateYmlLenth = (links: Link[]) => {
  if (links.length > 500) {
    throw new Error("Maximum 500 Yml");
  }
  return true;
};

export const createYmlData: createYmlDataType = (
  links,
  settings,
  authParams
) => {
  validateYmlLenth(links);

  return links.map(linkAndName => {
    const { url, name, areaExternalId } = linkAndName;

    const area = areaExternalId ? { externalId: areaExternalId } : null;

    return {
      area,
      name,
      url,
      brandSystemName: settings.brand,
      externalSystemSystemName: settings.externalSystem,
      launchPeriod: settings.launchPeriod.toString(),
      password: authParams?.password || null,
      username: authParams?.username || null,
    };
  });
};
