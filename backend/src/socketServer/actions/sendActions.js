/**
 * Module containing different types of actions for sending messages, updates, and history.
 * @module SendActions
 */

import * as validators from "./sendActionsValidators.js";

/**
 * Object representing various types of actions for sending messages. Messages are sent usign session.broadcast(SendAction action, data).
 * Data to be sent is specified in sendActionsValidators.js / {@link module:SendActionsData|SendActionsData} module
 * @typedef {Object} SendActions
 * @property {Object} Message - Represents the message action.
 * @property {Object} MessageFragment - Represents the message fragment action.
 * @property {Object} UpdatePromptState - Represents the update prompt state action.
 * @property {Object} SetCreatedHistory - Represents the set created history action.
 */
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
