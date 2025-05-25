import { SendStrategy } from "./send-strategy";

export class ConsoleEmailSender implements SendStrategy {
	send(data: any): void {
		console.log(
			`SENDING EMAIL NOTIFICATION: ${JSON.stringify(data)}`
		);
	}
}
