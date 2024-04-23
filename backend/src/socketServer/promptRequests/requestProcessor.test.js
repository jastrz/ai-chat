import { generateGUID } from "../../utils/utils";
import { Request } from "./request";
import { requestProcessor } from "./requestProcessor";

describe("Request Processor", () => {
  beforeEach(() => {
    requestProcessor.requests.length = 0;
  });

  test("addRequest function should add a valid request to the requests array", () => {
    const request = new Request("123", generateGUID(), async () => {
      console.log("Processing request...");
    });
    requestProcessor.start();
    requestProcessor.addRequest(request);
    requestProcessor.stop();

    expect(requestProcessor.requests).toContainEqual(request);
  });

  test("addRequest function should not add an invalid request to the requests array", () => {
    // Invalid request object
    const invalidRequest = {};
    requestProcessor.start();
    requestProcessor.addRequest(invalidRequest);
    requestProcessor.stop();

    expect(requestProcessor.requests).not.toContainEqual(invalidRequest);
  });
});
