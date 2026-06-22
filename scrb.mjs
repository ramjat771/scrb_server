import http from "http";
import { Server } from "socket.io";
import app from "./app.mjs";
import { config } from "./config/config.mjs";
import { mongoConnection } from "./config/db.mjs";
import { socketHandler } from "./socket/socketHandler.mjs";
import { startBackgroundTask } from "./services/background_task.mjs";
async function bootstrap() {
  try {
    await mongoConnection(
      config.MONGO_URL
    );

console.log(
  "✅ Mongo Connected"
);

const server =
  http.createServer(app);

const io = new Server(server, {
  path: "/socket",
  cors: {
    origin: "*",
    methods: [
      "GET",
      "POST",
    ],
  },
  transports: [
    "websocket",
  ],
});

socketHandler(io);

await startBackgroundTask();

server.listen(
  config.port,
  "0.0.0.0",
  () => {
    console.log(
      `🚀 Server running on port ${ config.port } `
    );
  }
);

process.on(
  "unhandledRejection",
  (err) => {
    console.error(
      "Unhandled Rejection",
      err
    );
  }
);

process.on(
  "uncaughtException",
  (err) => {
    console.error(
      "Uncaught Exception",
      err
    );
  }
);


  } catch (error) {
    console.error(
      "Startup Error:",
      error
    );

   
process.exit(1);


  }
}

bootstrap();
