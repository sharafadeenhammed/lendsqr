import express from "express";
import { protect } from "../middleware/auth";
import { getAccount, getAccounts } from "../controllers/account";

const routes = express.Router();

routes.get("/account/:id", protect, getAccount);

routes.get("/accounts/:id", protect, getAccounts);

export default routes;
