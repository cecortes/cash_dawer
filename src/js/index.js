"use strict";

// Import modules
import * as jarvis from "./jarvis.js";

/* -->> Ready <<-- */
$(function () {
  // Capture DOM elements
  var btnCon = $("#btn_con");
  var btnDis = $("#btn_uncon");
  var btnRead = $("#btn_opn");
  var btnWrite = $("#btn_cls");
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

  btnRead.on("click", (event) => {
    // Event prevent default
    event.preventDefault();

    // Read serial port
    //jarvis.readSerialPort(puerto, true);

    // Read serial port with handling errors
    //jarvis.readSerialPortWithHandlingExceptions(puerto, true);

    // Read serial with textDecoder
    jarvis.readSerialPortWithDecoderStream(puerto, true);
  });

  btnWrite.on("click", (event) => {
    // Event prevent default
    event.preventDefault();

    // Write Raw serial port
    //var datos = new Uint8Array([104, 101, 108, 108, 111]);
    //var datos = new Uint8Array([111]);
    //jarvis.writeRawSerialPort(puerto, datos, true);

    // Write serial port doesn't work
    jarvis.writeSerialPort(puerto, "o", true);
  });
});
