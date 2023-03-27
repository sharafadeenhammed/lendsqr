"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = require("../config/db");
let resData = {};
async function errorHandler(data, req, res, next) {
    if (data.msg?.errno === 1062) {
        resData = {
            ...resData,
            verboseMessage: data.msg.sqlMessage,
            message: "duplicate field value entered",
        };
    }
    if (data.message == "read ECONNRESET") {
        (0, db_1.connectDbAsync)();
    }
    res.status(data.statusCode || 500).json({
        success: false,
        verboseMessage: data.message,
        message: resData,
        rawMessage: data.message,
    });
}
exports.default = errorHandler;
