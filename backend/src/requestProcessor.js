import Joi from "joi";
import EventEmitter from "events";

export const eventEmitter = new EventEmitter();

export class Request {
  constructor(id, sessionId, func) {
    this.sessionId = sessionId;
    this.status = "pending";
    this.id = id;
    this.func = func;
  }
}

let isProcessing = false;
export const requests = [];

const requestSchema = Joi.object({
  status: Joi.string().valid("pending").required(),
  id: Joi.string().required(),
  func: Joi.function().required(),
  sessionId: Joi.string().required(),
});

export function addRequest(request) {
  const { error } = requestSchema.validate(request);
  if (error) {
    console.error("Invalid request format:", error.message);
  } else {
    requests.push(request);
  }
}

export function cancelRequest(id) {
  const index = requests.findIndex((request) => request.id === id);
  if (index !== -1) {
    requests.splice(index, 1);
    console.log(`Request with guid ${id} removed successfully`);
  } else {
    console.error(`Request with guid ${id} not found`);
  }
}

async function processNextRequest() {
  if (!isProcessing && requests.length > 0) {
    isProcessing = true;
    console.log(`requests: ${requests.length}`);
    const request = requests.shift();
    request.status = "processed";
    eventEmitter.emit("onRequestStateChange", request);
    await request.func();
    isProcessing = false;
    request.status = "completed";
    eventEmitter.emit("onRequestStateChange", request);
    processNextRequest();
  }
}

const requestProcessor = setInterval(() => {
  processNextRequest();
}, process.env.REQUEST_PROC_TICK || 1000);
