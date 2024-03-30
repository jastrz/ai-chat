import { generateGUID } from "../../utils/utils";
import { Request } from "./request";
import { addRequest, requests } from "./requestProcessor";

describe("Request Processor", () => {
  beforeEach(() => {
    requests.length = 0;
  });

  test("addRequest function should add a valid request to the requests array", () => {
    const request = new Request("123", generateGUID(), async () => {
      console.log("Processing request...");
    });

    addRequest(request);

    expect(requests).toContainEqual(request);
  });

  test("addRequest function should not add an invalid request to the requests array", () => {
    // Invalid request object missing guid
    const invalidRequest = {};

    addRequest(invalidRequest);

    expect(requests).not.toContainEqual(invalidRequest);
  });
});
