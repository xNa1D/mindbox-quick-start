import { EventEmitter } from "events";
import { SuccessMessageParameters } from "src/declarations";
import { sendMessage } from ".";

export const notificationEvent = new EventEmitter();

type ghSuccessEventType = {
  email: string;
  mailingParams: SuccessMessageParameters;
};

const events = {
  GH_SUCCESS: "GH_SUCCESS",
};

notificationEvent.addListener(
  events.GH_SUCCESS,
  ({ email, mailingParams }: ghSuccessEventType) => {
    sendMessage<SuccessMessageParameters>({
      email,
      mailingParams,
      operation: "QuickStart.SendSuccessStatusWithSteps",
    });
  }
);

export const notifyAboutSuccess = (event: ghSuccessEventType) => {
  notificationEvent.emit(events.GH_SUCCESS, event);
};
