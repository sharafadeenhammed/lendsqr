"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_1 = require("../middleware/auth");
const transaction_1 = require("../controllers/transaction");
const routes = express_1.default.Router();
routes.get("/", auth_1.protect, transaction_1.userTransaction);
routes.get("/:id", auth_1.protect, transaction_1.getTransaction);
routes
    .route("/account/:id")
    .get(auth_1.protect, transaction_1.getTransactions)
    .post(auth_1.protect, transaction_1.makeTransaction);
exports.default = routes;
