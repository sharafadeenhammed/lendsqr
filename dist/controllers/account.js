"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAccounts = exports.getAccount = void 0;
const Account_1 = require("../model/Account");
const errorResponse_1 = __importDefault(require("../utils/errorResponse"));
const asyncHandler_1 = __importDefault(require("../utils/asyncHandler"));
//@route GET /api/v1/auth/account/:id
//@desc  get single account
//@access PRIVATE
exports.getAccount = (0, asyncHandler_1.default)(async (req, res, next) => {
    const id = parseInt(req.params.id, 10);
    let account = await (0, Account_1.findAccount)(id);
    // check if account is succesfully fetched...
    if (!account || account.length === 0) {
        return next(new errorResponse_1.default(`account with the id of ${req.params.id} not found`, 404));
    }
    account = JSON.parse(JSON.stringify(account[0]));
    // check if account belongs to user.
    if (account.user_id !== req.user.id) {
        return next(new errorResponse_1.default("not unauthorized to access this account", 401));
    }
    res.status(200).json({
        success: true,
        data: account,
    });
});
//@route GET /api/v1/auth/account/user
//@desc  get account related to user
//@access PRIVATE
exports.getAccounts = (0, asyncHandler_1.default)(async (req, res, next) => {
    const userId = parseInt(req.user.id, 10);
    let accounts = await (0, Account_1.findAccounts)(userId);
    // check if account found;
    if (!accounts || accounts.length === 0) {
        return next(new errorResponse_1.default(`no account associated to user with the id ${userId} found`, 404));
    }
    accounts = JSON.parse(JSON.stringify(accounts));
    res.status(200).json({
        success: true,
        count: accounts.length || 0,
        data: accounts,
    });
});
