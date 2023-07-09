import express, { Request, Response, NextFunction } from "express";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import morgan from "morgan";
import path from "path";
import { connectDbAsync, connectindDBReq } from "./config/db";
import auth from "./routes/auth";
import account from "./routes/account";
import transaction from "./routes/transaction";
import errorHandler from "./utils/errorHandler";
import cors from "cors";
import helmet from "helmet";
import hpp from "hpp";
import xss from "xss-clean";

// load enviroment variables...
dotenv.config({ path: path.join(__dirname, "../", "config.env") });

connectDbAsync();

const app = express();

app.use(morgan("dev"));

// mount hpp
app.use(hpp());

// allow request from all url
app.use(
  cors({
    origin: true,
    credentials: true,
  })
);

// Set security headers
app.use(helmet());

// mounting xss security
app.use(xss());

// mounting body-parsers
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// mounting cookie parser
app.use(cookieParser());

app.use(express.static(path.join(__dirname, "../", "public")));

app.get("/", (req: Request, res: Response, next: NextFunction) => {
  res.redirect("https://documenter.getpostman.com/view/20324776/2s93RNyEuB");
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
