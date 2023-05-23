/* ->> Importing Serial modules <<- */
//const { MockBinding } = require("@serialport/binding-mock");
//const { SerialPortStream } = require("@serialport/stream");
//const { ReadlineParser } = require("@serialport/parser-readline");

import { MockBinding } from "../../node_modules/@serialport/binding-mock/dist/index";
import { SerialPortStream } from "../../node_modules/@serialport/stream/dist/index";
import { ReadlineParser } from "../../node_modules/@serialport/parser-readline/dist/index";

/* ->> Create a fake port and enable the echo  and recording <<- */
MockBinding.createPort("COM69", { echo: true, record: true });
const port = new SerialPortStream({
  binding: MockBinding,
  path: "COM69",
  baudRate: 9600,
});

/*
Adding some action for incoming data. For example, print each incoming line in upper case
*/
const parser = new ReadlineParser();
port.pipe(parser).on("data", (line) => {
  console.log(`>> ${line.toUpperCase()}`);
});

/* ->> Wait for port to open <<- */
port.on("open", () => {
  // Then test by simulate incoming data
  port.port.emitData("Hello World\n");
});
