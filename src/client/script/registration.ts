import axios from "axios";

import { RegistrationRequest } from "src/declarations";

const registration = async (event: Event, authForm: HTMLFormElement) => {
  event.preventDefault();

  const errorMessage = authForm.querySelector("#error");
  const submitBtn = authForm.querySelector("#submit");
  const successMessage = authForm.querySelector("#success");
  const timer = authForm.querySelector("#timer");

  submitBtn?.classList.add("loading");
  errorMessage?.classList.remove("visible");

  const startTicking = () => {
    let initialTimer: number;
    if (timer) {
      initialTimer = +(timer.textContent || 0);
    }
    return setInterval(() => {
      if (timer) {
        initialTimer -= 1;
        timer.textContent = `${initialTimer}`;
      }
    }, 1000);
  };

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

    successMessage?.classList.add("visible");
    const timerInterval = startTicking();
    setTimeout(() => {
      clearInterval(timerInterval);
      window.location.replace("/");
    }, 5000);
  } catch (error) {
    errorMessage?.classList.add("visible");
    submitBtn?.classList.remove("loading");
  }
};

export default registration;
