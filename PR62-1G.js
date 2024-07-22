function decodeUplink(input) {
    let bytes = input.bytes;
  
    // Decode each part of the payload
    let firmwareVersion = bytes[0];
    let batt = bytes[1];
    let deviceType = bytes[2];
    let messageStatus = bytes[3];
  
    // Decode ADC value (5th and 6th bytes, unsigned 16-bit)
    let adc = ((bytes[4] << 8) | bytes[5]);
  
    // Decode volt (7th and 8th bytes, unsigned 16-bit, divided by 100)
    let volt = ((bytes[6] << 8) | bytes[7]) / 100;
  
    // Return the decoded values
    return {
      data: {
        firmwareVersion: firmwareVersion,
        batt: batt,
        deviceType: deviceType,
        messageStatus: messageStatus,
        adc: adc,
        volt: volt
      }
    };
  }