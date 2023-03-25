"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addUser = exports.findUser = void 0;
const db_1 = require("../config/db");
const findUser = async (email) => {
    const queryStr = `SELECT * FROM users WHERE email = ${db_1.db.escape(email)}`;
    return (0, db_1.query)(queryStr);
};
exports.findUser = findUser;
const addUser = async (user) => {
    const queryStr = "INSERT INTO users SET ?";
    return (0, db_1.query)({ sql: queryStr, values: user });
};
exports.addUser = addUser;
