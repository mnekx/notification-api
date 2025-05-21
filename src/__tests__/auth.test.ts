import request from "supertest";
import { app } from "../app";

describe("Authentication endpoints", () => {
	it("should return a JWT token for valid credentials", async () => {
		const res = await request(app)
			.post("/auth/login")
			.send({ email: "test@mail.com", password: "password123" });
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
