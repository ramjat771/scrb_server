export const socketHandler = (io) => {
  io.on("connection", async (socket) => {
    const userId = socket.handshake.query.userId;

    console.log(
      "⚡ Connected:",
      socket.id,
      "| UserId:",
      userId
    );

    // ✅ Welcome
    socket.emit("welcome", {
      message: "Connected to Live Score Server",
      socketId: socket.id,
      userId,
    });

    // =================================
    // EVERY SECOND TIME PRINT
    // =================================
    const interval = setInterval(() => {
      const currentTime = new Date().toLocaleTimeString();

      console.log("⏰ Time:", currentTime);

      // client ko bhejna ho to
      socket.emit("time", {
        time: currentTime,
      });
    }, 1000);

    // =================================
    // JOIN ROOM
    // =================================
    socket.on("joinRoom", (room) => {
      socket.join(room);

      socket.emit("roomJoined", {
        room,
      });
    });

    // =================================
    // DISCONNECT
    // =================================
    socket.on("disconnect", () => {
      console.log("❌ Disconnected:", socket.id);

      // IMPORTANT
      clearInterval(interval);
    });
  });
};