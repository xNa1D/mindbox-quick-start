import axios, { AxiosResponse } from "axios";
import { setYmlType, YmlImportSetting } from ".";

const ymlArrayToMindboxString = (array: YmlImportSetting[]) => {
  return `ReactJsonData[]={ymlImportSettings:[${array.map(item =>
    JSON.stringify(item)
  )}]}`;
};

const isLoginFailed = (result: AxiosResponse): boolean => {
  if (result.headers["content-type"] === "text/html; charset=utf-8") {
    throw new Error("Mindbox error");
  }
  return true;
};

const createConfig = ({
  authCookie,
  yml,
  project,
}: {
  authCookie: string;
  yml: YmlImportSetting[];
  project: string;
}) => {
  return {
    url: `https://${project}.mindbox.ru/products/import/yml/save`,
    headers: {
      Cookie: authCookie,
    },
    data: ymlArrayToMindboxString(yml),
  };
};

const sendYmlToMindbox: setYmlType = async (yml, project, authToken) => {
  const config = createConfig({ yml, authCookie: authToken, project });

  const result = await axios.post(config.url, config.data, {
    headers: config.headers,
  });

  isLoginFailed(result);
};

export default sendYmlToMindbox;
