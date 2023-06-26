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
exports.updateAccount = exports.findAccounts = exports.findAccountByAccountNumber = exports.findAccount = exports.addAccount = void 0;
const db_1 = require("../config/db");
const addAccount = (userId, accountType, balance, name) => __awaiter(void 0, void 0, void 0, function* () {
    const account = {
        user_id: userId,
        account_number: Date.now().toString().substring(0, 10),
        balance: balance || 0,
        account_type: accountType || "savings",
        account_holder_name: name,
    };
    const queryStr = "INSERT INTO accounts SET ?";
    return (0, db_1.query)({ sql: queryStr, values: account });
});
exports.addAccount = addAccount;
const findAccount = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const queryStr = `SELECT * FROM accounts WHERE id = ${db_1.db.escape(id)}`;
    return (0, db_1.query)(queryStr);
});
exports.findAccount = findAccount;
const findAccountByAccountNumber = (accountNumber) => __awaiter(void 0, void 0, void 0, function* () {
    const queryStr = `SELECT * FROM accounts WHERE account_number = ${db_1.db.escape(accountNumber)}`;
    return (0, db_1.query)(queryStr);
});
exports.findAccountByAccountNumber = findAccountByAccountNumber;
const findAccounts = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const queryStr = `SELECT * FROM accounts WHERE user_id = ${db_1.db.escape(userId)}`;
    return (0, db_1.query)(queryStr);
});
exports.findAccounts = findAccounts;
const updateAccount = (id, amount) => __awaiter(void 0, void 0, void 0, function* () {
    const queryStr = `UPDATE accounts SET balance = ${db_1.db.escape(amount)}  WHERE id = ${db_1.db.escape(id)}  `;
    return (0, db_1.query)(queryStr);
});
exports.updateAccount = updateAccount;
