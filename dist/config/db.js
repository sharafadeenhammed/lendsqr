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
exports.db = exports.connectindDBReq = exports.connectDbMigration = exports.connectDbAsync = exports.connect = exports.query = void 0;
const mysql_1 = __importDefault(require("mysql"));
const util_1 = __importDefault(require("util"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config({ path: "../../config.env" });
// create connection
const connection = mysql_1.default.createConnection({
    host: process.env.DATABASE_HOST || "sql7.freemysqlhosting.net",
    user: process.env.DATABASE_USERNAME || "sql7630373",
    password: process.env.DATABASE_PASSWORD || "zJXDPrc2vg",
    database: process.env.DATABASE_NAME || "sql7630373",
    port: Number(process.env.DATABASE_PORT) || 3306,
});
const connectionForDbMigrationOnly = mysql_1.default.createConnection({
    host: process.env.DATABASE_HOST || "sql7.freemysqlhosting.netr",
    user: process.env.DATABASE_USERNAME || "sql7630373",
    password: process.env.DATABASE_PASSWORD || "zJXDPrc2vg",
    port: Number(process.env.DATABASE_PORT) || 3306,
});
exports.query = util_1.default.promisify(connection.query).bind(connection);
exports.connect = util_1.default.promisify(connection.connect).bind(connection);
const connectionForDbMigration = util_1.default
    .promisify(connectionForDbMigrationOnly.connect)
    .bind(connectionForDbMigrationOnly);
const connectindDB = function () {
    return __awaiter(this, void 0, void 0, function* () {
        yield (0, exports.connect)();
        console.log(`\nconnected to database ${connection.config.host} on port ${connection.config.port} and using ${connection.config.database} database \n\n`);
    });
};
const connectDbAsync = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield connectindDB();
    }
    catch (error) {
        console.log("Error: cannot connect to database");
        console.log("\n\n", error);
        console.log("\n exiting process");
        process.exit(1);
    }
});
exports.connectDbAsync = connectDbAsync;
const connectDbMigration = () => __awaiter(void 0, void 0, void 0, function* () {
    yield connectionForDbMigration();
});
exports.connectDbMigration = connectDbMigration;
exports.connectindDBReq = connectindDB;
exports.db = connection;
