"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authorize = exports.protect = void 0;
const asyncHandler_1 = __importDefault(require("../utils/asyncHandler"));
const errorResponse_1 = __importDefault(require("../utils/errorResponse"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
exports.protect = (0, asyncHandler_1.default)(async (req, res, next) => {
    let token = req?.headers?.authorization || req?.cookies?.token || req?.body?.token;
    if (!token || token === "") {
        return next(new errorResponse_1.default("not autohorised to access this route", 401));
    }
    token = token.split(" ")[1];
    let user = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET || "lendsqr_secret");
    if (!user) {
        return next(new errorResponse_1.default("not authorized to access this route login session expired", 401));
    }
    req.user = user;
    next();
});
exports.authorize = (0, asyncHandler_1.default)(async (...roles) => {
    // if(args.contain(res.user.role))
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return next(new errorResponse_1.default(`user role "${req.user.role}" not allowed to access this route`, 401));
        }
        next();
    };
});
