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
const db_1 = require("./config/db");
const path_1 = __importDefault(require("path"));
const dotenv_1 = __importDefault(require("dotenv"));
// load enviroment variables...
dotenv_1.default.config({ path: path_1.default.join(__dirname, "../", "config.env") });
console.log("database name: ", process.env.DATABASE_NAME);
(0, db_1.connectDbAsync)();
// add more item to databases array to create more database
const dataBases = ["lendsqr"];
// create databases
if (process.argv[2] === "--migrate-dbs") {
    dataBases.forEach((database) => {
        db_1.db.query(`CREATE DATABASE IF NOT EXISTS ${database}`, (err, result, field) => {
            if (err) {
                console.log("database creation failed");
                return;
            }
            console.log(result);
        });
    });
}
const tables = [
    {
        tableName: "users",
        tableFields: [
            "id INT AUTO_INCREMENT NOT NULL UNIQUE",
            "first_name VARCHAR(255) NOT NULL",
            "last_name VARCHAR(255) NOT NULL",
            "email VARCHAR(255) NOT NULL UNIQUE ",
            "password VARCHAR(255)",
            "balance float",
            "age INT NOT NULL",
            "phone_number VARCHAR(255) NOT NULL UNIQUE",
            "created_at TIMESTAMP",
            "address VARCHAR(255)",
            "account_deleted binary",
            "password_reset_token VARCHAR(255)",
            "token_expiration VARCHAR(255)",
        ],
        primaryKey: "id",
    },
    {
        tableName: "transactions",
        tableFields: [
            "id INT AUTO_INCREMENT NOT NULL UNIQUE",
            "user_id INT NOT NULL",
            "account_id INT NOT NULL",
            "sender_name VARCHAR(255) NOT NULL",
            "sender_account_number VARCHAR(255)",
            "sender_account_id INT",
            "sender_id INT",
            "beneficiary_name VARCHAR(255) NOT NULL",
            "beneficiary_account_number VARCHAR(255)",
            "beneficiary_account_id INT",
            "beneficiary_id INT",
            "amount FLOAT",
            "created_at TIMESTAMP",
        ],
        primaryKey: "id",
    },
    {
        tableName: "accounts",
        tableFields: [
            "id INT AUTO_INCREMENT NOT NULL UNIQUE",
            "user_id INT NOT NULL",
            "balance FLOAT",
            "account_number VARCHAR(255) NOT NULL UNIQUE",
            "created_at TIMESTAMP",
            "account_type VARCHAR(255) NOT NULL",
            "account_holder_name VARCHAR(255) NOT NULL",
        ],
        primaryKey: "id",
    },
];
if (process.argv[2] === "--migrate-tbs") {
    tables.forEach((table) => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield (0, db_1.query)(`CREATE TABLE IF NOT EXISTS ${table.tableName}(${table.tableFields.join(", ")}, PRIMARY KEY(${table.primaryKey})) `);
        console.log(result);
    }));
}
if (process.argv[2] === "--migration-rollback") {
}
