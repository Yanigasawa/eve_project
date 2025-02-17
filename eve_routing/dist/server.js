"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const http = __importStar(require("http"));
const https = __importStar(require("https"));
const regions_1 = require("./api/regions/regions");
const solarsystems_1 = require("./api/solarsystems/solarsystems");
const stations_1 = require("./api/stations/stations");
const types_1 = require("./api/types/types");
const marketgroups_1 = require("./api/marketgroups/marketgroups");
const searchTypes_1 = require("./api/types/search/searchTypes");
const orders_1 = require("./api/orders/local/orders");
const server = http.createServer(async (req, res) => {
    if (req.url) {
        if (req.url.startsWith("/api/orders/local")) {
            if (req.method === "GET") {
                await (0, orders_1.GET)(req, res);
            }
            else {
                res.statusCode = 404;
                res.end("Not Found");
            }
        }
        if (req.url.startsWith("/api/types/search")) {
            if (req.method === "GET") {
                await (0, searchTypes_1.GET)(req, res);
            }
            else {
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
                res.writeHead(remoteRes.statusCode, remoteRes.headers);
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
                await (0, marketgroups_1.GET)(req, res);
            }
            else {
                res.statusCode = 404;
                res.end("Not Found");
            }
        }
        if (req.url === "/api/regions") {
            if (req.method === "GET") {
                await (0, regions_1.GET)(req, res);
            }
            else {
                res.statusCode = 404;
                res.end("Not Found");
            }
        }
        if (req.url === "/api/solarsystems") {
            if (req.method === "GET") {
                await (0, solarsystems_1.GET)(req, res);
            }
            else {
                res.statusCode = 404;
                res.end("Not Found");
            }
        }
        if (req.url === "/api/stations") {
            if (req.method === "GET") {
                await (0, stations_1.GET)(req, res);
            }
            else {
                res.statusCode = 404;
                res.end("Not Found");
            }
        }
        if (req.url === "/api/types") {
            if (req.method === "GET") {
                await (0, types_1.GET)(req, res);
            }
            else {
                res.statusCode = 404;
                res.end("Not Found");
            }
        }
        console.log(req.url);
    }
});
const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Server running at http://evehost:${PORT}/`);
});
//# sourceMappingURL=server.js.map