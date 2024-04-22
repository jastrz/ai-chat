import { generateGUID } from "../utils";

export class Message {
  constructor(data) {
    this.username = data.username;
    this.content = data.content || this.createContent();
    this.guid = data.guid || generateGUID();
    this.prompt = data.prompt || null;
    this.messageTarget = data.messageTarget || undefined;
    this.timestamp = new Date().toString();
  }

  createContent() {
    return [{ type: "text", data: "" }];
  }

  obj() {
    return {
      username: this.username,
      content: this.content,
      guid: this.guid,
      prompt: this.prompt,
      messageTarget: this.messageTarget,
      timestamp: this.timestamp,
    };
  }
}
