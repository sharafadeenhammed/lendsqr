import { Request, Response, NextFunction } from "express";
import { connectDbAsync } from "../config/db";

let resData = {};
async function errorHandler(
  data: any,
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (data.msg?.errno === 1062) {
    resData = {
      ...resData,
      verboseMessage: data.msg.sqlMessage,
      message: "duplicate field value entered",
    };
  }
  if (data.message == "read ECONNRESET") {
    connectDbAsync();
  }

  res.status(data.statusCode || 500).json({
    success: false,
    verboseMessage: data.message,
    message: resData,
    rawMessage: data.message,
  });
}

export default errorHandler;
