/**
 * Module containing data types/schemas for actions sent from backend
 * @module SendActionsData
 */

import Joi from "joi";
import { RequestStatus } from "../promptRequests/request.js";

/**
 * Schema for validating message data.
 * @typedef {Joi.ObjectSchema} ResponseSchema
 * @property {Joi.StringSchema} username - The username of the message sender (required).
 * @property {Joi.ArraySchema} content - Array of message content objects.
 * @property {Joi.StringSchema} content.data - The data of the message content (required).
 * @property {Joi.StringSchema} content.type - The type of the message content (text or image, required).
 */
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

/**
 * Schema for validating message fragment data.
 * @typedef {Joi.ObjectSchema} ResponseFragmentSchema
 * @property {Joi.StringSchema} promptGuid - The prompt GUID for the message fragment (required).
 * @property {Joi.StringSchema} targetGuid - The target GUID for the message fragment (required).
 * @property {Joi.StringSchema} data - The data of the message fragment (required).
 */
export const responseFragmentSchema = Joi.object({
  promptGuid: Joi.string().required(),
  targetGuid: Joi.string().required(),
  data: Joi.string().required(),
  type: Joi.string().required(),
  updateType: Joi.string().required(),
});

/**
 * Schema for validating update prompt state data.
 * @typedef {Joi.ObjectSchema} UpdatePromptStateSchema
 * @property {Joi.StringSchema} guid - The GUID of the prompt (required).
 * @property {Joi.StringSchema} status - The status of the prompt state update (Processed or Completed, required).
 */
export const updatePromptStateSchema = Joi.object({
  guid: Joi.string().required(),
  status: Joi.string()
    .valid(RequestStatus.Processed, RequestStatus.Completed)
    .required(),
});

/**
 * Schema for validating created history data.
 * @typedef {Joi.ObjectSchema} CreatedHistorySchema
 * @property {Joi.StringSchema} guid - The GUID of the created history (required).
 */
export const createdHistorySchema = Joi.object({
  _id: Joi.string().required(),
  timestamp: Joi.date().required(),
});
