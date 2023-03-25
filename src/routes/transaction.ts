import express from "express";
import { protect } from "../middleware/auth";
import {
  getTransaction,
  getTransactions,
  makeTransaction,
  userTransaction,
} from "../controllers/transaction";

const routes = express.Router();

routes.get("/", protect, userTransaction);

routes.get("/:id", protect, getTransaction);

routes
  .route("/account/:id")
  .get(protect, getTransactions)
  .post(protect, makeTransaction);

export default routes;
