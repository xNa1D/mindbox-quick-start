import auth from "./auth";

const authForm =
  (document.querySelector("#auth__form") as HTMLFormElement) || undefined;

authForm?.addEventListener("submit", (event) => auth(event, authForm));
