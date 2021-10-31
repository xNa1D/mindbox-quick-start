import { Scenario } from "src/declarations";
import axios from "axios";

export const getAllScenarios = async () => {
  const result = await axios.get<Scenario[]>("/api/scenario");
  return result.data;
};
