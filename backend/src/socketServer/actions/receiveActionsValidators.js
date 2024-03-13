import Joi from "joi";

export const promptSchema = Joi.object({
  message: Joi.string().required(),
  type: Joi.string().valid("text", "image").required(),
  guid: Joi.string().required(),
  targetGuid: Joi.string().required(),
  status: Joi.string().valid("pending"),
  historyId: Joi.string().optional().allow("", null),
});

export const textPromptSettingsSchema = Joi.object({
  temperature: Joi.number().required().min(0).max(1),
  topP: Joi.number().required().min(0).max(1),
  topK: Joi.number().required().min(0).max(100),
});

export const imageGenPromptSettingsSchema = Joi.object({
  height: Joi.number().integer().required().min(64),
  width: Joi.number().integer().required().min(64),
  numImages: Joi.number().integer().required().min(1).max(12),
  negativePrompt: Joi.string().optional().allow(""),
});
