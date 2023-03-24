import { Request, Response, NextFunction } from "express";

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

  res.status(data.statusCode || 500).json({
    success: false,
    verboseMessage: data.message,
    message: resData,
    rawMessage: data.message,
  });
}

export default errorHandler;
