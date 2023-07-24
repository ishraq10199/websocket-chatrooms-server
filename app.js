const http = require("http");
const express = require("express");
const { Server } = require("socket.io");

const app = express();

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket) => {
  console.log("[app] Connected to new client -", socket.id);
  socket.on("send-message", (message) => {
    console.log("[app] Sent: ", message);
    socket.emit("receive-message", message);
  });
});

server.on("error", (err) => {
  console.error("[app] Error opening server", err);
});

server.listen(8000, () => {
  console.log("[app] Server launched, listening on port 8000");
});
