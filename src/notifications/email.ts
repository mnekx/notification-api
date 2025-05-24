import { Notification } from "./base";
import { SendStrategy } from "../strategies/send-strategy";
import prisma from "../prisma";

export class ConsoleEmailNotification extends Notification {
	constructor(
		private recipient: string,
		private subject: string,
		private body: string,
		sender: SendStrategy
	) {
		super(sender);
	}

	async send(): Promise<void> {
		try {
			// Simulate sending an email by loggig to console
			console.log(
				`Sending email to ${this.recipient}: ${this.subject} - ${this.body}`
			);

			const data = {
				recipient: this.recipient,
				subject: this.subject,
				body: this.body,
			};
			this.sender.send(data);
			// Log the email notification to the database
			await prisma.notification.create({
				data: {
					type: "EMAIL",
					recipient: this.recipient,
					subject: this.subject,
					message: this.body,
					status: "SENT",
				},
			});
		} catch (error) {
			console.error("Error sending email:", error);
			// Log the error to the database
			await prisma.notification.create({
				data: {
					type: "EMAIL",
					recipient: this.recipient,
					subject: this.subject,
					message: this.body,
					status: "FAILED",
					error: error instanceof Error ? error.message : String(error),
				},
			});
			throw error; // Re-throw the error after logging
		}
	}
}
