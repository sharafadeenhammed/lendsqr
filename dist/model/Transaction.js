"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userTransctions = exports.accountTransctions = exports.findTransction = exports.addTransaction = void 0;
const db_1 = require("../config/db");
const addTransaction = async (transaction) => {
    const queryStr = "INSERT INTO transactions SET ?";
    return (0, db_1.query)({ sql: queryStr, values: transaction });
};
exports.addTransaction = addTransaction;
const findTransction = async (id) => {
    const queryStr = `SELECT * FROM transactions WHERE id = ${db_1.db.escape(id)}`;
    return (0, db_1.query)(queryStr);
};
exports.findTransction = findTransction;
const accountTransctions = async (accountId) => {
    const queryStr = `SELECT * FROM transactions WHERE account_id = ${db_1.db.escape(accountId)} OR beneficiary_account_id = ${db_1.db.escape(accountId)}`;
    return (0, db_1.query)(queryStr);
};
exports.accountTransctions = accountTransctions;
const userTransctions = async (userId) => {
    const queryStr = `SELECT * FROM transactions WHERE user_id = ${db_1.db.escape(userId)}`;
    return (0, db_1.query)(queryStr);
};
exports.userTransctions = userTransctions;
