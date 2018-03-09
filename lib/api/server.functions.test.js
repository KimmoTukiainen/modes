import Response from "mock-express-response";
import Request from "mock-express-request";
import Setup from "../api/Setup";
import sinon from "sinon";
import {
  listSetupsFactory,
  addSetupFactory,
  deleteSetupFactory,
  clearSetupsFactory
} from "./server.functions";

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

    describe("Failed request", () => {
      it("Adds a status code to the response.", async () => {
        const request = new Request();
        const response = new Response();
        const database = {
          collection: () => ({
            find: () => ({
              toArray: func => {
                throw new Error("Something happened");
              }
            })
          })
        };

        const listSetups = listSetupsFactory(database);
        await listSetups(request, response);
        expect(response.statusCode).to.equal(500);
      });
      it("Reports failure to the response.", async () => {
        const request = new Request();
        const response = new Response();
        const spy = sinon.spy();
        response.json = spy;
        const database = {
          collection: () => ({
            find: () => ({
              toArray: func => {
                throw new Error("Something happened");
              }
            })
          })
        };

        const listSetups = listSetupsFactory(database);
        await listSetups(request, response);
        sinon.assert.calledWith(spy, {
          error: "Something happened"
        });
      });
    });
  });

  describe("Add setup", () => {
    it("Returns an error code if given Setup is not valid.", async () => {
      const request = new Request();
      const response = new Response();
      const setup = null;
      const database = {
        collection: () => ({
          insertOne: func => func(null, setup)
        })
      };

      const addSetup = addSetupFactory(database);
      await addSetup(request, response);
      expect(response.statusCode).to.equal(400);
    });

    it("Returns the added Setup in the request with id included.", async () => {
      const request = new Request();
      const response = new Response();
      const stub = sinon.stub();
      response.json = stub;

      const setupData = {
        mode: "mixolydian",
        key: "E",
        amount: 6
      };
      request.body = setupData;

      // pass response ops 0 to
      // the second parameter of func

      const database = {
        collection: () => ({
          insertOne: (setup, func) =>
            func(null, {
              ops: [Object.assign({ _id: "123456QWERTY" }, setupData)]
            })
        })
      };

      const addSetup = addSetupFactory(database);
      await addSetup(request, response);

      const addedSetup = stub.getCall(0).args[0];
      expect(
        addedSetup.hasOwnProperty("_id") && addedSetup["_id"].length > 0
      ).to.equal(true);
    });
  });

  describe("Delete setup", () => {
    it("Returns an error when no id is provided", async () => {
      const request = new Request();
      const response = new Response();

      const database = {
        collection: () => ({
          deleteOne: (obj, func) => func(null, null)
        })
      };
      const deleteSetup = deleteSetupFactory(database);
      await deleteSetup(request, response);
      expect(response.statusCode).to.equal(400);
    });

    it("Returns 204 on a successful deletion", async () => {
      const request = new Request();
      const response = new Response();
      request.params = {
        id: "123456QWERTY"
      };
      const database = {
        collection: () => ({
          deleteOne: (obj, func) => func(null, null)
        })
      };
      const deleteSetup = deleteSetupFactory(database);
      await deleteSetup(request, response);
      expect(response.statusCode).to.equal(204);
    });
  });

  describe("Clear setups", () => {
    it("Returns a 204 on a succesful clear.", async () => {
      const request = new Request();
      const response = new Response();
      const database = {
        collection: () => ({
          deleteMany: (obj, func) => func(null, null)
        })
      };
      const clearSetups = clearSetupsFactory(database);
      await clearSetups(request, response);
      expect(response.statusCode).to.equal(204);
    });
  });
});
