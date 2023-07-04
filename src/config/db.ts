import mysql from "mysql";
import util from "util";
import dotenv from "dotenv";
dotenv.config({ path: "../../config.env" });
// create connection
const connection = mysql.createConnection({
  host: process.env.DATABASE_HOST || "sql7.freemysqlhosting.net",
  user: process.env.DATABASE_USERNAME || "sql7630373",
  password: process.env.DATABASE_PASSWORD || "zJXDPrc2vg",
  database: process.env.DATABASE_NAME || "sql7630373",
  port: Number(process.env.DATABASE_PORT) || 3306,
});
const connectionForDbMigrationOnly = mysql.createConnection({
  host: process.env.DATABASE_HOST || "sql7.freemysqlhosting.net",
  user: process.env.DATABASE_USERNAME || "sql7630373",
  password: process.env.DATABASE_PASSWORD || "zJXDPrc2vg",
  port: Number(process.env.DATABASE_PORT) || 3306,
});
export const query = util.promisify(connection.query).bind(connection);
export const connect = util.promisify(connection.connect).bind(connection);
const connectionForDbMigration = util
  .promisify(connectionForDbMigrationOnly.connect)
  .bind(connectionForDbMigrationOnly);

const connectindDB = async function (): Promise<any> {
  connect();
  console.log(
    `\nconnected to database ${connection.config.host} on port ${connection.config.port} and using ${connection.config.database} database \n\n`
  );
};

export const connectDbAsync = async () => {
  await connectindDB();
};

export const connectDbMigration = async () => {
  await connectionForDbMigration();
};

export const db = connection;
