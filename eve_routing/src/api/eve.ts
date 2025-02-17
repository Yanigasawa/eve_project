import * as pg from "pg";
const { Pool } = pg;

const pool = new Pool({
  user: "postgres",
  password: "B30wulfs!",
  host: "localhost",
  port: 5432,
  database: "eve",
});

export { pool };
