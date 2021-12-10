import axios from "axios";
import { CustomFieldObject } from "src/server/custom-fields";


export const startCf = async (data: CustomFieldObject[]) =>
  await axios.post("/api/cf/start", data, {
    headers: { "content-type": "application/json" },
  });

