import Joi from "joi";
import EventEmitter from "events";
import { RequestStatus } from "./request.js";

const requestSchema = Joi.object({
  status: Joi.string().valid(RequestStatus.Pending).required(),
  id: Joi.string().required(),
  execFunction: Joi.function().required(),
  onRequestStopped: Joi.function().optional().allow(null),
  sessionId: Joi.string().required(),
});

export const RequestProcessorEvents = {
  RequestStateChanged: "requestStateChanged",
};

class RequestProcessor {
  static instance = null;
  stateChangeEventEmitter = new EventEmitter();

  isProcessing = false;
  requests = [];
  requestProcessingInterval = null;

  start() {
    if (!this.requestProcessingInterval) {
      this.requestProcessingInterval = setInterval(() => {
        this.processNextRequest();
      }, process.env.REQUEST_PROC_TICK || 1000);
    }
  }

  stop() {
    if (this.requestProcessingInterval) {
      clearInterval(this.requestProcessingInterval);
      this.requestProcessingInterval = null;
    }
  }

  addRequest(request) {
    const { error } = requestSchema.validate(request);
    if (error) {
      console.error("Invalid request format:", error.message);
    } else {
      this.requests.push(request);
    }
  }

  async cancelRequest(id) {
    const index = this.requests.findIndex((request) => request.id === id);
    if (index !== -1 && this.requests[index]) {
      if (this.requests[index].status === RequestStatus.Pending) {
        this.requests.splice(index, 1);
        console.log(`Request with guid ${id} removed successfully`);
      } else if (this.requests[index].status === RequestStatus.Processed) {
        console.log("Stopping request ");
        await this.requests[index].onRequestStopped();
      }
    } else {
      console.error(`Request with guid ${id} not found`);
    }
  }

  async processNextRequest() {
    if (!this.isProcessing && this.requests.length > 0) {
      this.isProcessing = true;
      console.log(`requests: ${this.requests.length}`);
      const request = this.requests[0];
      try {
        request.status = RequestStatus.Processed;
        this.stateChangeEventEmitter.emit(
          RequestProcessorEvents.RequestStateChanged,
          request
        );
        await request.execFunction();
        this.isProcessing = false;
        request.status = RequestStatus.Completed;
        this.stateChangeEventEmitter.emit(
          RequestProcessorEvents.RequestStateChanged,
          request
        );
        this.requests.shift();
      } catch (error) {
        console.error(
          `Error processing request ${request.id}, error: ${error}`
        );
      }

      this.processNextRequest();
    }
  }
}

export const requestProcessor = new RequestProcessor();
