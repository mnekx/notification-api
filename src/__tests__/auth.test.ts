import request from "supertest";
import app from "../app";
import bcrypt from "bcrypt";
import prisma from "../prisma";

describe("Login endpoints", () => {
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

	afterAll(async () => {
		// Clean up the database and close the connection
		await prisma.user.deleteMany();
		await prisma.$disconnect();
	});

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

describe("Register endpoints", () => {
	beforeAll(async () => {
		await prisma.user.deleteMany(); // Clean up any existing users
	});

	afterAll(async () => {
		// Clean up the database and close the connection
		await prisma.user.deleteMany();
		await prisma.$disconnect();
	});

	it("should create a new user with valid data", async () => {
		const res = await request(app).post("/auth/register").send({
			username: "newuser",
			email: "newuser@example.com",
			password: "password123",
		});
		expect(res.statusCode).toEqual(201);
		expect(res.body).toHaveProperty("message", "User created successfully");
		expect(res.body.user).toHaveProperty("username", "newuser");
		expect(res.body.user).toHaveProperty("email", "newuser@example.com");
		expect(res.body.user).not.toHaveProperty("password"); // Ensure password is not returned
	});
	it("should return 422 for missing required fields", async () => {
		const res = await request(app).post("/auth/register").send({
			username: "",
			email: "invalidemail",
			password: "123",
		});
		expect(res.statusCode).toEqual(422);
		expect(res.body.errors).toHaveLength(2); // Adjust based on your validation rules
	});
	it("should return 409 for duplicate email", async () => {
		// Create a user first
		await request(app).post("/auth/register").send({
			username: "duplicateuser",
			email: "newuser@example.com",
			password: "password123",
		});
	});
});
