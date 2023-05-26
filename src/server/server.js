/* -->> To Serial Port <<- */
const { SerialPort } = require("serialport");

/* -->> Create a port <<-- */
const serial = new SerialPort({
  path: "COM9",
  baudRate: 9600,
});

/* -->> To mount a server <<-- */
const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const path = require("path");
const port = 6969;

/* --> Serve static files from the public directory <-- */
// Fixing error to cannot load Mime type for css and js files
app.use(express.static(path.join(__dirname, "public")));

/* --> Serve the index.html file when the browser requests the root directory <-- */
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

/* --> Listen for incoming socket connections <-- */
io.on("connection", (socket) => {
  // User connected
  console.log("a user connected");

  // Listen for incoming data drawer
  socket.on("drawer", (data) => {
    // Debug incoming data
    console.log(`>> Rx: ${data.drawer}`);

    // If the incoming data is "open" then open the cash drawer
    if (data.drawer === "open") {
      // Send data to serial port
      serial.write("o\r\n");

      // Debug outgoing data
      console.log(">> Opening cash drawer");
    }

    // If the incoming data is "close" then close the cash drawer
    if (data.drawer === "close") {
      // Send data to serial port
      serial.write("c\r\n");

      // Debug outgoing data
      console.log(">> Closing cash drawer");
    }
  });
});

/* --> Start the server listening on port var <-- */
server.listen(port, () => {
  console.log(">> Listening on port: " + port);
});
