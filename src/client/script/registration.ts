import axios from "axios";

import { RegistrationRequest } from "../../index.d";

const registration = async (event: Event, authForm: HTMLFormElement) => {
  event.preventDefault();

  const errorMessage = authForm.querySelector("#error");
  const submitBtn = authForm.querySelector("#submit");

  submitBtn?.classList.add("loading");
  errorMessage?.classList.remove("visible");

  const formData = new FormData(authForm);

  const requestBody = {
    email: ((formData.get("email") + "@mindbox.ru") as string) || "",
  };

  try {
    const token = await axios.post<RegistrationRequest>(
      "/api/user/reg",
      requestBody,
      {
        headers: { "content-type": "application/json" },
      }
    );

    window.location.replace("/");
  } catch (error) {
    errorMessage?.classList.add("visible");
    submitBtn?.classList.remove("loading");
  }
};

export default registration;
