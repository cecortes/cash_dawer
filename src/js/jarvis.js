/* -->> Core Jarvis functions <<-- */

/* -->> Check for supported serial web API <<-- */
// Function to check if the serial web API is supported
// $debug: boolean to enable/disable debug messages
// Returns true if serial is supported, false if not
export function checkSerialSupport($debug) {
  if ("serial" in navigator) {
    if ($debug) {
      // Debug
      console.log("Serial is supported!");
    }
    // Alert user
    alert("Serial is supported!");
    // Return true
    return true;
  } else {
    if ($debug) {
      // Debug
      console.log("Serial is not supported!");
    }
    // Alert user
    alert("Serial is not supported!");
    // Return false
    return false;
  }
}

/* -->> Get serial ports <<-- */
// Function to get the serial ports
// $debug: boolean to enable/disable debug messages
// Returns a list of serial ports
export async function getSerialPorts($debug) {
  // Prompt user to select any serial port.
  const port = await navigator.serial.requestPort();

  // Wait for the serial port to open.
  //await port.open({ baudRate: 9600 });

  // If debug is enabled
  if ($debug) {
    // Debug
    console.log(port.getInfo());
    console.log(">> Jarvis Product ID: " + port.getInfo().usbProductId);
    console.log(">> Jarvis Vendor ID: " + port.getInfo().usbVendorId);
  }

  // Open serial port
  await openSerialPort(port, true);

  // Return the port
  return port;
}

/* -->> Open serial port <<-- */
// Function to open the serial port
// $port: serial port to open
// $debug: boolean to enable/disable debug messages
// Returns true if serial port is opened, false if not
export async function openSerialPort($port, $debug) {
  // Handle errors
  try {
    // Wait for the serial port to open.
    await $port.open({ baudRate: 9600 });

    // If debug is enabled
    if ($debug) {
      // Debug
      console.log(">> Jarvis: Port opened!");
    }

    // Return true
    return true;
  } catch (error) {
    // If debug is enabled
    if ($debug) {
      // Debug
      console.log(">> Jarvis Error: " + error);
    }

    // Return false
    return false;
  }
}

/* -->> Close serial port <<-- */
// Function to close the serial port
// $port: serial port to close
// $debug: boolean to enable/disable debug messages
// Returns true if serial port is closed, false if not
export async function closeSerialPort($port, $debug) {
  // Handle errors
  try {
    // Wait for the serial port to close.
    await $port.close();

    // If debug is enabled
    if ($debug) {
      // Debug
      console.log(">> Jarvis: Port closed!");
    }

    // Return true
    return true;
  } catch (error) {
    // If debug is enabled
    if ($debug) {
      // Debug
      console.log(">> Jarvis Error: " + error);
    }

    // Return false
    return false;
  }
}

/* -->> Read serial port <<-- */
// Function to read the serial port
// $port: serial port to read
// $debug: boolean to enable/disable debug messages
// Returns the data read from the serial port
export async function readSerialPort($port, $debug) {
  const reader = $port.readable.getReader();

  while (true) {
    const { value, done } = await reader.read();

    if (done) {
      // Allow the serial port to be closed later.
      reader.releaseLock();
      break;
    }

    // If debug is enabled
    if ($debug) {
      // Debug
      console.log(value);
    }
  }
}

/* -->> Read serial port with Handling Exceptions <<-- */
// Function to read the serial port with handling exceptions
// $port: serial port to read
// $debug: boolean to enable/disable debug messages
// Returns the data read from the serial port
export async function readSerialPortWithHandlingExceptions($port, $debug) {
  while ($port.readable) {
    const reader = $port.readable.getReader();

    try {
      while (true) {
        const { value, done } = await reader.read();

        if (done) {
          // Allow the serial port to be closed later.
          reader.releaseLock();
          break;
        }

        // If debug is enabled
        if ($debug) {
          // Debug
          console.log(value);
        }
      }
    } catch (error) {
      // Handle non-fatal read error.
      console.log(">> Jarvis Error: " + error);
      // Close the serial port.
      await $port.close();
      console.log(">> Jarvis: Port closed!");
      break;
    }
  }
}

/* -->> Read serial port with decoder stream <<-- */
// Function to read the serial port with decoder stream
// $port: serial port to read
// $debug: boolean to enable/disable debug messages
// Returns the data read from the serial port
export async function readSerialPortWithDecoderStream($port, $debug) {
  const textDecoder = new TextDecoderStream();
  const inputDone = $port.readable.pipeTo(textDecoder.writable);
  const inputStream = textDecoder.readable;
  const reader = inputStream.getReader();

  while (true) {
    const { value, done } = await reader.read();

    if (done) {
      // Allow the serial port to be closed later.
      reader.releaseLock();
      break;
    }

    // If debug is enabled
    if ($debug) {
      // Debug
      console.log(value);
    }
  }
}

/* -->> Write Raw serial port <<-- */
// Function to write raw data to the serial port
// $port: serial port to write
// $data: data array to write
// $debug: boolean to enable/disable debug messages
// Returns true if data is written, false if not
export async function writeRawSerialPort($port, $data, $debug) {
  const writer = $port.writable.getWriter();

  const dataArray = new Uint8Array($data);

  // Handle errors
  try {
    // Write data
    await writer.write(dataArray);

    // If debug is enabled
    if ($debug) {
      // Debug
      console.log(">> Jarvis: Data written!");
    }

    // Allow the serial port to be closed later.
    writer.releaseLock();

    // Return true
    return true;
  } catch (error) {
    // If debug is enabled
    if ($debug) {
      // Debug
      console.log(">> Jarvis Error: " + error);
    }

    // Return false
    return false;
  }
}

/* -->> Write serial port <<-- */
// Function to write data to the serial port
// $port: serial port to write
// $data: data to write
// $debug: boolean to enable/disable debug messages
// Returns true if data is written, false if not
export async function writeSerialPort($port, $data, $debug) {
  const encoder = new TextEncoder();
  const writer = $port.writable.getWriter();
  await writer.write(encoder.encode("o"));
  writer.releaseLock();
}

/* -->> Revoke Access to the serial port <<-- */
// Function to revoke access to the serial port
// $port: serial port to revoke access
// $debug: boolean to enable/disable debug messages
// Returns true if access is revoked, false if not
export async function revokeAccess($port, $debug) {
  // Handle errors
  try {
    // Revoke access
    await $port.requestPort();

    // If debug is enabled
    if ($debug) {
      // Debug
      console.log(">> Jarvis: Access revoked!");
    }

    // Return true
    return true;
  } catch (error) {
    // If debug is enabled
    if ($debug) {
      // Debug
      console.log(">> Jarvis Error: " + error);
    }

    // Return false
    return false;
  }
}
