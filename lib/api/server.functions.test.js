import Response from "mock-express-response";
import sinon from "sinon";
import { handleError, createListSetupsCallback } from "./server.functions";

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
      handleError(response, "error", "reason");
      sinon.assert.calledWith(spy, {
          error: "error", 
          reason: "reason"
      });
    });
  });

  describe("createListSetupsCallback", () => {
    it("nada", () => {
        expect(false).to.equal(true);
    });
  });
});
