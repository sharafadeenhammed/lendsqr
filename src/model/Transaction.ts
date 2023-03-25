import { db, query } from "../config/db";
import { Tranaction } from "../utils/interface";

export const addTransaction = async (transaction: Tranaction): Promise<any> => {
  const queryStr = "INSERT INTO transactions SET ?";
  return query({ sql: queryStr, values: transaction });
};

export const findTransction = async (id: number): Promise<any> => {
  const queryStr = `SELECT * FROM transactions WHERE id = ${db.escape(id)}`;
  return query(queryStr);
};

export const accountTransctions = async (accountId: number): Promise<any> => {
  const queryStr = `SELECT * FROM transactions WHERE account_id = ${db.escape(
    accountId
  )} OR beneficiary_account_id = ${db.escape(accountId)}`;
  return query(queryStr);
};

export const userTransctions = async (userId: number): Promise<any> => {
  const queryStr = `SELECT * FROM transactions WHERE user_id = ${db.escape(
    userId
  )}`;
  return query(queryStr);
};
