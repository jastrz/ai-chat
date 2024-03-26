export const RequestStatus = {
  Pending: "pending",
  Processed: "processed",
  Completed: "completed",
};

export class Request {
  constructor(id, sessionId, execFunction, onRequestStopped) {
    this.sessionId = sessionId;
    this.status = RequestStatus.Pending;
    this.id = id;
    this.execFunction = execFunction;
    this.onRequestStopped = onRequestStopped;
  }
}
