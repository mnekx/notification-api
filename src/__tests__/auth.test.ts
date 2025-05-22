import request from "supertest";
import { app } from "../app";
import bcrypt from "bcrypt";
import prisma from "../prisma";

beforeAll(async () => {
	// Mock the database connection and any other setup needed
	const passwordHash = await bcrypt.hash("password123", 10);
	const user = await prisma.user.create({
		data: {
			username: "testusername",
			email: "test@email.com",
			password: passwordHash,
		},
	});
});

describe("Authentication endpoints", () => {
	it("should return a JWT token for valid credentials", async () => {
		const res = await request(app)
			.post("/auth/login")
			.send({ email: "test@email.com", password: "password123" });
		expect(res.statusCode).toEqual(200);
		expect(res.body).toHaveProperty("token");
	});
	it("should return 401 for invalid credentials", async () => {
		const res = await request(app)
			.post("/auth/login")
			.send({ email: "invalid@example.com", password: "wrongpassword" });
		expect(res.statusCode).toEqual(401);
	});
});

afterAll(async () => {
	// Clean up the database and close the connection
	await prisma.user.deleteMany();
	await prisma.$disconnect();
});
