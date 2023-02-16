import mysql2 from "mysql2";
import dotenv from "dotenv";

dotenv.config();

export const pool = mysql2.createPool({
  host: process.env.DATABASE_HOST,
  port: process.env.DATABASE_PORT,
  user: process.env.DATABASE_USER,
  database: process.env.DATABASE_NAME,
});