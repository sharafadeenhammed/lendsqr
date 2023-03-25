import connectDb, { db } from "./config/db";
import colors from "colors";

// connecting to database
connectDb;

// seeding database
if (process.argv[2] === "--seed-user") {
}
process.exit(0);

const tables = [];
