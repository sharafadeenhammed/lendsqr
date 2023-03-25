import { Request, Response, NextFunction } from "express";
export interface Req extends Request {
  err: any;
  user: any;
}
export interface Res extends Response {
  err: any;
  user: any;
}
export interface Next extends NextFunction {}

export interface JwtInterface {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
}
export interface Tranaction {
  user_id: number;
  sender_name: string;
  account_id: string;
  sender_account_number: string;
  sender_account_id: number;
  sender_id: number;
  beneficiary_name: string;
  beneficiary_account_number: string;
  beneficiary_account_id: number;
  beneficiary_id: number;
  amount: number;
}
