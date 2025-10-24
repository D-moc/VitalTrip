import http from "http";
import app from "./app.js";

const PORT = process.env.PORT || 4000;

const server = http.createServer(app);

server.listen(PORT, () => {
  console.log("MongoDB connected successfully");
});
