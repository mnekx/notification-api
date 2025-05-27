import request from "supertest";
import app from "../app";
import prisma from "../prisma";
import jwt from "jsonwebtoken";

const createToken = (id: number, role: string) => {
	return jwt.sign({ id, role }, process.env.JWT_SECRET, { expiresIn: "1h" });
};

describe("Notification Access Tests", () => {
	let adminToken: string;
	let userToken: string;
	let otherUserToken: string;
	let userNotificationId: string;
	let otherUserNotificationId: string;

	beforeAll(async () => {
		await prisma.notification.deleteMany({});

		userToken = createToken(1, "USER");
		otherUserToken = createToken(2, "USER");
		adminToken = createToken(3, "ADMIN");
		// Create a test user and admin
		const userNotification = await prisma.notification.create({
			data: {
				type: "EMAIL",
				userId: 1,
				recipient: "user@example.com",
				message: "This is a test",
				subject: "Hello",
			},
		});

		const otherNotification = await prisma.notification.create({
			data: {
				type: "EMAIL",
				recipient: "öther@example.com",
				subject: "Hello",
				message: "This is a test",
				userId: 2,
			},
		});

		userNotificationId = userNotification.id;
		otherUserNotificationId = otherNotification.id;
	});

	test("User can list their own notification", async () => {
		const res = await request(app)
			.get("notifications")
			.set("Authorization", `Bearer ${userToken}`);

		expect(res.statusCode).toBe(200);
		expect(res.body).toEqual(
			expect.arrayContaining([
				expect.objectContaining({ id: userNotificationId }),
			])
		);
		expect(res.body).not.toEqual(
			expect.arrayContaining([
				expect.objectContaining({ id: otherUserNotificationId }),
			])
		);
	});

	test("Admin can list all notifications", async () => {
		const res = await request(app)
			.get("/notifications")
			.set("Authorization", `Bearer ${adminToken}`);

		expect(res.statusCode).toBe(200);
		expect(res.body).toEqual(
			expect.arrayContaining([
				expect.objectContaining({ id: userNotificationId }),
				expect.objectContaining({ id: otherUserNotificationId }),
			])
		);
	});

	test("User can retry their own notification", async () => {
		const res = await request(app)
			.post(`/notifications/${userNotificationId}/retry`)
			.set("Authorization", `Bearer ${userToken}`);

		expect(res.statusCode).toBe(200);
		expect(res.body.message).toMatch(/Notification retried/i);
	});

	test("User can not retry other user's notification", async () => {
		const res = await request(app)
			.post(`/notificaitons/${otherUserNotificationId}/retry`)
			.set("Authorization", `Bearer ${userToken}`);

		expect(res.statusCode).toBe(403);
	});

	test("Admin can retry any notification", async () => {
		const res = await request(app)
			.post(`/notifications/${otherUserNotificationId}/retry`)
			.set("Authorization", `Bearer ${adminToken}`);

		expect(res.statusCode).toBe(200);
	});

	test("User can delete their own notification", async () => {
		const res = await request(app)
			.delete(`/notifications/${userNotificationId}`)
			.set("Authorization", `Bearer ${userToken}`);
		expect(res.statusCode).toBe(200);
	});

	test("User cannot delete another user's notification", async () => {
		const res = await request(app)
			.delete(`/notification/${otherUserNotificationId}`)
			.set("Authorization", `Bearer ${userToken}`);

		expect(res.statusCode).toBe(403);
	});

	test("Admin can delete any notification", async () => {
		const res = await request(app)
			.delete(`/notification/${otherUserNotificationId}`)
			.set("Authorization", `Bearer ${adminToken}`);

            expect(res.statusCode).toBe(200);
	});
});
