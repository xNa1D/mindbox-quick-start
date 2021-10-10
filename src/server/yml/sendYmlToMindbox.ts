import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

interface Area {
  areaExternalId?: string;
}

export interface YmlImportSetting {
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
}

type setYmlType = (
  yml: YmlImportSetting[],
  project: string,
  authToken: string
) => Promise<void>;

const sendYmlToMindbox: setYmlType = async (yml, project, authToken) => {
  var data = `ReactJsonData[]={ymlImportSettings:[${yml.map((item) => JSON.stringify(item))}]}`;

  var config = {
    url: `https://${project}.mindbox.ru/products/import/yml/save`,
    headers: {
      Cookie: authToken,
    },
    data,
  };
// console.log(config);
  const result = await axios.post(config.url, config.data, {
    headers: config.headers,
  });

  if (isLoginFailed(result)) {
    throw new Error("Mindbox error");
  }
};

const isLoginFailed = (result: AxiosResponse): boolean => {
  return result.headers["content-type"] === "text/html; charset=utf-8";
};

export default sendYmlToMindbox;
