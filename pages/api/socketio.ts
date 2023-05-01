import { createServer } from "http";
import { Server } from "socket.io";
import nextConnect from "next-connect";
import { NextApiRequest, NextApiResponse } from "next";

const handler = nextConnect();

// Custom types for the socket server
interface SocketServer extends HTTPServer {
  io?: IOServer | undefined;
}

interface SocketWithIO extends NetSocket {
  server: SocketServer;
}

interface NextApiResponseWithSocket extends NextApiResponse {
  socket: SocketWithIO;
}

handler.get((req: NextApiRequest, res: NextApiResponseWithSocket) => {
  if (!req.socket.server.io) {
    // Attach Socket.IO server to Next.js response object
    const httpServer = createServer((req, res) =>
      req.socket.server.emit("request", req, res)
    );
    const io = new Server(httpServer);

    // Your Socket.IO event handling logic here
    io.on("connection", (socket) => {
      console.log("Client connected");

      socket.on("disconnect", () => {
        console.log("Client disconnected");
      });
    });

    req.socket.server.io = io;
    httpServer.listen(4000);
  }

  res.status(200).json({ status: "Socket.IO server is running." });
});

export default handler;
