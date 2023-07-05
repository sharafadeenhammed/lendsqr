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
    return __awaiter(this, void 0, void 0, function* () {
        if (data.errno === 1062) {
            const duplicateField = data.message.split("entry")[1];
            resData = {
                errorMessage: data.message,
                message: String("duplicate field value entered" + duplicateField).replace("key ", ""),
                code: data.code,
            };
        }
        if (data.message == "read ECONNRESET") {
            (0, db_1.connectDbAsync)();
        }
        // check fro duplicate field entry
        if (data.code === "ER_DUP_ENTRY") {
            data.statusCode = 400;
        }
        res.status(data.statusCode || 500).json({
            success: false,
            message: data.message,
            stack: data.stack,
            data: resData,
        });
    });
}
exports.default = errorHandler;
