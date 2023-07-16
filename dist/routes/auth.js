"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const routes = express_1.default.Router();
const auth_1 = require("../middleware/auth");
const auth_2 = require("../controllers/auth");
routes.post("/register", auth_2.createUser);
routes.post("/login", auth_2.login);
routes.get("/getme", auth_1.protect, auth_2.getUser);
routes.get("/logout", auth_1.protect, auth_2.logoutUser);
exports.default = routes;
