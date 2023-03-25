"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = exports.connectDbAsync = exports.connect = exports.query = void 0;
// const mysql = require("mysql");
const mysql_1 = __importDefault(require("mysql"));
const util_1 = __importDefault(require("util"));
// create connection
const connection = mysql_1.default.createConnection({
    host: "mysql-117565-0.cloudclusters.net",
    user: "admin",
    password: "AmEgwTBs",
    database: "lendsqr",
    port: 10036, //process.env.DATABASE_PORT.toString(),
});
exports.query = util_1.default.promisify(connection.query).bind(connection);
exports.connect = util_1.default.promisify(connection.query).bind(connection);
const connectDb = async () => {
    // connect to database
    connection.connect((err) => {
        if (err) {
            console.log(err);
            return;
        }
        console.log(`\nconnected to database ${connection.config.host} on port ${connection.config.port} and using ${connection.config.database} database \n\n`);
    });
};
const connectindDB = async function () {
    const databaseName = process.env.DATABASE_NAME || "lendsqr";
    (0, exports.connect)(`CREATE DATABASE IF NOT EXISTS ${databaseName}`);
    console.log(`\nconnected to database ${connection.config.host} on port ${connection.config.port} and using ${connection.config.database} database \n\n`);
};
const connectDbAsync = async () => {
    await connectindDB();
};
exports.connectDbAsync = connectDbAsync;
exports.db = connection;
exports.default = connectDb;
