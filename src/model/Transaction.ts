import { db, query } from "../config/db";
import { Tranaction } from "../utils/interface";

export const addTransaction = async (transaction: Tranaction): Promise<any> => {
  const queryStr = "INSERT INTO transactions SET ?";
  return query({ sql: queryStr, values: transaction });
};

export const findTransction = async (id: number): Promise<any> => {
  const queryStr = `SELECT * FROM transactions WHERE id = ${id}`;
  return query(queryStr);
};

export const findTransctions = async (userId: number): Promise<any> => {
  const queryStr = `SELECT * FROM transactions WHERE beneficiary_id = ${userId} OR sender_id = ${userId}`;
  return query(queryStr);
};
