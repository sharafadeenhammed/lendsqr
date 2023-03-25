"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = __importDefault(require("./config/db"));
// connecting to database
db_1.default;
// seeding database
if (process.argv[2] === "--seed-user") {
}
process.exit(0);
const tables = [];
