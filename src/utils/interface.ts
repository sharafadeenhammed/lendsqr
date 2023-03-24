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

export interface jwtInterface {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
}
export interface Tranaction {
  id: number;
  user_id: number;
  sender_name: string;
  sender_email: string;
  sender_account_number: string;
  sender_account_id: number;
  sender_id: number;
  beneficiary_name: string;
  beneficiary_email: string;
  beneficiary_account_number: string;
  beneficiary_account_id: number;
  beneficiary_id: number;
  amount: number;
}
