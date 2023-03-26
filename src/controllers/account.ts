import { Req, Res, Next } from "../utils/interface";
import { findAccount, findAccounts, updateAccount } from "../model/Account";
import { addTransaction } from "../model/Transaction";
import ErrorResponse from "../utils/errorResponse";
import asyncHandeler from "../utils/asyncHandler";
import { query, db } from "../config/db";

//@route GET /api/v1/account/:id
//@desc  get single account
//@access PRIVATE
export const getAccount = asyncHandeler(
  async (req: Req, res: Res, next: Next) => {
    const id: number = parseInt(req.params.id, 10);
    let account = await findAccount(id);
    // check if account is succesfully fetched...
    if (!account || account.length === 0) {
      return next(
        new ErrorResponse(
          `account with the id of ${req.params.id} not found`,
          404
        )
      );
    }
    account = JSON.parse(JSON.stringify(account[0]));
    // check if account belongs to user.
    if (account.user_id !== req.user.id) {
      return next(
        new ErrorResponse("not unauthorized to access this account", 401)
      );
    }
    res.status(200).json({
      success: true,
      data: account,
    });
  }
);

//@route GET /api/v1/account/:id/fund
//@desc  fund account
//@access PRIVATE
export const fundAccount = asyncHandeler(
  async (req: Req, res: Res, next: Next) => {
    const amount: number = req.body?.amount;
    const id: number = parseInt(req.params.id, 10);

    // check if amount is not empty
    if (!amount || amount < 0) {
      return next(
        new ErrorResponse("invalid amount field in your request body ", 400)
      );
    }
    let account = await findAccount(id);
    // check if account is succesfully fetched...
    if (!account || account.length === 0) {
      return next(
        new ErrorResponse(
          `account with the id of ${req.params.id} not found`,
          404
        )
      );
    }
    account = JSON.parse(JSON.stringify(account[0]));
    // check if account belongs to user.
    if (account.user_id !== req.user.id) {
      return next(
        new ErrorResponse("not unauthorized to access this account", 401)
      );
    }
    await updateAccount(account.id, amount + account.balance);

    //generate beneficiary transaction receipt
    await addTransaction({
      amount: req.body.amount,
      beneficiary_account_id: account.id,
      beneficiary_account_number: account.account_number,
      beneficiary_id: account.user_id,
      beneficiary_name: account.account_holder_name,
      sender_account_id: account.id,
      sender_account_number: account.account_number,
      sender_id: account.user_id,
      sender_name: account.account_holder_name,
      user_id: account.user_id,
      account_id: account.id,
    });

    res.status(200).json({
      success: true,
      data: {
        amount: req.body.amount,
        beneficiary_account_id: account.id,
        beneficiary_account_number: account.account_number,
        beneficiary_id: account.user_id,
        beneficiary_name: account.account_holder_name,
        sender_account_id: account.id,
        sender_account_number: account.account_number,
        sender_id: account.user_id,
        sender_name: account.account_holder_name,
        user_id: account.user_id,
        account_id: account.id,
      },
    });
  }
);

//@route GET /api/v1/account/user
//@desc  get account related to user
//@access PRIVATE
export const getAccounts = asyncHandeler(
  async (req: Req, res: Res, next: Next) => {
    const userId: number = parseInt(req.user.id, 10);
    let accounts = await findAccounts(userId);
    // check if account found;
    if (!accounts || accounts.length === 0) {
      return next(
        new ErrorResponse(
          `no account associated to user with the id ${userId} found`,
          404
        )
      );
    }
    accounts = JSON.parse(JSON.stringify(accounts));
    res.status(200).json({
      success: true,
      count: accounts.length || 0,
      data: accounts,
    });
  }
);
