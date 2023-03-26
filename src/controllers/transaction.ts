import asyncHandeler from "../utils/asyncHandler";
import ErrorResponse from "../utils/errorResponse";
import {
  findTransction,
  addTransaction,
  accountTransctions,
  userTransctions,
} from "../model/Transaction";
import {
  findAccount,
  findAccountByAccountNumber,
  updateAccount,
} from "../model/Account";
import { Req, Res, Next } from "../utils/interface";

// @route POST /api/v1/transaction/account/:id
// @desc  make transfer
// @access PRIVATE
export const makeTransaction = asyncHandeler(
  async (req: Req, res: Res, next: Next) => {
    let senderAccount: any = await findAccount(parseInt(req.params.id, 10));
    if (!senderAccount || senderAccount.length === 0) {
      return next(new ErrorResponse("sender account not found", 404));
    }
    senderAccount = JSON.parse(JSON.stringify(senderAccount[0]));
    // check if account belongs to the logged in user
    if (req.user.id !== senderAccount.user_id) {
      return next(new ErrorResponse("unauthorized operation on account", 401));
    }
    // check if insufficient fund
    if (senderAccount.balance < req.body.amount) {
      return next(new ErrorResponse("insufficient fund", 400));
    }
    // check request body data
    let amount: number = req.body.amount;
    let accountNumber: number = req.body.beneficiaryAccount;
    if (!amount || !accountNumber || amount < 0) {
      return next(
        new ErrorResponse(
          "include a beneficiaryAccount and amount in body",
          400
        )
      );
    }
    console.log("okay till data check");
    // find beneficaiary account
    let beneficiaryAccount: any = await findAccountByAccountNumber(
      parseInt(req.body.beneficiaryAccount, 10)
    );

    console.log("beneficiary account found");
    if (!beneficiaryAccount || beneficiaryAccount.length === 0) {
      return next(new ErrorResponse("beneficiary account not found", 404));
    }
    beneficiaryAccount = JSON.parse(JSON.stringify(beneficiaryAccount[0]));
    // check if beneficiary account is different from the sender account
    if (beneficiaryAccount.id === senderAccount.id) {
      return next(new ErrorResponse(`same account to transaction`, 400));
    }
    // credit the beneficiary account
    amount = beneficiaryAccount.balance + req.body.amount;
    await updateAccount(beneficiaryAccount.id, amount);

    // debit the sender account
    amount = senderAccount.balance - req.body.amount;
    await updateAccount(senderAccount.id, amount || 0);

    //generate beneficiary transaction receipt
    await addTransaction({
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
    await addTransaction({
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
  }
);

// @route GET /api/v1/transaction/:id
// @desc  get single transaction
// @access PRIVATE
export const getTransaction = asyncHandeler(
  async (req: Req, res: Res, next: Next) => {
    const id = parseInt(req.params.id, 10);
    let transaction = await findTransction(id);
    if (!transaction || transaction.length === 0) {
      return next(
        new ErrorResponse(`transaction with the id of ${id} not found`, 404)
      );
    }
    transaction = JSON.parse(JSON.stringify(transaction[0]));
    // check if transaction belongs to user
    if (transaction.user_id !== req.user.id) {
      return next(
        new ErrorResponse(`unauthorized transaction access 'id: ${id}'`, 401)
      );
    }
    res.status(200).json({
      success: true,
      data: transaction,
    });
  }
);

// @route GET /api/v1/transaction/account/:id
// @desc  get all transaction associated to an account
// @access PRIVATE
export const getTransactions = asyncHandeler(
  async (req: Req, res: Res, next: Next) => {
    const id = parseInt(req.params.id, 10);
    let transactions = await accountTransctions(id);
    if (!transactions || transactions.length === 0) {
      return next(
        new ErrorResponse(
          `transactions for account with the id of ${id} not found`,
          404
        )
      );
    }
    transactions = JSON.parse(JSON.stringify(transactions));
    res.status(200).json({
      success: true,
      count: transactions.length,
      data: transactions,
    });
  }
);

// @route GET /api/v1/transaction
// @desc  get all transaction associated to user
// @access PRIVATE
export const userTransaction = asyncHandeler(
  async (req: Req, res: Res, next: Next) => {
    const id = parseInt(req.user.id, 10);
    let transactions = await userTransctions(id);
    if (!transactions || transactions.length === 0) {
      return next(
        new ErrorResponse(
          `transactions for user with the id of ${id} not found`,
          404
        )
      );
    }
    transactions = JSON.parse(JSON.stringify(transactions));
    res.status(200).json({
      success: true,
      count: transactions.length,
      data: transactions,
    });
  }
);
