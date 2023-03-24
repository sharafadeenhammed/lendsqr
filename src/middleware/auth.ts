import asyncHandeler from "../utils/asyncHandler";
import ErrorResponse from "../utils/errorResponse";
import { Req, Res, Next } from "../utils/interface";
import jwt from "jsonwebtoken";

export const protect = asyncHandeler(async (req: Req, res: Res, next: Next) => {
  let token =
    req?.headers?.authorization || req?.cookies?.token || req?.body?.token;
  if (!token || token === "") {
    return next(new ErrorResponse("not autohorised to access this route", 401));
  }
  token = token.split(" ")[1];
  let user: any = jwt.verify(token, process.env.JWT_SECRET || "lendsqr_secret");
  if (!user) {
    return next(
      new ErrorResponse(
        "not authorized to access this route login session expired",
        401
      )
    );
  }
  req.user = user;
  next();
});

export const authorize = asyncHandeler(async (...roles: any) => {
  // if(args.contain(res.user.role))
  return (req: Req, res: Res, next: Next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new ErrorResponse(
          `user role "${req.user.role}" not allowed to access this route`,
          401
        )
      );
    }
    next();
  };
});
