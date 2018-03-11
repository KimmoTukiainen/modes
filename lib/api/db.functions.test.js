import {} from "dotenv/config";
import { connect, loadSetups } from "./db.functions";

describe("db.functions", () => {
    describe("Database connection", () => {
        it("Throws an error on misconfiguration", async () => {
            const notConnect = () => connect(null)
            expect(notConnect).to.throw(); 
        });
        
        /*
        // Note: won't really connect unless mongo is running
        it("Connects to the database", async () => {
            const connection = await connect(process.env.MONGODB_URI);
            expect(connection).to.be.an("object");
        });

        // Note: won't really connect unless mongo is running
        it("Gives an error on not connecting.", async () => {
            const connection = await connect("mongodb://localhost/definitelynotavaliduri");
            expect(connection.error).to.be.an("object");
        }); */
    });

    
    describe("loadSetups", async () => {
        /*
        const connection = await connect(process.env.MONGODB_URI);
        const setups = await loadSetups(connection.database);
        console.log("setups", setups); 
        */
    });
});

