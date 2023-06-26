"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
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
    host: "mysql-133294-0.cloudclusters.net",
    user: "admin",
    password: "9sz6mKDq",
    database: "lendsqr",
    port: 19984, //process.env.DATABASE_PORT.toString(),
});
exports.query = util_1.default.promisify(connection.query).bind(connection);
exports.connect = util_1.default.promisify(connection.query).bind(connection);
const connectDb = () => __awaiter(void 0, void 0, void 0, function* () {
    // connect to database
    connection.connect((err) => {
        if (err) {
            console.log(err);
            return;
        }
        console.log(`\nconnected to database ${connection.config.host} on port ${connection.config.port} and using ${connection.config.database} database \n\n`);
    });
});
const connectindDB = function () {
    return __awaiter(this, void 0, void 0, function* () {
        const databaseName = process.env.DATABASE_NAME || "lendsqr";
        (0, exports.connect)(`CREATE DATABASE IF NOT EXISTS ${databaseName}`);
        console.log(`\nconnected to database ${connection.config.host} on port ${connection.config.port} and using ${connection.config.database} database \n\n`);
    });
};
const connectDbAsync = () => __awaiter(void 0, void 0, void 0, function* () {
    yield connectindDB();
});
exports.connectDbAsync = connectDbAsync;
exports.db = connection;
exports.default = connectDb;
