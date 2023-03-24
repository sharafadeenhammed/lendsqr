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
