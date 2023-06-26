// const mysql = require("mysql");
import mysql from "mysql";
import util from "util";
// create connection
const connection = mysql.createConnection({
  host: "mysql-133294-0.cloudclusters.net", //process.env.DATABASE_HOST || "localhost",
  user: "admin", //process.env.DATABASE_USERNAME || "hammed",
  password: "9sz6mKDq", //process.env.DATABASE_PASSWORD || "hammed123456",
  database: "lendsqr", //process.env.DATABASE_NAME || "lendsqr",
  port: 19984, //process.env.DATABASE_PORT.toString(),
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
  const databaseName = process.env.DATABASE_NAME || "lendsqr";
  connect(`CREATE DATABASE IF NOT EXISTS ${databaseName}`);
  console.log(
    `\nconnected to database ${connection.config.host} on port ${connection.config.port} and using ${connection.config.database} database \n\n`
  );
};

export const connectDbAsync = async () => {
  await connectindDB();
};

export const db = connection;

export default connectDb;
