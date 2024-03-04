import { generateGUID } from "./utils";

export function getPrompt(type, message) {
  let prompt = {
    username: message.username,
    message: message.content[0].data,
    type: type,
    guid: generateGUID(),
  };

  return prompt;
}
