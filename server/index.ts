import { Server } from "socket.io";
import { createServer } from "http";

const httpServer = createServer();
const io = new Server(httpServer, {
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket: any) => {
  console.log("Client connected:", socket.id);

  socket.on("message", (message: any) => {
    io.emit("message", message);
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected:", socket.id);
  });
});

const port = process.env.PORT || 4000;
httpServer.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
