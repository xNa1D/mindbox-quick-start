import { ScenarioNames } from "./index";

type ScenarioDocs = { [T in ScenarioNames]: string };

const docs: ScenarioDocs = {
  ecommerce:
    "https://docs.google.com/document/d/1VoY1pre3ZqdBBuIxb4-1IIiZr5W-NkTUUrAimxeCfW4/edit",
  loyaltyOnline:
    "https://docs.google.com/document/d/13XJIqU1CSv5yaTFeAFu7J1L94edaMAQNQAAwHJxqAOc/edit",
  loyaltyOffline:
    "https://docs.google.com/document/d/1b2EUTSMsc4txkMIjkxc1d_hSRBlVeSARtL4Y59f4OVA/edit",
  mobilePush:
    "https://docs.google.com/document/d/1glcthFoGqwcj1hzAt8PG4Y6YO_Sw6MlUmhiOj2cPa1o/edit",
};

const scenarioApi: ScenarioDocs = {
  ecommerce:
    "https://api.ghostinspector.com/v1/tests/5ec6c26197e4531b3a9d9864/execute/?apiKey=777edc3b47a553359340c186dca0a1923bc51c77",
  loyaltyOnline:
    "https://api.ghostinspector.com/v1/tests/5ed5315fe1d6aa3e73eeac22/execute/?apiKey=777edc3b47a553359340c186dca0a1923bc51c77",
  loyaltyOffline:
    "https://api.ghostinspector.com/v1/tests/5ecbae5297e4531b3aaaf62e/execute/?apiKey=777edc3b47a553359340c186dca0a1923bc51c77",
  mobilePush:
    "https://api.ghostinspector.com/v1/tests/5f113490d5acb022c96d5bf5/execute/?apiKey=777edc3b47a553359340c186dca0a1923bc51c77",
};

const config = {
  docs,
  scenarioApi,
};

export default config;
