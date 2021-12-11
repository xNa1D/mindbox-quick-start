import { notifyAboutSuccess } from "../notification";
import { runAndNotify } from "./runAndNotify";
import { addCF } from "./addCF";

jest.mock("../notification");
jest.mock("./addCF");

const cfs = [
  {
    CustomFieldEntity: "Entity",
    CustomFieldName: "Name",
    CustomFieldSystemName: "SystemName",
    CustomFieldValueTypes: "ValueTypes",
    isClearable: "false",
    isMultiple: "true",
    isPublic: "false",
  },
];

(addCF as jest.Mock).mockResolvedValue([
  {
    ...cfs[0],
    status: true,
  },
]);

const user = {
  email: "my@email.com",
  project: "test-project",
  tokenFromAdminPanel: "awesome-cookie",
};

describe("runAndNotify", () => {
  test("Should call notification method", async () => {
    await runAndNotify(cfs, user);

    expect(notifyAboutSuccess).toHaveBeenCalledWith({
      email: user.email,
      mailingParams: {
        task: "Добавление доп полей",
        projectName: user.project,
        documentationLink: "",
        steps: [
          {
            name: "Name",
            status: true,
          },
        ],
      },
    });
  });
});
