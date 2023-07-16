import express from "express";
import { protect } from "../middleware/auth";
import {
  getAccount,
  getAccounts,
  fundAccount,
  getAccountByAccountNumber,
} from "../controllers/account";

const routes = express.Router();

routes.get("/user", protect, getAccounts);
routes.get("/number/:number", getAccountByAccountNumber);
routes.route("/:id").post(protect, fundAccount).get(protect, getAccount);

export default routes;
