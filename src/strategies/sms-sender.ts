import { SendStrategy } from "./send-strategy";

export class TwilioSMSSender implements SendStrategy {
	async send(data: any): Promise<void> {

		console.log(`SENDING SMS NOTIFICATION: ${JSON.stringify(data)}`);
		// Here you would integrate with Twilio or another SMS service
	}
}
