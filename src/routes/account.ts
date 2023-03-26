import express from "express";
import { protect } from "../middleware/auth";
import { getAccount, getAccounts, fundAccount } from "../controllers/account";

const routes = express.Router();

routes.get("/user", protect, getAccounts);

routes.post("/:id/fund", protect, fundAccount);

routes.get("/:id", protect, getAccount);

export default routes;
