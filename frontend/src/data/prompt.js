import { generateGUID } from "../utils";

export const PromptStatus = {
  Pending: "pending",
  Processed: "processed",
  Completed: "completed",
};

export class Prompt {
  constructor(message, type, historyId = null, targetGuid = null) {
    this.message = message;
    this.type = type;
    this.guid = generateGUID();
    this.targetGuid = targetGuid === null ? this.guid : targetGuid;
    this.status = PromptStatus.Pending;
    this.historyId = historyId;
  }

  obj() {
    return {
      message: this.message,
      type: this.type,
      guid: this.guid,
      targetGuid: this.targetGuid,
      status: this.status,
      historyId: this.historyId,
    };
  }
}
