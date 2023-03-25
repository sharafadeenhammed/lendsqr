import { db, query } from "../config/db";

export const addAccount = async (
  userId: number,
  accountType: string,
  balance: number | null,
  name: string
): Promise<any> => {
  const account = {
    user_id: userId,
    account_number: Date.now().toString().substring(0, 10),
    balance: balance || 0,
    account_type: accountType || "savings",
    account_holder_name: name,
  };
  const queryStr = "INSERT INTO accounts SET ?";
  return query({ sql: queryStr, values: account });
};

export const findAccount = async (id: number): Promise<any> => {
  const queryStr: string = `SELECT * FROM accounts WHERE id = ${db.escape(id)}`;
  return query(queryStr);
};

export const findAccountByAccountNumber = async (
  accountNumber: number
): Promise<any> => {
  const queryStr: string = `SELECT * FROM accounts WHERE account_number = ${db.escape(
    accountNumber
  )}`;
  return query(queryStr);
};

export const findAccounts = async (userId: number): Promise<any> => {
  const queryStr: string = `SELECT * FROM accounts WHERE user_id = ${db.escape(
    userId
  )}`;
  return query(queryStr);
};

export const updateAccount = async (id: number, amount: number) => {
  const queryStr: string = `UPDATE accounts SET balance = ${db.escape(
    amount
  )}  WHERE id = ${db.escape(id)}  `;
  return query(queryStr);
};
