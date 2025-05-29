import { FirebasePushNotification } from "../notifications/push";
import prisma from "../prisma";
import { jest } from "@jest/globals";

jest.mock("../prisma", () => ({
	notification: {
		create: jest.fn(),
	},
}));

describe("FirebasePushNotification", () => {
	afterEach(() => {
		jest.clearAllMocks();
	});

	test("logs a SENT notification when sender succeeds", async () => {
		const mockSender = {
			send: jest.fn().mockImplementation(() => Promise.resolve()),
		};

		const push = new FirebasePushNotification(
			"device-token-123",
			"Push message body",
			"Push title",
			mockSender
		);

		await push.send();

		expect(mockSender.send).toHaveBeenCalledWith({
			token: "device-token-123",
			title: "Push title",
			message: "Push message body",
		});

		expect(prisma.notification.create).toHaveBeenCalledWith({
			data: {
				type: "PUSH",
				recipient: "device-token-123",
				subject: "Push title",
				message: "Push message body",
				status: "SENT",
			},
		});
	});

	test("logs a FAILED notification when sender throws", async () => {
		const mockSender = {
			send: jest.fn().mockImplementation(() => {
				throw new Error("Failed to send push");
			}),
		};

		const push = new FirebasePushNotification(
			"fail-token-456",
			"Fail message",
			"Fail title",
			mockSender
		);

		await expect(push.send()).rejects.toThrow("Failed to send push");

		expect(mockSender.send).toHaveBeenCalled();

		expect(prisma.notification.create).toHaveBeenCalledWith({
			data: {
				type: "PUSH",
				recipient: "fail-token-456",
				subject: "Fail title",
				message: "Fail message",
				status: "FAILED",
				error: "Failed to send push",
			},
		});
	});
});
