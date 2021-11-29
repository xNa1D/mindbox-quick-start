import { JwtUser } from "src/declarations";
import { CustomFieldObject } from ".";
import { notifyAboutSuccess } from "../notification";
import { addCF } from "./addCF";

export const runAndNotify = async (cfs: CustomFieldObject[], user: JwtUser) => {
  const { project, tokenFromAdminPanel } = user;

  const result = await addCF(cfs, project, tokenFromAdminPanel);

  notifyAboutSuccess({
    email: user.email,
    mailingParams: {
      task: "Добавление доп полей",
      projectName: user.project,
      documentationLink: "",
      steps: result.map((item) => ({
        name: item.CustomFieldName,
        status: item.status,
      })),
    },
  });
};
