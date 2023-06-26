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
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = require("../config/db");
let resData = {};
function errorHandler(data, req, res, next) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        if (((_a = data.msg) === null || _a === void 0 ? void 0 : _a.errno) === 1062) {
            resData = Object.assign(Object.assign({}, resData), { verboseMessage: data.msg.sqlMessage, message: "duplicate field value entered" });
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
    });
}
exports.default = errorHandler;
