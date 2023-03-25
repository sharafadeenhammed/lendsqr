"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateAccount = exports.findAccounts = exports.findAccountByAccountNumber = exports.findAccount = exports.addAccount = void 0;
const db_1 = require("../config/db");
const addAccount = async (userId, accountType, balance, name) => {
    const account = {
        user_id: userId,
        account_number: Date.now().toString().substring(0, 10),
        balance: balance || 0,
        account_type: accountType || "savings",
        account_holder_name: name,
    };
    const queryStr = "INSERT INTO accounts SET ?";
    return (0, db_1.query)({ sql: queryStr, values: account });
};
exports.addAccount = addAccount;
const findAccount = async (id) => {
    const queryStr = `SELECT * FROM accounts WHERE id = ${db_1.db.escape(id)}`;
    return (0, db_1.query)(queryStr);
};
exports.findAccount = findAccount;
const findAccountByAccountNumber = async (accountNumber) => {
    const queryStr = `SELECT * FROM accounts WHERE account_number = ${db_1.db.escape(accountNumber)}`;
    return (0, db_1.query)(queryStr);
};
exports.findAccountByAccountNumber = findAccountByAccountNumber;
const findAccounts = async (userId) => {
    const queryStr = `SELECT * FROM accounts WHERE user_id = ${db_1.db.escape(userId)}`;
    return (0, db_1.query)(queryStr);
};
exports.findAccounts = findAccounts;
const updateAccount = async (id, amount) => {
    const queryStr = `UPDATE accounts SET balance = ${db_1.db.escape(amount)}  WHERE id = ${db_1.db.escape(id)}  `;
    return (0, db_1.query)(queryStr);
};
exports.updateAccount = updateAccount;
