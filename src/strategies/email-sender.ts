import { SendStrategy } from "./send-strategy";

export class ConsoleEmailSender implements SendStrategy {
	send(data: any): void {
		console.log(
			`Email to ${data.recipient} | Subject: ${data.subject}\n${data.body}`
		);
	}
}
