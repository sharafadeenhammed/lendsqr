"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUser = exports.login = exports.createUser = void 0;
const asyncHandler_1 = __importDefault(require("../utils/asyncHandler"));
const errorResponse_1 = __importDefault(require("../utils/errorResponse"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const db_1 = require("../config/db");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const Account_1 = require("../model/Account");
const User_1 = require("../model/User");
// @route POST /api/v1/auth/register
// @desc  register user
// @access PUBLIC
exports.createUser = (0, asyncHandler_1.default)(async (req, res, next) => {
    let user = req.body;
    // hashing password...
    const salt = bcryptjs_1.default.genSaltSync(10);
    const hashedPassword = bcryptjs_1.default.hashSync(user.password, salt);
    user.password = hashedPassword;
    // adding user profile to database...
    user = await (0, User_1.addUser)(user);
    user = JSON.parse(JSON.stringify(user));
    // create user account
    const account = await (0, Account_1.addAccount)(user.insertId, "saving", 0, `${req.body.first_name} ${req.body.last_name}`);
    user = req.body;
    delete user.password;
    res.status(201).json({
        success: true,
        data: user,
    });
});
// @route POST /api/v1/auth/login
// @desc  login user
// @access PUBLIC
exports.login = (0, asyncHandler_1.default)(async (req, res, next) => {
    const query = `SELECT id, email, password FROM users WHERE email = '${db_1.db.escape(req.body.email)}'`;
    let user = await (0, User_1.findUser)(req.body.email);
    if (user.length === 0) {
        return next(new errorResponse_1.default("invalid login credentials", 404));
    }
    user = JSON.parse(JSON.stringify(user[0]));
    // verify password
    const password = req.body.password;
    const hashPassword = user.password;
    const isVerified = bcryptjs_1.default.compareSync(password, hashPassword);
    if (!isVerified) {
        return next(new errorResponse_1.default("invalid credentials", 400));
    }
    // generate token
    const jwtPayload = {
        id: user.id,
        email: user.email,
        firstName: user.first_name,
        lastName: user.last_name,
    };
    const token = jsonwebtoken_1.default.sign(jwtPayload, process.env.JWT_SECRET || "lendsqr_secret", {
        expiresIn: process.env.JWT_TOKEN_EXPIRES || "30d",
    });
    res.status(200).json({
        success: true,
        token,
    });
});
// @route GET /api/v1/auth/getme
// @desc  get logged user
// @access PRIVATE
exports.getUser = (0, asyncHandler_1.default)(async (req, res, next) => {
    let user = await (0, User_1.findUser)(req.user.email);
    if (!user || user.lenth === 0) {
        return next(new errorResponse_1.default("not authorized to access this route", 401));
    }
    user = JSON.parse(JSON.stringify(user[0]));
    delete user.password;
    res.status(200).json({
        success: true,
        data: user,
    });
});