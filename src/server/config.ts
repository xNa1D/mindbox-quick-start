import { ScenariosTpes } from "../index";

type ScenarioDocs = { [T in ScenariosTpes]: string };

const docs: ScenarioDocs = {
  ecommerce:
    "https://docs.google.com/document/d/1VoY1pre3ZqdBBuIxb4-1IIiZr5W-NkTUUrAimxeCfW4/edit",
  loyaltyOnline:
    "https://docs.google.com/document/d/13XJIqU1CSv5yaTFeAFu7J1L94edaMAQNQAAwHJxqAOc/edit",
  loyaltyOffline:
    "https://docs.google.com/document/d/1b2EUTSMsc4txkMIjkxc1d_hSRBlVeSARtL4Y59f4OVA/edit",
  mobilePush:
    "https://docs.google.com/document/d/1glcthFoGqwcj1hzAt8PG4Y6YO_Sw6MlUmhiOj2cPa1o/edit#heading=h.ephiqsky4dr4",
};

const config = {
  docs,
};
