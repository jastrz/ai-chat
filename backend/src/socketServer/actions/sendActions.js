import Joi from "joi";
import { RequestStatus } from "../requests/request.js";

export const SendActions = {
  Message: "message",
  MessageFragment: "messageFragment",
  UpdatePromptState: "promptStateChanged",
};

