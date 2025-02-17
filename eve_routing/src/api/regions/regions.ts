import { pool } from "../eve";
import { IncomingMessage, ServerResponse } from "http";

export async function GET(req: IncomingMessage, res: ServerResponse) {
  try {
    const response = await pool.query("SELECT * FROM regions");
    console.log(response.rows);
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(response.rows));
  } catch (error) {
    console.error("Error fetching regions:", error);
    res.writeHead(500, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ error: "Internal Server Error" }));
  }
}
