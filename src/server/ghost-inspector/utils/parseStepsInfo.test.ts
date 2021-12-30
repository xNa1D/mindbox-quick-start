import { parseStepsInfo } from "./parseStepsInfo";

const stepInfo = {
  enter: {
    note: "Imported from: Петр - Стандартные операции для ИМ - Вход на проект\n",
    name: "Вход на проект",
  },
  page_2: {
    note: "Imported from: Петр - Стандартные операции для ИМ - Переход на страницу 2\n",
    name: "Переход на страницу 2",
  },
  page_3: {
    note: "Imported from: Петр - Стандартные операции для ИМ - Переход на страницу 3\n",
    name: "Переход на страницу 3",
  },
};

const rawSteps = {
  allSuccess: [
    {
      passing: true,
      extra: {
        rootSequence: 0,
      },
      notes: stepInfo.enter.note,
    },
    {
      passing: true,
      extra: {
        rootSequence: 1,
      },
      notes: stepInfo.page_2.note,
    },
    {
      passing: true,
      extra: {
        rootSequence: 2,
      },
      notes: stepInfo.page_3.note,
    },
  ],
  withErrors: [
    {
      passing: true,
      extra: {
        rootSequence: 0,
      },
      notes: stepInfo.enter.note,
    },
    {
      passing: false,
      extra: {
        rootSequence: 1,
      },
      notes: stepInfo.page_2.note,
    },
    {
      passing: false,
      extra: {
        rootSequence: 1,
      },
      notes: stepInfo.page_3.note,
    },
  ],
  partlyExecuted: [
    {
      passing: true,
      extra: {
        rootSequence: 0,
      },
      notes: stepInfo.enter.note,
    },
    {
      passing: null,
      extra: {
        rootSequence: 1,
      },
      notes: stepInfo.page_2.note,
    },
    {
      passing: null,
      extra: {
        rootSequence: 1,
      },
      notes: stepInfo.page_3.note,
    },
  ],
  executeWithSkipping: [
    {
      passing: true,
      extra: {
        rootSequence: 0,
      },
      notes: stepInfo.enter.note,
    },
    {
      passing: null,
      extra: {
        rootSequence: 1,
      },
      notes: stepInfo.page_2.note,
    },
    {
      passing: true,
      extra: {
        rootSequence: 1,
      },
      notes: stepInfo.page_3.note,
    },
  ],
};

const reducedSteps = {
  allSuccess: [
    { name: stepInfo.enter.name, status: true },
    { name: stepInfo.page_2.name, status: true },
    { name: stepInfo.page_3.name, status: true },
  ],
  withErrors: [
    { name: stepInfo.enter.name, status: true },
    { name: stepInfo.page_2.name, status: false },
  ],
  partlyExecuted: [
    { name: stepInfo.enter.name, status: true },
    { name: stepInfo.page_2.name, status: null },
  ],
  executeWithSkipping: [
    { name: stepInfo.enter.name, status: true },
    { name: stepInfo.page_2.name, status: true },
  ],
};

describe("parseStepsInfo", () => {
  test("When all steps OK, should return reduced object with OK steps", () => {
    const result = parseStepsInfo(rawSteps.allSuccess);

    expect(result).toStrictEqual(reducedSteps.allSuccess);
  });

  test("When some steps Fail, should return reduced object with failed steps", () => {
    const result = parseStepsInfo(rawSteps.withErrors);

    expect(result).toStrictEqual(reducedSteps.withErrors);
  });

  test("When some steps doesn't execute, should return reduced object with partly executed steps", () => {
    const result = parseStepsInfo(rawSteps.partlyExecuted);

    expect(result).toStrictEqual(reducedSteps.partlyExecuted);
  });
  test("When some steps skipped in the middle, should return reduced object with all executed steps", () => {
    const result = parseStepsInfo(rawSteps.executeWithSkipping);

    expect(result).toStrictEqual(reducedSteps.executeWithSkipping);
  });
});
