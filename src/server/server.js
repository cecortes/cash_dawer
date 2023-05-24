const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
var path = require("path");

app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

io.on("connection", (socket) => {
  // User connected
  console.log("a user connected");

  // Listen for incoming data drawer
  socket.on("drawer", (data) => {
    // Debug incoming data
    console.log(`>> Rx: ${data.drawer}`);

    // If the incoming data is "open" then open the cash drawer
    if (data.drawer === "open") {
      console.log(">> Opening cash drawer");
    }

    // If the incoming data is "close" then close the cash drawer
    if (data.drawer === "close") {
      console.log(">> Closing cash drawer");
    }
  });
});

server.listen(3000, () => {
  console.log("listening on *:3000");
});
