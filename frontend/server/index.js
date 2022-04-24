const express = require("express");
const path = require("path");
const helmet = require("helmet");
const proxy = require("http-proxy-middleware");
const app = express();

app.use(helmet());
app.use(express.static(path.resolve(__dirname, "../static")));
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../static/index.html"));
});

let proxyHost = "http://localhost:3000";

if (process.env.NODE_ENV === "production") {
  proxyHost = "https://blobs.dcpm.dev";
}

app.use("/health", (req, res) => {
  res.send("ok");
});

app.use("/api/*", proxy({ target: proxyHost, changeOrigin: true }));
const server = app.listen(4000);
