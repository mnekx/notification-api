import request from "supertest";
import { PrismaClient } from "@prisma/client";
import { app } from "../app"; // Adjust the import based on your app's structure
const prisma = new PrismaClient();

let token: string;

beforeAll(async () => {
	process.env.DATABASE_URL = "file:./test.db"; // Adjust the database URL as needed
	await prisma.$connect();
	await prisma.notification.deleteMany(); // Clear notifications before tests

	// Create a test user and generate a token for authentication
	await request(app).post("/auth/register").send({
		email: "user@email.com",
		password: "password123",
		username: "newtestuser",
	});

	// Login to get the token
	const response = await request(app).post("/auth/login").send({
		email: "user@email.com",
		password: "password123",
	});

	token = response.body.token;
});

afterAll(async () => {
	await prisma.$disconnect();
});

describe("Notification API", () => {
	it("should create a new email notification", async () => {
		const response = await request(app)
        .post("/email")
        .set("Authorization", `Bearer ${token}`)
        .send({
			recipient: "test@example.com",
			subject: "Test Email",
			body: "This is a test email notification.",
		});
		expect(response.status).toBe(200);
		expect(response.body.status).toBe("Email sent");

		const notification = await prisma.notification.findMany({
			where: { type: "EMAIL" },
		});
		expect(notification.length).toBe(1);
		expect(notification[0].recipient).toBe("test@example.com");
	});
	it("should create a new SMS notification", async () => {
		const response = await request(app)
        .post("/sms")
        .set("Authorization", `Bearer ${token}`)
        .send({
			recipient: "+1234567890",
			message: "This is a test SMS notification.",
		});
		expect(response.status).toBe(200);
		expect(response.body.status).toBe("SMS sent");

		const notification = await prisma.notification.findMany({
			where: { type: "SMS" },
		});
		expect(notification.length).toBe(1);
		expect(notification[0].recipient).toBe("+1234567890");
	});
	it("should create a new push notification", async () => {
		const response = await request(app)
        .post("/push")
        .set("Authorization", `Bearer ${token}`)
        .send({
			token: "device123",
			message: "This is a test push notification.",
			title: "Test Push",
		});
		expect(response.status).toBe(200);
		expect(response.body.status).toBe("Push notification sent");
		const notification = await prisma.notification.findFirst({
			where: { type: "PUSH", recipient: "device123" },
		});
	});
});
