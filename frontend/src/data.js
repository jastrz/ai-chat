import { generateGUID } from "./utils";

export class Message {
  promptGuid;

  constructor(username, content = null, guid = null) {
    this.username = username;
    this.content = content === null ? this.createContent() : content;
    this.guid = guid === null ? generateGUID() : guid;
    this.timestamp = this.getTimestamp();
  }

  createContent() {
    return [{ type: "text", data: "" }];
  }

  getTimestamp() {
    const now = new Date();
    return now.toISOString().slice(0, 19).replace("T", " ");
  }

  obj() {
    return {
      username: this.username,
      content: this.content,
      guid: this.guid,
      promptGuid: this.promptGuid,
      timestamp: this.timestamp,
    };
  }
}

export const PromptStatus = {
  Pending: "pending",
  Processed: "processed",
  Completed: "completed",
};

export class Prompt {
  constructor(message, type, targetGuid = null) {
    this.message = message;
    this.type = type;
    this.guid = generateGUID();
    this.targetGuid = targetGuid === null ? this.guid : targetGuid;
    this.status = PromptStatus.Pending;
  }

  obj() {
    return {
      message: this.message,
      type: this.type,
      guid: this.guid,
      targetGuid: this.targetGuid,
      status: this.status,
    };
  }
}
