import { AxiosResponse } from "axios";
import { ParseCsv } from "../../../shared/csv-to-json";

export const validateCsv = (links: Link[]) => {
  const findRowsWithIncorrectFields = () =>
    links.filter(link => link.name === undefined || link.url === undefined);

  if (findRowsWithIncorrectFields().length > 0) {
    throw new Error("Загружен некорректный файл");
  }
};

export type YmlFormProps = {
  parseCsv: ParseCsv;
  sendData: (data: YmlRequestType) => Promise<AxiosResponse<unknown>>;
  setYmlTable: React.Dispatch<React.SetStateAction<Link[]>>;
};

type Url = string;
type AreaId = string;
type Name = string;

export type YmlRequestType = {
  links: Link[];
  settings: Settings;
  authParams?: AuthParams;
};

export type Link = { url: Url; name: Name; areaExternalId?: AreaId };

export type AuthParams = {
  password: string;
  username: string;
};

export type Settings = {
  brand: string;
  externalSystem: string;
  launchPeriod: number;
};

type State = {
  status: string;
  error: string;
};

export const statuses = {
  notSent: "not-sent",
  sending: "sending",
  fulfilled: "fulfilled",
  error: "error",
};

type Action = { type: string; payload?: any };

export const initialState: State = {
  status: statuses.notSent,
  error: "",
};

const startSending = "START_SENDING";
const fulfilled = "FULFILLED";
const error = "ERROR";

export const start = () => ({
  type: startSending,
});

export const finishWithSuccess = () => ({
  type: fulfilled,
});

export const finishWithError = (message: string) => ({
  type: error,
  payload: message,
});

export const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case startSending:
      return { ...state, status: statuses.sending };
    case fulfilled:
      return { ...state, status: statuses.fulfilled };
    case error:
      return { status: statuses.error, error: action.payload };
    default:
      return state;
  }
};
