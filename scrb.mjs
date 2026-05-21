import http from "http";
import app from "./app.mjs";
import { config } from "./config/config.mjs";
import { mongoConnection } from "./config/db.mjs";
import { socketHandler } from "./socket/socketHandler.mjs";
import { Server } from "socket.io";
import { startBackgroundTask } from "./services/background_task.mjs";
import { postFacebookImage } from "./facebook/facebookImagePost.service.mjs";
async function startServer() {

  const server = http.createServer(app);
  const io = new Server(server, {
    path: "/socket",
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
    transports: ["websocket"],
  });
  socketHandler(io);
  await mongoConnection(
    config.MONGO_URL
  );
  server.listen(config.port, () => {
    startBackgroundTask();

    console.log(
      `🚀 Server running on http://localhost:${config.port}`
    );
  });
}
startServer();