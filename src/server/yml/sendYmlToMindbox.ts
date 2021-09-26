import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import FormData from "form-data";

interface Area {
  externalId: string;
}

export interface YmlImportSetting {
  brandSystemName: string;
  externalSystemSystemName: string;
  name: string;
  url: string;
  launchPeriod: string;
  area: Area | null;
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

const ymlDataToString = (yml: YmlImportSetting[]) => {
  let resultString: string = "";
  yml.forEach((item) => {
    resultString += JSON.stringify(item);
  });
  return resultString;
};

const sendYmlToMindbox: setYmlType = async (yml, project, authToken) => {
  var data = `ReactJsonData[]={ymlImportSettings:[${ymlDataToString(yml)}]}`;

  var config = {
    url: `https://${project}.mindbox.ru/products/import/yml/save`,
    headers: {
      Cookie: authToken,
    },
    data,
  };

  const result = await axios.post(config.url, config.data, {
    headers: config.headers,
  });

  if (isLoginFailed(result)) {
    throw new Error("Auth error");
  }
};

const isLoginFailed = (result: AxiosResponse): boolean => {
  return result.headers["content-type"] === "text/html; charset=utf-8";
};

export default sendYmlToMindbox;
