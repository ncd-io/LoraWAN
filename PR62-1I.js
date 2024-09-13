function decodeUplink(input) {
	let bytes = input.bytes;
	let dataPacketLength = 6;

	// Check for MODE message
	if(bytes[0] == 0x7a){
		return {
			text: "Mode Message Received",
			deviceType: bytes[1],
			// mode: Buffer.from(bytes.slice(2,5)).toString(),
			mode: String.fromCharCode(bytes[2])+String.fromCharCode(bytes[3])+String.fromCharCode(bytes[4]),
			packet: bytes
		}
	}
	// Check for command response message
	if(bytes[0] == 0x7c){
		let responses = bytes.slice(2);
		let report = [];
		do{
			let success = responses[1] == 0x7f;
			report.push({'cmdId': responses[0], "success": success, "length": responses[2], "payload": responses.slice(3, 3+responses[2])});
			responses = responses.slice(3+responses[2]);
		}while(responses.length);
		return {
			text: "Command Response Received",
			responses: report,
			packet: bytes
		}
	}
	// Finally check for erroneous data
	if(bytes.length != dataPacketLength){
		return {
			errors: ["Invalid Sensor Data sent to parser. Expected Payload with length of "+dataPacketLength],
			packet: bytes,
			expectedLength: dataPacketLength,
			receivedLength: bytes.length
		}
	}
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
