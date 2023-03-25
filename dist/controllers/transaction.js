"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userTransaction = exports.getTransactions = exports.getTransaction = exports.makeTransaction = void 0;
const asyncHandler_1 = __importDefault(require("../utils/asyncHandler"));
const errorResponse_1 = __importDefault(require("../utils/errorResponse"));
const Transaction_1 = require("../model/Transaction");
const Account_1 = require("../model/Account");
// @route POST /api/v1/transaction/account/:id
// @desc  make transfer
// @access PRIVATE
exports.makeTransaction = (0, asyncHandler_1.default)(async (req, res, next) => {
    let senderAccount = await (0, Account_1.findAccount)(parseInt(req.params.id, 10));
    if (!senderAccount || senderAccount.length === 0) {
        return next(new errorResponse_1.default("sender account not found", 404));
    }
    senderAccount = JSON.parse(JSON.stringify(senderAccount[0]));
    // check if account belongs to the logged in user
    if (req.user.id !== senderAccount.user_id) {
        return next(new errorResponse_1.default("unauthorized operation on account", 401));
    }
    // check if insufficient fund
    if (senderAccount.balance < req.body.amount) {
        return next(new errorResponse_1.default("insufficient fund", 400));
    }
    // check request body data
    let amount = req.body.amount;
    let accountNumber = req.body.beneficiaryAccount;
    if (!amount || !accountNumber) {
        return next(new errorResponse_1.default("include beneficiaryAccount and amount in body", 400));
    }
    console.log("okay till data check");
    // find beneficaiary account
    let beneficiaryAccount = await (0, Account_1.findAccountByAccountNumber)(parseInt(req.body.beneficiaryAccount, 10));
    console.log("beneficiary account found");
    if (!beneficiaryAccount || beneficiaryAccount.length === 0) {
        return next(new errorResponse_1.default("beneficiary account not found", 404));
    }
    beneficiaryAccount = JSON.parse(JSON.stringify(beneficiaryAccount[0]));
    // check if beneficiary account is different from the sender account
    if (beneficiaryAccount.id === senderAccount.id) {
        return next(new errorResponse_1.default(`same account to transaction`, 400));
    }
    // credit the beneficiary account
    amount = beneficiaryAccount.balance + req.body.amount;
    await (0, Account_1.updateAccount)(beneficiaryAccount.id, amount);
    // debit the sender account
    amount = senderAccount.balance - req.body.amount;
    await (0, Account_1.updateAccount)(senderAccount.id, amount || 0);
    //generate beneficiary transaction receipt
    await (0, Transaction_1.addTransaction)({
        amount: req.body.amount,
        beneficiary_account_id: beneficiaryAccount.id,
        beneficiary_account_number: beneficiaryAccount.account_number,
        beneficiary_id: beneficiaryAccount.user_id,
        beneficiary_name: beneficiaryAccount.account_holder_name,
        sender_account_id: senderAccount.id,
        sender_account_number: senderAccount.account_number,
        sender_id: senderAccount.user_id,
        sender_name: senderAccount.account_holder_name,
        user_id: beneficiaryAccount.user_id,
        account_id: beneficiaryAccount.id,
    });
    //generate sender transaction receipt
    await (0, Transaction_1.addTransaction)({
        amount: req.body.amount,
        beneficiary_account_id: beneficiaryAccount.id,
        beneficiary_account_number: beneficiaryAccount.account_number,
        beneficiary_id: beneficiaryAccount.user_id,
        beneficiary_name: beneficiaryAccount.account_holder_name,
        sender_account_id: senderAccount.id,
        sender_account_number: senderAccount.account_number,
        sender_id: senderAccount.user_id,
        sender_name: senderAccount.account_holder_name,
        user_id: senderAccount.user_id,
        account_id: senderAccount.id,
    });
    res.status(200).json({
        success: true,
        data: {
            amount: req.body.amount,
            beneficiary_account_id: beneficiaryAccount.id,
            beneficiary_account_number: beneficiaryAccount.account_number,
            beneficiary_id: beneficiaryAccount.user_id,
            beneficiary_name: beneficiaryAccount.account_holder_name,
            sender_account_id: senderAccount.id,
            sender_account_number: senderAccount.account_number,
            sender_id: senderAccount.user_id,
            sender_name: senderAccount.account_holder_name,
            user_id: senderAccount.user_id,
            account_id: senderAccount.id,
        },
    });
});
// @route GET /api/v1/transaction/:id
// @desc  get single transaction
// @access PRIVATE
exports.getTransaction = (0, asyncHandler_1.default)(async (req, res, next) => {
    const id = parseInt(req.params.id, 10);
    let transaction = await (0, Transaction_1.findTransction)(id);
    if (!transaction || transaction.length === 0) {
        return next(new errorResponse_1.default(`transaction with the id of ${id} not found`, 404));
    }
    // check if transaction belongs to user
    if (!transaction.user_id || req.user.id) {
        return next(new errorResponse_1.default(`unauthorized transaction access "id: ${id}"`, 401));
    }
    transaction = JSON.parse(JSON.stringify(transaction[0]));
    res.status(200).json({
        success: true,
        data: transaction,
    });
});
// @route GET /api/v1/transaction/account/:id
// @desc  get all transaction associated to an account
// @access PRIVATE
exports.getTransactions = (0, asyncHandler_1.default)(async (req, res, next) => {
    const id = parseInt(req.params.id, 10);
    let transactions = await (0, Transaction_1.accountTransctions)(id);
    if (!transactions || transactions.length === 0) {
        return next(new errorResponse_1.default(`transactions for account with the id of ${id} not found`, 404));
    }
    transactions = JSON.parse(JSON.stringify(transactions));
    res.status(200).json({
        success: true,
        count: transactions.length,
        data: transactions,
    });
});
// @route GET /api/v1/transaction
// @desc  get all transaction associated to user
// @access PRIVATE
exports.userTransaction = (0, asyncHandler_1.default)(async (req, res, next) => {
    const id = parseInt(req.user.id, 10);
    let transactions = await (0, Transaction_1.userTransctions)(id);
    if (!transactions || transactions.length === 0) {
        return next(new errorResponse_1.default(`transactions for user with the id of ${id} not found`, 404));
    }
    transactions = JSON.parse(JSON.stringify(transactions));
    res.status(200).json({
        success: true,
        count: transactions.length,
        data: transactions,
    });
});
