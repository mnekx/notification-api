import { TwilioSmsNotification } from "../notifications/sms";
import prisma from "../prisma";
import { SendStrategy } from "../strategies/send-strategy";

jest.mock("../../src/prisma", () => ({
	notification: {
		create: jest.fn(),
	},
}));

describe("TwilioSmsNotification", () => {
	const mockSender: SendStrategy = {
		send: jest.fn(),
	};

	beforeEach(() => {
		jest.clearAllMocks();
	});

	test("sends SMS and logs to database on success", async () => {
		const notification = new TwilioSmsNotification(
			"+255712345678",
			"Hello, this is a test message.",
			mockSender
		);

		await notification.send();

		// Should call sender.send with phone and message
		expect(mockSender.send).toHaveBeenCalledWith({
			phone: "+255712345678",
			message: "Hello, this is a test message.",
		});

		// Should log the notification in the DB as SENT
		expect(prisma.notification.create).toHaveBeenCalledWith({
			data: {
				type: "SMS",
				recipient: "+255712345678",
				subject: "SMS Notification",
				message: "Hello, this is a test message.",
				status: "SENT",
			},
		});
	});

	test("logs error and throws when send fails", async () => {
		const error = new Error("Twilio failed");
		mockSender.send = jest.fn(() => {
			throw error;
		});

		const notification = new TwilioSmsNotification(
			"+255712345678",
			"Hello, this is a test message.",
			mockSender
		);

		await expect(notification.send()).rejects.toThrow("Twilio failed");

		// It should log the error as FAILED
		expect(prisma.notification.create).toHaveBeenCalledWith({
			data: {
				type: "SMS",
				recipient: "+255712345678",
				subject: "SMS Notification",
				message: "Hello, this is a test message.",
				status: "FAILED",
				error: "Twilio failed",
			},
		});
	});
});
