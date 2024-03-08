import Joi from "joi";
import { RequestStatus } from "../requests/request.js";

const responseSchema = Joi.object({
  username: Joi.string().required(),
  content: Joi.array()
    .items(
      Joi.object({
        data: Joi.string().required(),
        type: Joi.string().valid("text", "image").required(),
      })
    )
    .required(),
});

const responseFragmentSchema = Joi.object({
  promptGuid: Joi.string().required(),
  targetGuid: Joi.string().required(),
  data: Joi.string().required(),
});

const updatePromptStateSchema = Joi.object({
  guid: Joi.string().required(),
  status: Joi.string()
    .valid(RequestStatus.Processed, RequestStatus.Completed)
    .required(),
});

export const SendActions = {
  Message: { name: "message", validator: responseSchema },
  MessageFragment: {
    name: "messageFragment",
    validator: responseFragmentSchema,
  },
  UpdatePromptState: {
    name: "promptStateChanged",
    validator: updatePromptStateSchema,
  },
};


