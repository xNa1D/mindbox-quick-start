import axios from "axios";

type getYmlTokenType = (project: string, cookie: string) => Promise<string>;

type getTokenValueFromCookieStringType = (cookieString: string) => string;

const getYmlToken: getYmlTokenType = async (project, cookie) => {
  const url = `https://${project}.mindbox.ru/products/import/yml/dialog`;

  const result = await axios.get(url, {
    headers: {
      cookie,
    },
  });

  return getTokenValueFromCookieString(result.headers["set-cookie"]);
};

const getTokenValueFromCookieString: getTokenValueFromCookieStringType = (
  cookieString
) => {
  const cookieKeyValueString = cookieString.split(";")[0];
  const cookieValue = cookieKeyValueString.split("=")[1];

  return cookieValue;
};

export default getYmlToken;