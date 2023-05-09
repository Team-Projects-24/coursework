"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var socket_io_1 = require("socket.io");
var http_1 = require("http");
var app = (0, express_1)();
var httpServer = (0, http_1.createServer)(app);
var io = new socket_io_1.Server(httpServer, {
  cors: {
    origin: "*", // Replace with your site's URL in production
  },
});
io.on("connection", function (socket) {
  socket.on("send-message", function (message) {
    console.log(message);
    io.emit("receive-message", message);
  });
  socket.on("disconnect", function () {
    console.log("User disconnected");
  });
});
var PORT = 3001;
httpServer.listen(PORT, function () {
  console.log("Server running on port ".concat(PORT));
});
