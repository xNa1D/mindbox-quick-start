import axios from "axios";

type abstractMessage<T> = {
  email: string;
  operation: string;
  mailingParams: T;
};

  const sendMessage = async <T>({
    email,
    operation,
    mailingParams,
  }: abstractMessage<T>) => {
    return await axios.post(
      `https://api.mindbox.ru/v3/operations/async`,
      {
        customer: {
          email: email,
        },
        emailMailing: {
          customParameters: mailingParams,
        },
      },
      {
        headers: {
          "Content-Type": "application/json; charset=utf-8",
          Accept: "application/json",
          Authorization: `Mindbox secretKey="${process.env.SECRET_KEY}"`,
        },
        params: {
          endpointId: process.env.ENDPOINT,
          operation,
        },
      }
    );
  };


export default sendMessage;
