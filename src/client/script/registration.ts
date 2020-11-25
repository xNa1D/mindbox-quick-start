import axios from "axios";

import { RegistrationRequest } from "../../index.d";

const registration = async (event: Event, authForm: HTMLFormElement) => {
  event.preventDefault();

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
    alert(error);
  }
};

export default registration;
