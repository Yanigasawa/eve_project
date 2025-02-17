import http, { IncomingMessage, ServerResponse } from "http";
import https from "https";
import { GET as getRegions } from "../src/api/local/regions/regions.js";
import { GET as getSolarSystems } from "../src/api/local/solarsystems/solarsystems.js";
import { GET as getStations } from "../src/api/local/stations/stations.js";
import { GET as getTypes } from "../src/api/local/types/types.js";
import { GET as getMarketGroup } from "../src/api/local/marketgroups/marketgroups.js";
import { GET as searchTypes } from "../src/api/local/types/search/searchTypes.js";
import { GET as getLocalOrders } from "../src/api/local/orders/local/orders.js";

const server = http.createServer(
  async (req: IncomingMessage, res: ServerResponse) => {
    if (req.url!.startsWith("/api/local/orders")) {
      if (req.method === "GET") {
        await getLocalOrders(req, res);
      } else {
        res.statusCode = 404;
        res.end("Not Found");
      }
    }
    if (req.url!.startsWith("/api/local/types/search")) {
      if (req.method === "GET") {
        await searchTypes(req, res);
      } else {
        res.statusCode = 404;
        res.end("Not Found");
      }
    }
    if (req.url!.startsWith("/api/remote/orders")) {
      process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
      const remoteUrl = `https://evetycoon.com/api/v1${req.url!.replace("/api/remote/orders", "")}`;

      https
        .get(remoteUrl, (remoteRes) => {
          res.writeHead(remoteRes.statusCode, remoteRes.headers);
          remoteRes.pipe(res);
        })
        .on("error", (err) => {
          console.error("Error fetching remote API:", err);
          res.statusCode = 500;
          res.end("Error fetching remote API");
        });
    }

    if (req.url! === "/api/local/marketgroups") {
      if (req.method === "GET") {
        await getMarketGroup(req, res);
      } else {
        res.statusCode = 404;
        res.end("Not Found");
      }
    }
    if (req.url! === "/api/local/regions") {
      if (req.method === "GET") {
        await getRegions(req, res);
      } else {
        res.statusCode = 404;
        res.end("Not Found");
      }
    }
    if (req.url! === "/api/local/solarsystems") {
      if (req.method === "GET") {
        await getSolarSystems(req, res);
      } else {
        res.statusCode = 404;
        res.end("Not Found");
      }
    }
    if (req.url! === "/api/local/stations") {
      if (req.method === "GET") {
        await getStations(req, res);
      } else {
        res.statusCode = 404;
        res.end("Not Found");
      }
    }
    if (req.url! === "/api/local/types") {
      if (req.method === "GET") {
        await getTypes(req, res);
      } else {
        res.statusCode = 404;
        res.end("Not Found");
      }
    }
    console.log(req.url!);
  },
);

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
});
