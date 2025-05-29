import { ConsoleEmailNotification } from "../notifications/email";
import prisma from "../prisma";
import { jest } from "@jest/globals";

beforeEach(async () => {
	await prisma.notification.deleteMany(); // clean DB before each test
});

afterAll(async () => {
	await prisma.$disconnect(); // clean shutdown
});

test("EmailNotification sends and logs SENT", async () => {
	const mockSender = {
		send: jest.fn().mockImplementation(() => Promise.resolve()),
	};

	const emailNotification = new ConsoleEmailNotification(
		"test@example.com",
		"Hello",
		"Email body",
		mockSender
	);

	await emailNotification.send();

	const entries = await prisma.notification.findMany();
	expect(entries).toHaveLength(1);
	expect(entries[0]).toMatchObject({
		type: "EMAIL",
		recipient: "test@example.com",
		status: "SENT",
	});
});

test("EmailNotification logs FAILED on error", async () => {
	const mockSender = {
		send: jest.fn().mockImplementation(() => {
			throw new Error("Send failed");
		}),
	};

	const emailNotification = new ConsoleEmailNotification(
		"fail@example.com",
		"Fail Test",
		"Fail Body",
		mockSender
	);

	await expect(emailNotification.send()).rejects.toThrow("Send failed");

	const entries = await prisma.notification.findMany();
	expect(entries).toHaveLength(1);
	expect(entries[0]).toMatchObject({
		type: "EMAIL",
		recipient: "fail@example.com",
		status: "FAILED",
		error: "Send failed",
	});
});
