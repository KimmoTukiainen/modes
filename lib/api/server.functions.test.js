import Response from "mock-express-response";
import sinon from "sinon";
import { handleError, failure } from "./server.functions";

describe("server.functions", () => {
  describe("handleError", () => {
    it("Sets an error message to the response", () => {
      const response = new Response();
      handleError(response, "", "");
      expect(response.statusCode).to.equal(500);
    });
    it("Sets an error message to the response", () => {
      const response = new Response();
      const spy = sinon.spy();
      response.json = spy;
      handleError(response, { message: "error" }, "reason");
      sinon.assert.calledWith(spy, {
        error: "error",
        reason: "reason"
      });
    });
  });
  describe("failure", () => {
    it("provides utility for handling errors", () => {
      const response = new Response();
      const spy = sinon.spy();
      response.json = spy;
      const callFailure = failure(response, "testing", 404);
      const error = {
        message: "notfound"
      };

      callFailure(error);

      sinon.assert.calledWith(spy, {
        error: "notfound",
        reason: "testing"
      });

      expect(response.statusCode).to.equal(404);
    });
  });
});
