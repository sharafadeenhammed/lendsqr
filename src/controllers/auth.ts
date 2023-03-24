import asyncHandeler from "../utils/asyncHandler";
import ErrorResponse from "../utils/errorResponse";
import bcrypt from "bcryptjs";
import { Req, Res, Next, jwtInterface } from "../utils/interface";
import { db, query } from "../config/db";
import jwt from "jsonwebtoken";
import { addAccount } from "../model/Account";
import { addUser, findUser } from "../model/User";

// @route POST /api/v1/auth/register
// @desc  register user
// @access PUBLIC
export const createUser = asyncHandeler(
  async (req: Req, res: Res, next: Next) => {
    let user: any = req.body;
    // hashing password...
    const salt: string = bcrypt.genSaltSync(10);
    const hashedPassword: string = bcrypt.hashSync(user.password, salt);
    user.password = hashedPassword;

    // adding user profile to database...
    user = await addUser(user);
    user = JSON.parse(JSON.stringify(user));

    // create user account
    const account = await addAccount(
      user.insertId,
      "saving",
      0,
      `${req.body.first_name} ${req.body.last_name}`
    );

    user = req.body;
    delete user.password;
    res.status(201).json({
      success: true,
      data: user,
    });
  }
);

// @route POST /api/v1/auth/login
// @desc  login user
// @access PUBLIC
export const login = asyncHandeler(async (req: Req, res: Res, next: Next) => {
  const query: string = `SELECT id, email, password FROM users WHERE email = '${db.escape(
    req.body.email
  )}'`;
  let user = await findUser(req.body.email);
  if (user.length === 0) {
    return next(new ErrorResponse("invalid login credentials", 404));
  }
  user = JSON.parse(JSON.stringify(user[0]));
  // verify password
  const password: string = req.body.password;
  const hashPassword: string = user.password;
  const isVerified: boolean = bcrypt.compareSync(password, hashPassword);
  if (!isVerified) {
    return next(new ErrorResponse("invalid credentials", 400));
  }

  // generate token
  const jwtPayload: jwtInterface = {
    id: user.id,
    email: user.email,
    firstName: user.first_name,
    lastName: user.last_name,
  };
  const token: string = jwt.sign(
    jwtPayload,
    process.env.JWT_SECRET || "lendsqr_secret",
    {
      expiresIn: process.env.JWT_TOKEN_EXPIRES || "30d",
    }
  );

  res.status(200).json({
    success: true,
    token,
  });
});

// @route GET /api/v1/auth/getme
// @desc  get logged user
// @access PRIVATE
export const getUser = asyncHandeler(async (req: Req, res: Res, next: Next) => {
  let user = await findUser(req.user.email);
  if (!user || user.lenth === 0) {
    return next(new ErrorResponse("not authorized to access this route", 401));
  }
  user = JSON.parse(JSON.stringify(user[0]));
  delete user.password;
  res.status(200).json({
    success: true,
    data: user,
  });
});
