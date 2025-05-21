import request from "supertest";
import express from "express";
import authMiddleware from "../middleware/auth";

const app=express();
app.use(authMiddleware);
app.get("/protected", (req, res) => {
    res.status(200).json({ message: "Protected route accessed" });
});

describe("Auth Middleware", () => {
    it("should return 401 if no token is provided", async () => {
        const res = await request(app).get("/protected");
        expect(res.statusCode).toEqual(401);
        expect(res.body).toHaveProperty("message", "No token provided");
    });

    it("should return 401 if token is invalid", async () => {
        const res = await request(app)
            .get("/protected")
            .set("Authorization", "Bearer invalidtoken");
        expect(res.statusCode).toEqual(401);
        expect(res.body).toHaveProperty("message", "Invalid token");
    });
});