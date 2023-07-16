"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_1 = require("../middleware/auth");
const account_1 = require("../controllers/account");
const routes = express_1.default.Router();
routes.get("/user", auth_1.protect, account_1.getAccounts);
routes.get("/number/:number", account_1.getAccountByAccountNumber);
routes.route("/:id").post(auth_1.protect, account_1.fundAccount).get(auth_1.protect, account_1.getAccount);
exports.default = routes;
