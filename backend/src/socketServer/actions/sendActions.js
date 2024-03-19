import * as validators from "./sendActionsValidators.js";

export const SendActions = {
  Message: { name: "message", validator: validators.responseSchema },
  MessageFragment: {
    name: "messageFragment",
    validator: validators.responseFragmentSchema,
  },
  UpdatePromptState: {
    name: "promptStateChanged",
    validator: validators.updatePromptStateSchema,
  },
  SetCreatedHistory: {
    name: "setCreatedHistory",
    validator: validators.createdHistorySchema,
  },
};
