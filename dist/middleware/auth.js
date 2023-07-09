"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authorize = exports.protect = void 0;
const asyncHandler_1 = __importDefault(require("../utils/asyncHandler"));
const errorResponse_1 = __importDefault(require("../utils/errorResponse"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
exports.protect = (0, asyncHandler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c;
    let token = ((_a = req === null || req === void 0 ? void 0 : req.headers) === null || _a === void 0 ? void 0 : _a.authorization) || ((_b = req === null || req === void 0 ? void 0 : req.cookies) === null || _b === void 0 ? void 0 : _b.token) || ((_c = req === null || req === void 0 ? void 0 : req.body) === null || _c === void 0 ? void 0 : _c.token);
    if (!token || token === "") {
        return next(new errorResponse_1.default("not autohorised to access this route", 401));
    }
    token = token.split(" ")[1];
    let user = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET || "lendsqr_secret");
    if (!user) {
        return next(new errorResponse_1.default("not authorized to access this route login session expired", 401));
    }
    // generate token
    const jwtPayload = {
        id: user.id,
        email: user.email,
        firstName: user.first_name,
        lastName: user.last_name,
    };
    const jwtToken = jsonwebtoken_1.default.sign(jwtPayload, process.env.JWT_SECRET || "lendsqr_secret", {
        expiresIn: process.env.JWT_TOKEN_EXPIRES || "30d",
    });
    req.user = user;
    res.cookie("token", `token ${token}`, {
        httpOnly: true,
        secure: true,
        sameSite: "strict",
        maxAge: 1000 * 60 * 60 * 2,
    });
    next();
}));
exports.authorize = (0, asyncHandler_1.default)((...roles) => __awaiter(void 0, void 0, void 0, function* () {
    // if(args.contain(res.user.role))
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return next(new errorResponse_1.default(`user role "${req.user.role}" not allowed to access this route`, 401));
        }
        next();
    };
}));
