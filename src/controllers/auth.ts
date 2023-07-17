import asyncHandeler from "../utils/asyncHandler";
import ErrorResponse from "../utils/errorResponse";
import bcrypt from "bcryptjs";
import { Req, Res, Next, JwtInterface } from "../utils/interface";
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
    const {
      first_name,
      last_name,
      password,
      email,
      address,
      age,
      phone_number,
    } = user;
    if (
      !first_name ||
      !last_name ||
      !password ||
      !email ||
      !address ||
      !age ||
      !phone_number
    ) {
      return next(
        new ErrorResponse(
          "please include a first_name, last_name, password, email, address, age, and phone_number fields",
          400
        )
      );
    }
    // hashing password...
    const salt: string = bcrypt.genSaltSync(10);
    const hashedPassword: string = bcrypt.hashSync(user.password, salt);
    user.password = hashedPassword;

    // adding user profile to database...
    let insertUser = await addUser(user);
    insertUser = JSON.parse(JSON.stringify(insertUser));

    // create user account
    const account = await addAccount(
      insertUser.insertId,
      "saving",
      0,
      `${req.body.first_name} ${req.body.last_name}`
    );
    // generate token
    const jwtPayload: JwtInterface = {
      id: insertUser.insertId,
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
    delete user.password;
    res
      .status(201)
      .cookie("token", `token ${token}`, {
        httpOnly: true,
        secure: true,
        sameSite: "strict",
        maxAge: 1000 * 60 * 60 * 2,
      })
      .json({
        success: true,
        data: user,
        token,
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
  const jwtPayload: JwtInterface = {
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
  delete user.password;
  res
    .status(200)
    .cookie("token", `token ${token}`, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      maxAge: 1000 * 60 * 60 * 2,
    })
    .json({
      success: true,
      token,
      data: user,
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

//@Desc   Logout user
//@route  POST /api/v1/auth/logout
//@access Public
export const logoutUser = asyncHandeler(
  async (req: Req, res: Res, next: Next) => {
    res
      .cookie("jwt", "", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "developement",
        expires: new Date(0),
      })
      .status(200)
      .json({
        message: "success",
        token: "",
      });
    console.log(new Date(0));
  }
);
