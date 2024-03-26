import Joi from "joi";
import EventEmitter from "events";
import { RequestStatus } from "./request.js";

export const stateChangeEventEmitter = new EventEmitter();

let isProcessing = false;
export const requests = [];

const requestSchema = Joi.object({
  status: Joi.string().valid(RequestStatus.Pending).required(),
  id: Joi.string().required(),
  execFunction: Joi.function().required(),
  onRequestStopped: Joi.function().optional().allow(null),
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

export async function cancelRequest(id) {
  const index = requests.findIndex((request) => request.id === id);
  if (index !== -1 && requests[index]) {
    if (requests[index].status === RequestStatus.Pending) {
      requests.splice(index, 1);
      console.log(`Request with guid ${id} removed successfully`);
    } else if (requests[index].status === RequestStatus.Processed) {
      console.log("Stopping request ");
      await requests[index].onRequestStopped();
    }
  } else {
    console.error(`Request with guid ${id} not found`);
  }
}

async function processNextRequest() {
  if (!isProcessing && requests.length > 0) {
    isProcessing = true;
    console.log(`requests: ${requests.length}`);
    const request = requests[0];
    try {
      request.status = RequestStatus.Processed;
      stateChangeEventEmitter.emit("onRequestStateChange", request);
      await request.execFunction();
      isProcessing = false;
      request.status = RequestStatus.Completed;
      stateChangeEventEmitter.emit("onRequestStateChange", request);
      requests.shift();
    } catch (error) {
      console.error(`Error processing request ${request.id}, error: ${error}`);
    }

    processNextRequest();
  }
}

const requestProcessor = setInterval(() => {
  processNextRequest();
}, process.env.REQUEST_PROC_TICK || 1000);
