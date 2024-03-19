import Joi from "joi";
import { RequestStatus } from "../promptRequests/request.js";

export const responseSchema = Joi.object({
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

export const responseFragmentSchema = Joi.object({
  promptGuid: Joi.string().required(),
  targetGuid: Joi.string().required(),
  data: Joi.string().required(),
});

export const updatePromptStateSchema = Joi.object({
  guid: Joi.string().required(),
  status: Joi.string()
    .valid(RequestStatus.Processed, RequestStatus.Completed)
    .required(),
});

export const createdHistorySchema = Joi.object({
  guid: Joi.string().required(),
});
