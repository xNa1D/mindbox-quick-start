import axios from "axios";

import { AuthRequestBody } from "../../index.d";

const auth = async (event: Event, authForm: HTMLFormElement) => {
  event.preventDefault();

  const formData = new FormData(authForm);

  const requestBody: AuthRequestBody = {
    email: ((formData.get("email") + "@mindbox.ru") as string) || "",
    password: (formData.get("password") as string) || "",
  };

  try {
    const token = await axios.post<AuthRequestBody>(
      "/api/user/auth",
      requestBody,
      {
        headers: { "content-type": "application/json" },
      }
    );

    let date: Date | string = new Date(Date.now() + 86400e3);
    date = date.toUTCString();

    document.cookie = `token=${token.data}; expires=${date}`;
    window.location.replace("/scenario");
  } catch (error) {
    alert(error);
  }
};

export default auth;
