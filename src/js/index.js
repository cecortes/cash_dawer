"use strict";

// Import modules
import * as jarvis from "./jarvis.js";

/* -->> Ready <<-- */
$(function () {
  // Capture DOM elements
  var btnCon = $("#btn_con");
  var btnDis = $("#btn_uncon");
  var puerto;

  // Check if browser support serial
  jarvis.checkSerialSupport(true);

  // Event listeners
  btnCon.on("click", async (event) => {
    // Event prevent default
    //event.preventDefault();

    // Get serial ports
    puerto = await jarvis.getSerialPorts(true);

    //console.log(">> HTML Port: " + puerto.usbProductId);
    //console.log(">> HTML Port: " + puerto.usbVendorId);
  });

  btnDis.on("click", (event) => {
    // Event prevent default
    event.preventDefault();

    // Close serial port
    jarvis.closeSerialPort(puerto, true);

    // Debug
    //console.log(">> HTML Port: " + puerto.getInfo());
  });
});

//document.getElementById("btn_con").addEventListener("click", start);
/*document.getElementById("btn_con").addEventListener("click", async () => {
  // Prompt user to select any serial port.
  const port = await navigator.serial.requestPort();

  // Wait for the serial port to open.
  await port.open({ baudRate: 9600 });

  while (port.readable) {
    const reader = port.readable.getReader();

    try {
      while (true) {
        const { value, done } = await reader.read();
        if (done) {
          // Allow the serial port to be closed later.
          reader.releaseLock();
          break;
        }
        if (value) {
          console.log(value);
        }
      }
    } catch (error) {
      // TODO: Handle non-fatal read error.
    }
  }
});

document.getElementById("btn_con").addEventListener("click", async () => {
  // Prompt user to select any serial port.
  const port = await navigator.serial.requestPort();

  const bufferSize = 1024; // 1kB
  let buffer = new ArrayBuffer(bufferSize);

  // Set `bufferSize` on open() to at least the size of the buffer.
  await port.open({ baudRate: 9600, bufferSize });

  const reader = port.readable.getReader({ mode: "byob" });
  while (true) {
    const { value, done } = await reader.read(new Uint8Array(buffer));
    if (done) {
      break;
    }
    buffer = value.buffer;
    // Handle `value`.
    console.log(buffer);
  }
});
*/
