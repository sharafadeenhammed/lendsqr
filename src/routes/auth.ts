import express from "express";
import account from "../routes/account";
const routes = express.Router();
import { protect } from "../middleware/auth";

import { createUser, login, getUser } from "../controllers/auth";

routes.post("/register", createUser);

routes.post("/login", login);

routes.get("/getme", protect, getUser);

export default routes;
