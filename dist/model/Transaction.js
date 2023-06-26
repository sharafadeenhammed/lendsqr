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
exports.userTransctions = exports.accountTransctions = exports.findTransction = exports.addTransaction = void 0;
const db_1 = require("../config/db");
const addTransaction = (transaction) => __awaiter(void 0, void 0, void 0, function* () {
    const queryStr = "INSERT INTO transactions SET ?";
    return (0, db_1.query)({ sql: queryStr, values: transaction });
});
exports.addTransaction = addTransaction;
const findTransction = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const queryStr = `SELECT * FROM transactions WHERE id = ${db_1.db.escape(id)}`;
    return (0, db_1.query)(queryStr);
});
exports.findTransction = findTransction;
const accountTransctions = (accountId) => __awaiter(void 0, void 0, void 0, function* () {
    const queryStr = `SELECT * FROM transactions WHERE account_id = ${db_1.db.escape(accountId)} OR beneficiary_account_id = ${db_1.db.escape(accountId)}`;
    return (0, db_1.query)(queryStr);
});
exports.accountTransctions = accountTransctions;
const userTransctions = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const queryStr = `SELECT * FROM transactions WHERE user_id = ${db_1.db.escape(userId)}`;
    return (0, db_1.query)(queryStr);
});
exports.userTransctions = userTransctions;
