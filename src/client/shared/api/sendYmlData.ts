import axios from "axios";
import { YmlRequestType } from "src/client/yml/form";

const sendYmlData = async (data: YmlRequestType) =>
  await axios.post("/api/yml/start", data, {
    headers: { "content-type": "application/json" },
  });

export default sendYmlData;
