import { SendStrategy } from "./send-strategy";

export class ConsoleEmailSender implements SendStrategy {
	async send(data: any): Promise<void> {

		console.log(`SENDING EMAIL NOTIFICATION: ${JSON.stringify(data)}`);
	}
}
