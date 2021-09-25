import axios, { AxiosRequestConfig } from "axios";
import FormData from "form-data";

interface Area {
  externalId: string;
}

interface YmlImportSetting {
  brandSystemName: string;
  externalSystemSystemName: string;
  name: string;
  url: string;
  launchPeriod: string;
  area: Area| null;
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

const setYml: setYmlType = async (yml, project, authToken) => {
  var data = new FormData();
  data.append("ReactJsonData[]", yml);

  var config: AxiosRequestConfig = {
    method: "post",
    url: `https://${project}.mindbox.ru/products/import/yml/save`,
    headers: {
      Cookie: authToken,
    },
    data: data,
  };

  const result = await axios(config);

  if (result.headers["content-type"] === "text/html; charset=utf-8") {
    throw new Error("Auth error");
  }
};

export default setYml;