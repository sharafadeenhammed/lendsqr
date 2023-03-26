"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
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
// load enviroment variables...
dotenv_1.default.config({ path: path_1.default.join(__dirname, "../", "config.env") });
(0, db_1.connectDbAsync)();
const app = (0, express_1.default)();
app.use((0, morgan_1.default)("dev"));
// allow request from all url
app.use((0, cors_1.default)());
// Set security headers
app.use((0, helmet_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use(express_1.default.static(path_1.default.join(__dirname, "../", "public")));
app.get("/", async (req, res, next) => {
    res.status(302).redirect(`${req.protocol}://${req.hostname}/index.html`);
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
