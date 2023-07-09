"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const dotenv_1 = __importDefault(require("dotenv"));
const morgan_1 = __importDefault(require("morgan"));
const path_1 = __importDefault(require("path"));
const db_1 = require("./config/db");
const auth_1 = __importDefault(require("./routes/auth"));
const account_1 = __importDefault(require("./routes/account"));
const transaction_1 = __importDefault(require("./routes/transaction"));
const errorHandler_1 = __importDefault(require("./utils/errorHandler"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const hpp_1 = __importDefault(require("hpp"));
const xss_clean_1 = __importDefault(require("xss-clean"));
// load enviroment variables...
dotenv_1.default.config({ path: path_1.default.join(__dirname, "../", "config.env") });
(0, db_1.connectDbAsync)();
const app = (0, express_1.default)();
app.use((0, morgan_1.default)("dev"));
// mount hpp
app.use((0, hpp_1.default)());
// allow request from all url
app.use((0, cors_1.default)());
// Set security headers
app.use((0, helmet_1.default)());
// mounting xss security
app.use((0, xss_clean_1.default)());
// mounting body-parsers
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
// mounting cookie parser
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.static(path_1.default.join(__dirname, "../", "public")));
app.get("/", (req, res, next) => {
    res.redirect("https://documenter.getpostman.com/view/20324776/2s93RNyEuB");
});
app.use("/api/v1/auth", auth_1.default);
app.use("/api/v1/account", account_1.default);
app.use("/api/v1/transaction", transaction_1.default);
// mounting error handler middleware...
app.use(errorHandler_1.default);
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`server runnimg on port  ${PORT}`);
});
