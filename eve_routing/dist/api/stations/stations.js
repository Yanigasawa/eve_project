"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GET = GET;
const eve_1 = require("../eve");
async function GET(req, res) {
    try {
        const response = await eve_1.pool.query("SELECT * FROM stations");
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify(response.rows));
    }
    catch (error) {
        console.error("Error fetching regions:", error);
        res.writeHead(500, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ error: "Internal Server Error" }));
    }
}
//# sourceMappingURL=stations.js.map