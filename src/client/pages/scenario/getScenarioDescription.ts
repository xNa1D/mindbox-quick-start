import axios from "axios";

import { RootObject } from "src/gist";

const getScenarioDescription = async (scenarioType: string) => {
  const scenarioFile = `${scenarioType}.md`;

  const allDescriptions = await axios.get<RootObject>(
    "https://api.github.com/gists/f89b15a74452a906b7a6bc7b26b6efa8",
    {
      headers: {
        Accept: "application/vnd.github.v3+json",
      },
    }
  );

  return allDescriptions?.data?.files[scenarioFile]?.content;
};

export default getScenarioDescription;
