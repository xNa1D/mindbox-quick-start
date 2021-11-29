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

export type CustomFieldObject = {
  CustomFieldEntity: string;
  CustomFieldValueTypes: string;
  CustomFieldName: string;
  CustomFieldSystemName: string;

  isClearable: boolean;
  isMultiple: boolean;
  isPublic: boolean;
};

export type CustomFieldScenarioRequestBody = CustomFieldObject &
  commonGhostInspectorFields;
