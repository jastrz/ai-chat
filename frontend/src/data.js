import { propTypesMax } from "@material-tailwind/react/types/components/slider";
import { generateGUID } from "./utils";

export class Message {
  promptGuid;

  constructor(username, content = null, guid = null) {
    this.username = username;
    this.content = content === null ? this.createContent() : content;
    this.guid = guid === null ? generateGUID() : guid;
  }

  createContent() {
    return [{ type: "text", data: "" }];
  }

  toJSON() {
    return {
      username: this.username,
      content: this.content,
      guid: this.guid,
      promptGuid: this.promptGuid,
    };
  }
}

export class Prompt {
  constructor(message, type, targetGuid = null) {
    this.message = message;
    this.type = type;
    this.guid = generateGUID();
    this.targetGuid = targetGuid === null ? this.guid : targetGuid;
    this.status = "pending";
  }

  toJSON() {
    return {
      message: this.message,
      type: this.type,
      guid: this.guid,
      targetGuid: this.targetGuid,
      status: this.status,
    };
  }
}
