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
Object.defineProperty(exports, "__esModule", { value: true });
exports.addUser = exports.findUser = void 0;
const db_1 = require("../config/db");
const findUser = (email) => __awaiter(void 0, void 0, void 0, function* () {
    const queryStr = `SELECT * FROM users WHERE email = ${db_1.db.escape(email)}`;
    return (0, db_1.query)(queryStr);
});
exports.findUser = findUser;
const addUser = (user) => __awaiter(void 0, void 0, void 0, function* () {
    const queryStr = "INSERT INTO users SET ?";
    return (0, db_1.query)({ sql: queryStr, values: user });
});
exports.addUser = addUser;
