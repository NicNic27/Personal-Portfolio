"use strict";
const http = require("http");
const fs = require("fs");
const path = require("path");

const port = parseInt(process.env.PORT || "8911", 10);
const root = __dirname;

const server = http.createServer((req, res) => {
  let u = req.url.split("?")[0];
  let p = path.normalize(path.join(root, u === "/" ? "index.html" : u));
  if (!p.startsWith(root)) { res.writeHead(403).end("Forbidden"); return; }
  fs.readFile(p, (e, d) => {
    if (e) { res.writeHead(404).end("Not Found"); return; }
    const t = path.extname(p).toLowerCase();
    const ty = {
      ".html": "text/html",
      ".js": "application/javascript",
      ".css": "text/css",
      ".json": "application/json",
      ".png": "image/png",
      ".jpg": "image/jpeg",
      ".jpeg": "image/jpeg",
      ".svg": "image/svg+xml",
      ".ico": "image/x-icon",
      ".pdf": "application/pdf",
    }[t] || "application/octet-stream";
    res.writeHead(200, { "Content-Type": ty });
    res.end(d);
  });
});

server.listen(port, () => console.log("LISTEN 8911"));
