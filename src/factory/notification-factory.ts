import { ConsoleEmailNotification } from "../notifications/email";
import { TwilioSmsNotification } from "../notifications/sms";
import { FirebasePushNotification } from "../notifications/push";
import { Notification } from "../notifications/base";

import { ConsoleEmailSender } from "../strategies/email-sender";
// import { SendGridEmailSender } from "../strategies/sendgrid-email-sender";
import { TwilioSMSSender } from "../strategies/sms-sender";
import { FirebasePushSender } from "../strategies/push-sender";

export class NotificationFactory {
	static createEmail(
		recipient: string,
		subject: string,
		body: string
	): Notification {
		// const provider = process.env.EMAIL_PROVIDER || 'console';

		// const strategy = provider === 'sendgrid'? new SendGridEmailSender() : new ConsoleEmailSender();
		return new ConsoleEmailNotification(
			recipient,
			subject,
			body,
			new ConsoleEmailSender()
		);
	}

	static createSMS(recipient: string, message: string): Notification {
		return new TwilioSmsNotification(recipient, message, new TwilioSMSSender());
	}

	static createPush(
		deviceToken: string,
		message: string,
		title: string
	): Notification {
		return new FirebasePushNotification(
			deviceToken,
			message,
			title,
			new FirebasePushSender()
		);
	}
}
