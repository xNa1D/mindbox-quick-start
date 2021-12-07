import { parseStepsInfo } from "./parseStepsInfo";

const rawSteps = {
  allSuccess: [
    {
      passing: true,
      extra: {
        rootSequence: 0,
      },
      notes:
        "Imported from: Петр - Стандартные операции для ИМ - Вход на проект\n",
    },
    {
      passing: true,
      extra: {
        rootSequence: 1,
      },
      notes:
        "Imported from: Петр - Стандартные операции для ИМ - Переход на страницу 2\n",
    },
    {
      passing: true,
      extra: {
        rootSequence: 2,
      },
      notes:
        "Imported from: Петр - Стандартные операции для ИМ - Переход на страницу 3\n",
    },
  ],
  withErrors: [
    {
      passing: true,
      extra: {
        rootSequence: 0,
      },
      notes:
        "Imported from: Петр - Стандартные операции для ИМ - Вход на проект\n",
    },
    {
      passing: false,
      extra: {
        rootSequence: 1,
      },
      notes:
        "Imported from: Петр - Стандартные операции для ИМ - Переход на страницу 2\n",
    },
    {
      passing: false,
      extra: {
        rootSequence: 1,
      },
      notes:
        "Imported from: Петр - Стандартные операции для ИМ - Переход на страницу 3\n",
    },
  ],
  partlyExecuted: [
    {
      passing: true,
      extra: {
        rootSequence: 0,
      },
      notes:
        "Imported from: Петр - Стандартные операции для ИМ - Вход на проект\n",
    },
    {
      passing: null,
      extra: {
        rootSequence: 1,
      },
      notes:
        "Imported from: Петр - Стандартные операции для ИМ - Переход на страницу 2\n",
    },
    {
      passing: null,
      extra: {
        rootSequence: 1,
      },
      notes:
        "Imported from: Петр - Стандартные операции для ИМ - Переход на страницу 3\n",
    },
  ],
  executeWithSkipping: [
    {
      passing: true,
      extra: {
        rootSequence: 0,
      },
      notes:
        "Imported from: Петр - Стандартные операции для ИМ - Вход на проект\n",
    },
    {
      passing: null,
      extra: {
        rootSequence: 1,
      },
      notes:
        "Imported from: Петр - Стандартные операции для ИМ - Переход на страницу 2\n",
    },
    {
      passing: true,
      extra: {
        rootSequence: 1,
      },
      notes:
        "Imported from: Петр - Стандартные операции для ИМ - Переход на страницу 3\n",
    },
  ],
};

const reducedSteps = {
  allSuccess: [
    { name: "Вход на проект", status: true },
    { name: "Переход на страницу 2", status: true },
    { name: "Переход на страницу 3", status: true },
  ],
  withErrors: [
    { name: "Вход на проект", status: true },
    { name: "Переход на страницу 2", status: false },
  ],
  partlyExecuted: [
    { name: "Вход на проект", status: true },
    { name: "Переход на страницу 2", status: null },
  ],
  executeWithSkipping: [
    { name: "Вход на проект", status: true },
    { name: "Переход на страницу 2", status: true },
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
