import { generateGUID } from "../utils";

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
    const time = new Date();
    return time.toISOString().slice(0, 19).replace("T", " ");
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
