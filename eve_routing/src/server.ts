import * as http from "http";
import * as https from "https";
import { IncomingMessage, ServerResponse } from "http";
import { GET as getRegions } from "./api/regions/regions";
import { GET as getSolarSystems } from "./api/solarsystems/solarsystems";
import { GET as getStations } from "./api/stations/stations";
import { GET as getTypes } from "./api/types/types";
import { GET as getMarketGroup } from "./api/marketgroups/marketgroups";
import { GET as searchTypes } from "./api/types/search/searchTypes";
import { GET as getLocalOrders } from "./api/orders/local/orders";

const server = http.createServer(
  async (req: IncomingMessage, res: ServerResponse) => {
    if (req.url) {
      if (req.url.startsWith("/api/orders/local")) {
        if (req.method === "GET") {
          await getLocalOrders(req, res);
        } else {
          res.statusCode = 404;
          res.end("Not Found");
        }
      }
      if (req.url.startsWith("/api/types/search")) {
        if (req.method === "GET") {
          await searchTypes(req, res);
        } else {
          res.statusCode = 404;
          res.end("Not Found");
        }
      }
      if (req.url.startsWith("/api/orders/remote")) {
        process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
        const remoteUrl = `https://evetycoon.com/api/v1/market/orders${req.url.replace("/api/orders/remote", "")}`;
        console.log(remoteUrl);

        https
          .get(remoteUrl, (remoteRes) => {
            res.writeHead(remoteRes.statusCode!, remoteRes.headers);
            remoteRes.pipe(res);
          })
          .on("error", (err) => {
            console.error("Error fetching remote API:", err);
            res.statusCode = 500;
            res.end("Error fetching remote API");
          });
      }

      if (req.url === "/api/marketgroups") {
        if (req.method === "GET") {
          await getMarketGroup(req, res);
        } else {
          res.statusCode = 404;
          res.end("Not Found");
        }
      }
      if (req.url === "/api/regions") {
        if (req.method === "GET") {
          await getRegions(req, res);
        } else {
          res.statusCode = 404;
          res.end("Not Found");
        }
      }
      if (req.url === "/api/solarsystems") {
        if (req.method === "GET") {
          await getSolarSystems(req, res);
        } else {
          res.statusCode = 404;
          res.end("Not Found");
        }
      }
      if (req.url === "/api/stations") {
        if (req.method === "GET") {
          await getStations(req, res);
        } else {
          res.statusCode = 404;
          res.end("Not Found");
        }
      }
      if (req.url === "/api/types") {
        if (req.method === "GET") {
          await getTypes(req, res);
        } else {
          res.statusCode = 404;
          res.end("Not Found");
        }
      }
      console.log(req.url);
    }
  },
);

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server running at http://evehost:${PORT}/`);
});
