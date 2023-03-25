"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let resData = {};
async function errorHandler(data, req, res, next) {
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
exports.default = errorHandler;
