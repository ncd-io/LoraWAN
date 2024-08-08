function decodeUplink(input) {
    let bytes = input.bytes;
  
    // Decode each part of the payload
    let firmwareVersion = bytes[0];
    let voltage = bytes[1];
    let deviceType = bytes[2];
    let messageStatus = bytes[3];
  
    // Decode DAC value (5th and 6th bytes, unsigned 16-bit)
    let dac = ((bytes[4] << 8) | bytes[5]);
  
    // Return the decoded values
    return {
      data: {
        firmwareVersion: firmwareVersion,
        voltage: voltage,
        deviceType: deviceType,
        messageStatus: messageStatus,
        dac: dac
      }
    };
  }