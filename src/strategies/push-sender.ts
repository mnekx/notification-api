import { SendStrategy } from "./send-strategy";

export class FirebasePushSender implements SendStrategy {
	async send(data: any): Promise<void> {

		console.log(`SENDING PUSH NOTIFICATION: ${JSON.stringify(data)}`);
		// Here you would integrate with Firebase Cloud Messaging or another push service
	}
}
