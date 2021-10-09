import axios from "axios";

import { YmlRequestType } from "src/declarations";

  const sendYmlData = async (data: YmlRequestType) =>
    await axios.post("/api/yml/start", data, {
      headers: { "content-type": "application/json" },
    });

export default sendYmlData;
