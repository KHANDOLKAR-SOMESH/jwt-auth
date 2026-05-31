import dotenv from "dotenv";
dotenv.config();

import { Pool } from "pg";

console.log("ENV CHECK:", {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD ? "loaded" : "missing",
  db: process.env.DB_NAME,
});

const pool = new Pool({
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

pool
  .connect()
  .then(() => {
    console.log("PostgreSQL Connected");
  })
  .catch((err) => {
    console.log("DB Error:", err.message);
  });

export default pool;
