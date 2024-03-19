export const RequestStatus = {
  Pending: "pending",
  Processed: "processed",
  Completed: "completed",
};

export class Request {
  constructor(id, sessionId, func) {
    this.sessionId = sessionId;
    this.status = RequestStatus.Pending;
    this.id = id;
    this.func = func;
  }
}
