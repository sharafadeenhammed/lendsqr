import { db, query } from "../config/db";
import bcrypt from "bcryptjs";
import ErrorResponse from "../utils/errorResponse";

export const findUser = async (email: string): Promise<any> => {
  const queryStr: string = `SELECT * FROM users WHERE email = ${db.escape(
    email
  )}`;
  return query(queryStr);
};

export const addUser = async (user: object): Promise<any> => {
  const queryStr = "INSERT INTO users SET ?";
  return query({ sql: queryStr, values: user });
};
