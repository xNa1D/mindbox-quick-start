export const handleEmailInput = (event: Event) => {
  const target = event.target as HTMLInputElement;
  if (target.value.indexOf("@") > 0) {
    target.value = target.value.split("@")[0];
  }
};

export const handleProjectNameInput = (event: Event) => {
  const target = event.target as HTMLInputElement;
  if (target.value.indexOf("http://") >= 0) {
    target.value = target.value.replace("http://", "");
  }
  if (target.value.indexOf("https://") >= 0) {
    target.value = target.value.replace("https://", "");
  }
  if (target.value.indexOf(".") >= 0) {
    target.value = target.value.split(".")[0];
  }
};

export const handleScenarioChange = (event: Event) => {
  const target = event.target as HTMLInputElement;
  const specificationLint = document.querySelector("#lintToTZ");
  const formInputCampaign = document.querySelector("#form__input_campaign");

  switch (target.value) {
    case "ecommerce":
      if (specificationLint) {
        specificationLint.innerHTML = `<a href="">интернет магазина</a>`;
      }
      formInputCampaign?.classList.add("disabled");
      break;
    case "loyaltyOnline":
      if (specificationLint) {
        specificationLint.innerHTML = `<a href="">ПЛ на сайте</a>`;
      }
      formInputCampaign?.classList.remove("disabled");
      break;
    case "loyaltyOffline":
      if (specificationLint) {
        specificationLint.innerHTML = `<a href="">ПЛ в кассах</a>`;
      }
      formInputCampaign?.classList.remove("disabled");
      break;
    case "mobilePush":
      if (specificationLint) {
        specificationLint.innerHTML = `<a href="">Стандартная интеграция мобильного приложения</a>`;
      }
      formInputCampaign?.classList.remove("disabled");
      break;
  }
};
