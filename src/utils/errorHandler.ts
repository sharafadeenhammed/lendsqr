import { Request, Response, NextFunction } from "express";
import { connectDbAsync } from "../config/db";

let resData = {};
async function errorHandler(
  data: any,
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (data.errno === 1062) {
    const duplicateField = data.message.split("entry")[1];
    resData = {
      errorMessage: data.message,
      message: String("duplicate field value entered" + duplicateField).replace(
        "key ",
        ""
      ),
      code: data.code,
    };
  }
  if (data.message == "read ECONNRESET") {
    connectDbAsync();
  }

  // check fro duplicate field entry
  if (data.code === "ER_DUP_ENTRY") {
    data.statusCode = 400;
  }

  res.status(data.statusCode || 500).json({
    success: false,
    message: data.message,
    stack: data.stack,
    data: resData,
  });
}

export default errorHandler;
