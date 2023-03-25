import express from "express";
import { protect } from "../middleware/auth";
import { getAccount, getAccounts } from "../controllers/account";

const routes = express.Router();

routes.get("/user", protect, getAccounts);

routes.get("/:id", protect, getAccount);

export default routes;
