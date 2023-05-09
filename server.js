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
// import express, { Express, Request, Response } from "express";
// import * as http from "http";
// import next, { NextApiHandler } from "next";
// import * as socketio from "socket.io";
// const port: number = parseInt(process.env.PORT || "3000", 10);
// const dev: boolean = process.env.NODE_ENV !== "production";
// const nextApp = next({ dev });
// const nextHandler: NextApiHandler = nextApp.getRequestHandler();
// nextApp.prepare().then(async () => {
//   const app: Express = express();
//   const server: http.Server = http.createServer(app);
//   const io: socketio.Server = new socketio.Server();
//   io.attach(server);
//   app.get("/hello", async (_: Request, res: Response) => {
//     res.send("Hello World");
//   });
//   io.on("connection", (socket: socketio.Socket) => {
//     console.log("connection");
//     socket.emit("status", "Hello from Socket.io");
//     socket.on("send-message", (message: string) => {
//       io.emit("receive-message", message);
//     });
//     socket.on("disconnect", () => {
//       console.log("client disconnected");
//     });
//   });
//   app.all("*", (req: any, res: any) => nextHandler(req, res));
//   server.listen(port, () => {
//     console.log(`> Ready on http://localhost:${port}`);
//   });
// });
