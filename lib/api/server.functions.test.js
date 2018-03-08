import Response from "mock-express-response";
import Request from "mock-express-request";
import sinon from "sinon";
import { handleError, failure, listSetupsFactory } from "./server.functions";

describe("server.functions", () => {
  describe("List setups", () => {
    describe("Succesful response", () => {
      it("Supplies the setups to the response", async () => {
        const request = new Request();
        const response = new Response();
        const setups = ["a", "b", "c"];
        const database = {
          collection: () => ({
            find: () => ({
              toArray: func => func(null, setups)
            })
          })
        };

        const listSetups = listSetupsFactory(database);
        await listSetups(request, response);
        expect(response._getJSON()).to.deep.equal(setups);
      });
    });

    describe("Failed response", () => {
      it("Reports failure to the response.", () => {});
    });
  });

  describe("handleError", () => {
    it("Sets a status code to the response", () => {
      const response = new Response();
      handleError(response, "", "");
      expect(response.statusCode).to.equal(500);
    });
    it("Sets error messages to the response", () => {
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
    it("Makes the response fail with given message and status code.", () => {
      const response = new Response();
      const spy = sinon.spy();
      response.json = spy;
      const fail = failure(response, "testing", 404);
      const error = {
        message: "notfound"
      };

      fail(error);

      sinon.assert.calledWith(spy, {
        error: "notfound",
        reason: "testing"
      });

      expect(response.statusCode).to.equal(404);
    });
  });

  describe("Add setup", () => {});

  describe("Delete setup", () => {});

  describe("Clear setups", () => {});
});
