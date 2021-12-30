import { CustomFieldObject } from ".";
import { addCF } from "./addCF";
import { runOneTask } from "../ghost-inspector";

jest.mock("../ghost-inspector");
(runOneTask as jest.Mock)
  .mockResolvedValueOnce({
    passing: true,
  })
  .mockResolvedValueOnce({
    passing: true,
  })
  .mockResolvedValueOnce({
    passing: true,
  })
  .mockResolvedValueOnce({
    passing: false,
  });

const cfs: CustomFieldObject[] = [
  {
    CustomFieldEntity: "Entity",
    CustomFieldName: "Name",
    CustomFieldSystemName: "SystemName",
    CustomFieldValueTypes: "ValueTypes",
    isClearable: "false",
    isMultiple: "true",
    isPublic: "false",
  },
  {
    CustomFieldEntity: "Entity-2",
    CustomFieldName: "Name-2",
    CustomFieldSystemName: "SystemName-2",
    CustomFieldValueTypes: "ValueTypes",
    isClearable: "false",
    isMultiple: "true",
    isPublic: "false",
  },
];

describe("addCF", () => {
  test("When pass array with 2 elements, should call twice", async () => {
    await addCF(cfs, "test", "myCookie");

    expect(runOneTask).toHaveBeenCalledTimes(2);
  });

  test("Should return array enriched with statusses", async () => {
    const result = await addCF(cfs, "test", "myCookie");

    expect(result).toStrictEqual([
      { ...cfs[0], status: true },
      { ...cfs[1], status: false },
    ]);
  });
});
