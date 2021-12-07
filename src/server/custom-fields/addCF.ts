import {
  CustomFieldObject,
  CustomFieldScenarioRequestBody,
  ghostInspectorScriptId,
} from ".";
import { runOneTask } from "../ghost-inspector";

export const addCF = async (
  cfs: CustomFieldObject[],
  projectName: string,
  adminPanelCookie: string
) => {
  const resultedArray = [];

  for await (const cf of cfs) {
    try {
      const result = await runOneTask<CustomFieldScenarioRequestBody>({
        body: {
          ...cf,
          projectName,
          adminPanelCookie,
        },
        options: {
          headers: {
            "Content-Type": "application/json",
          },
        },
        url: `https://api.ghostinspector.com/v1/tests/${ghostInspectorScriptId}/execute/?apiKey=${process.env.GH_TOKEN_NEW}`,
      });

      resultedArray.push({
        ...cf,
        status: result.passing,
      });

      console.log(result.passing);
    } catch (error) {
      console.log(error);
    }
  }

  return resultedArray;
};
