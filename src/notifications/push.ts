import { Notification } from "./base";
import { SendStrategy } from "../strategies/send-strategy";
import prisma from "../prisma";

export class FirebasePushNotification extends Notification {
	constructor(
		private deviceToken: string,
		private message: string,
		private title: string,
		sender: SendStrategy
	) {
		super(sender);
	}

	async send(): Promise<void> {
		try {
			// Simulate sending a push notification by logging to console
			console.log(
				`Sending push notification to ${this.deviceToken}: ${this.title} - ${this.message}`
			);

			const data = {
				deviceToken: this.deviceToken,
				title: this.title,
				message: this.message,
			};
			this.sender.send(data);

			// Log the push notification to the database
			prisma.notification.create({
				data: {
					type: "PUSH",
					recipient: this.deviceToken,
					subject: this.title,
					message: this.message,
					status: "SENT",
				},
			});
		} catch (error) {
			console.error("Error sending push notification:", error);
			// Log the error to the database
			prisma.notification.create({
				data: {
					type: "PUSH",
					recipient: this.deviceToken,
					subject: this.title,
					message: this.message,
					status: "FAILED",
					error: error instanceof Error ? error.message : String(error),
				},
			});
			throw error; // Re-throw the error after logging
		}
	}
}
