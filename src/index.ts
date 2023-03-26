import express, { Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import path from "path";
import { connectDbAsync } from "./config/db";
import auth from "./routes/auth";
import account from "./routes/account";
import transaction from "./routes/transaction";
import errorHandler from "./utils/errorHandler";
import cors from "cors";
import helmet from "helmet";

// load enviroment variables...
dotenv.config({ path: path.join(__dirname, "../", "config.env") });

connectDbAsync();

const app = express();

app.use(morgan("dev"));

// allow request from all url
app.use(cors());

// Set security headers
app.use(helmet());

app.use(express.json());

app.use(express.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, "../", "public")));

app.get("/", async (req: Request, res: Response, next: NextFunction) => {
  res
    .status(302)
    .redirect("https://documenter.getpostman.com/view/20324776/2s93RNyEuB");
});

app.use("/api/v1/auth", auth);

app.use("/api/v1/account", account);

app.use("/api/v1/transaction", transaction);

// mounting error handler middleware...
app.use(errorHandler);
const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`server runnimg on port  ${PORT}`);
});
