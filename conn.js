const { MongoClient, ObjectID } = require('mongodb');
const util = require('util');
require("dotenv").config({ path: "./config.env" });
util.promisify(MongoClient.connect);

let dbConnection;

const connect = async () => {
    try {
        const client = await MongoClient.connect("mongodb+srv://business0only0contact:CartK1e90ImGTdLM@cluster0.vzru60z.mongodb.net/test");
        dbConnection = client.db("weebsData");
    } catch (e) {
        throw new Error(`Could not establish database connection: ${e}`);
    }
};

const mongoClient = async () => {
    if (!dbConnection) {
        await connect();
    }
    return dbConnection;
};

module.exports = {
    mongoClient,
    ObjectID
};
