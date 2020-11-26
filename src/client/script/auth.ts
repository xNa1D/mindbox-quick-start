import axios from "axios";

import { AuthRequestBody } from "../../index.d";

const auth = async (event: Event, authForm: HTMLFormElement) => {
  event.preventDefault();

  const errorMessage = authForm.querySelector("#error");
  const submitBtn = authForm.querySelector("#submit");

  submitBtn?.classList.add("loading");
  errorMessage?.classList.remove("visible");

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

    // устаналиваем куку с токеном. Действует 1 день
    let date: Date | string = new Date(Date.now() + 86400e3);
    date = date.toUTCString();
    document.cookie = `token=${token.data}; expires=${date}`;

    // если все хорошо, отправляем на страницу сценариев
    window.location.replace("/scenario");
  } catch (error) {
    errorMessage?.classList.add("visible");
    submitBtn?.classList.remove("loading");
  }
};

export default auth;
