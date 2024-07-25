function decodeUplink(input) {
    let bytes = input.bytes;
  
    // Decode each part of the payload
    let firmwareVersion = bytes[0];
    let batt = bytes[1];
    let deviceType = bytes[2];
    let messageStatus = bytes[3];
  
    // Decode rea (5th and 6th bytes, unsigned 16-bit)
    let reading = ((bytes[4] << 8) | bytes[5]);
  
    // Decode reserved (7th and 8th bytes, unsigned 16-bit, divided by 100)
    let reserved = ((bytes[6] << 8) | bytes[7]) / 100;
  
    // Return the decoded values
    return {
      data: {
        firmwareVersion: firmwareVersion,
        batt: batt,
        deviceType: deviceType,
        messageStatus: messageStatus,
        distance: reading,
        reserved: reserved
      }
    };
  }
