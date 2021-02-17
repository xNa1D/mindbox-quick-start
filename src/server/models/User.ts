import axios from "axios";
import { generate } from "generate-password";

type Status =
  | "Success"
  | "ValidationError"
  | "ProtocolError"
  | "InternalServerError";

type FindProcessingStatus = "NotFound" | "Found";
type LoginProcessingStatus = "AuthenticationSucceeded" | "AuthenticationFailed";

type FindStuffAnswer = {
  status: Status;
  customer: {
    processingStatus: FindProcessingStatus;
  };
};
type LoginStufffAnswer = {
  status: Status;
  customer: {
    processingStatus: LoginProcessingStatus;
  };
};

class User {
  email: string;
  private password: string | undefined;

  constructor(email: string, password?: string) {
    this.email = email;
    this.password = password;
  }

  makeNewPassword() {
    this.password = generate({
      length: 10,
      numbers: true,
    });
    return this.password;
  }

  async isStuffExistInMindbox(): Promise<boolean> {
    const user = await axios.post<FindStuffAnswer>(
      `https://api.mindbox.ru/v3/operations/sync?endpointId=${process.env.ENDPOINT_FOR_SEARCH}&operation=QuickStart.GetStaff`,
      {
        customer: {
          email: this.email,
        },
      },
      {
        headers: {
          "Content-Type": "application/json; charset=utf-8",
          Accept: "application/json",
          Authorization: `Mindbox secretKey="${process.env.SECRET_KEY_FOR_SEARCH}"`,
        },
      }
    );

    if (user.data.status !== "Success") {
      throw "Mindbox internal Error";
    }

    return user.data.customer.processingStatus === "Found";
  }

  async registrStuff(): Promise<{}> {
    return await axios.post(
      `https://api.mindbox.ru/v3/operations/async?endpointId=${process.env.ENDPOINT}&operation=QuickStart.Reg`,
      {
        customer: {
          email: this.email,
          password: this.makeNewPassword(),
        },
      },
      {
        headers: {
          "Content-Type": "application/json; charset=utf-8",
          Accept: "application/json",
          Authorization: `Mindbox secretKey="${process.env.SECRET_KEY}"`,
        },
      }
    );
  }

  async loginStuff(): Promise<boolean> {
    const user = await axios.post<LoginStufffAnswer>(
      `https://api.mindbox.ru/v3/operations/sync?endpointId=${process.env.ENDPOINT}&operation=QuickStart.Auth`,
      {
        customer: {
          email: this.email,
          password: this.password,
        },
      },
      {
        headers: {
          "Content-Type": "application/json; charset=utf-8",
          Accept: "application/json",
          Authorization: `Mindbox secretKey="${process.env.SECRET_KEY}"`,
        },
      }
    );

    if (user.data.status !== "Success") {
      throw "Mindbox internal Error";
    }

    return user.data.customer.processingStatus === "AuthenticationSucceeded";
  }
}

export default User;
