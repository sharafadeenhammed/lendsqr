// const mysql = require("mysql");
import mysql from "mysql";
import util from "util";

// create connection
const connection = mysql.createConnection({
  host: "localhost",
  user: process.env.DATABASE_USERNAME || "hammed",
  password: process.env.DATABASE_PASSWORD || "hammed123456",
  database: "lendsqr",
});
export const query = util.promisify(connection.query).bind(connection);
export const connect = util.promisify(connection.query).bind(connection);

const connectDb = async () => {
  // connect to database
  connection.connect((err: any): void => {
    if (err) {
      console.log(err);
      return;
    }
    console.log(
      `\nconnected to database ${connection.config.host} on port ${connection.config.port} and using ${connection.config.database} database \n\n`
    );
  });
};

const connectindDB = async function (): Promise<any> {
  connect(`CREATE DATABASE IF NOT EXISTS lendsqr`);
  console.log(
    `\nconnected to database ${connection.config.host} on port ${connection.config.port} and using ${connection.config.database} database \n\n`
  );
};

export const connectDbAsync = async () => {
  await connectindDB();
};

export const db = connection;

export default connectDb;
