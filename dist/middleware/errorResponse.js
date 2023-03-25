"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ErrorResponse extends Error {
    constructor(message, statusCode) {
        const status = 0;
        super(message);
        this.msg = message;
        this.statusCode = statusCode;
    }
}
exports.default = ErrorResponse;
