import { commonGhostInspectorFields } from "../scenario/model";

export const entityTypes = [
  "Действие клиента",
  "Клиент",
  "Точка контакта",
  "Продукт",
  "Заказ",
  "Промоакция",
  "Позиция заказа",
  "Зона",
  "Дисконтная карта",
  "Линия списка продуктов",
  "Приз",
];

export const valueTypes = [
  "Целочисленный",
  "Дата",
  "Десятичный",
  "Логический",
  "Дата и время",
  "Перечисление",
  "Строковый",
  "Внешний идентификатор",
  "Уникальный идентификатор",
  "Идентификатор",
];

export const ghostInspectorScriptId = "615f0fc8df58a66e5d0794ab";

export type CustomFieldObject = {
  CustomFieldEntity: string;
  CustomFieldValueTypes: string;
  CustomFieldName: string;
  CustomFieldSystemName: string;

  isClearable: string;
  isMultiple: string;
  isPublic: string;
};

export type CustomFieldScenarioRequestBody = CustomFieldObject &
  commonGhostInspectorFields;
