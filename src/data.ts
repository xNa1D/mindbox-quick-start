import { Scenario } from "./declarations";

const scenarios: Scenario[] = [
  {
    type: "ecommerce",
    name: "Стандартные операции для интернет магазина",
    docs:
      "https://docs.google.com/document/d/1VoY1pre3ZqdBBuIxb4-1IIiZr5W-NkTUUrAimxeCfW4/edit",
    api: ["5ec6c26197e4531b3a9d9864", "607994e335da151e07a5afa6"],
  },
  {
    type: "loyaltyOffline",
    name: "Операции для ПЛ на кассе",
    docs:
      "https://docs.google.com/document/d/1b2EUTSMsc4txkMIjkxc1d_hSRBlVeSARtL4Y59f4OVA/edit",
    api: ["5ecbae5297e4531b3aaaf62e", "5f113490d5acb022c96d5bf5"],
  },
  {
    type: "loyaltyOnline",
    name: "Операции для ПЛ на сайте",
    docs:
      "https://docs.google.com/document/d/13XJIqU1CSv5yaTFeAFu7J1L94edaMAQNQAAwHJxqAOc/edit",
    api: ["5ed5315fe1d6aa3e73eeac22"],
  },
  {
    type: "mobilePush",
    name: "Стандратная интеграция мобильного приложения",
    docs:
      "https://docs.google.com/document/d/1glcthFoGqwcj1hzAt8PG4Y6YO_Sw6MlUmhiOj2cPa1o/edit",
    api: ["5fb2689f89be016e97029052"],
  },
  {
    type: "OSMI_cards",
    name: "Интеграция OSMI Cards",
    docs:
      "#",
    api: ["608be528e1c7b042c92ec029"],
  },
];

export default scenarios;
