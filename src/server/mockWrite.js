/* ->> Importing Serial modules <<- */
const { MockBinding } = require("@serialport/binding-mock");
const { SerialPortStream } = require("@serialport/stream");
const { ReadlineParser } = require("@serialport/parser-readline");

/* ->> Create a fake port and enable the echo  and recording <<- */
MockBinding.createPort("COM69", { echo: true, record: true });

const port = new SerialPortStream({
  binding: MockBinding,
  path: "COM69",
  baudRate: 9600,
});

/* -->> Create a parser to read incoming data <<- */
const parser = new ReadlineParser();

/* -->> Create a pipe to parser and listen for incoming data <<- */
port.pipe(parser).on("data", (line) => {
  console.log(`>> Rx: ${line}`);

  // If the incoming data is "open" then open the cash drawer
  if (line === "open") {
    console.log(">> Opening cash drawer");
  }

  // If the incoming data is "close" then close the cash drawer
  if (line === "close") {
    console.log(">> Closing cash drawer");
  }
});

/* ->> Wait for port to open <<- */
port.on("open", () => {
  // Then test by simulate incoming data
  setInterval(message2, 1000);
});

/* -->> Generate a random number and send it to the port every 1 second <<- */
function message() {
  const data = Math.floor(Math.random() * 100);
  console.log(`<< Tx: ${data}`);
  port.write(`${data}\n`);
}

/* -->> Alternate between open and close <<- */
var data = 0;
function message2() {
  //console.log(`<< Fx: ${data}`);
  if (data === 0) {
    data = "open";
    port.write(`${data}\n`);
    data = 1;
  } else {
    data = "close";
    port.write(`${data}\n`);
    data = 0;
  }
}
