import { Router, Request, Response, NextFunction } from "express";
import { PrismaClient } from "@prisma/client";
import { hashPassword, comparePassword, generateToken } from "../utils/auth";
import { registerValidationRules, loginValidationRules, validate } from "../middleware/validate";

const router = Router();
const prisma = new PrismaClient();

router.post("/register", registerValidationRules, validate, async (req: Request, res: Response) => {
	const { username, email, password, role } = req.body;

	try {
		const hashedPassword = hashPassword(password);
		const user = await prisma.user.create({
			data: {
				username,
				email,
				password: hashedPassword,
				role: role || "USER", // Default to USER if no role is provided
			},
		});
		delete (user as {password?: string}).password; // Remove password from response
		res.status(201).json({ message: "User created successfully", user });
	} catch (error) {
		res.status(500).json({ error: "Error creating user" });
	}
});

router.post("/login", loginValidationRules, validate,  async (req: any, res: any) => {
	const { email, password } = req.body;

	try {
		const user = await prisma.user.findUnique({
			where: { email },
		});

		if (!user) {
			return res.status(401).json({ error: "Invalid credentials" });
		}

		const isPasswordValid = comparePassword(password, user.password);

		if (!isPasswordValid) {
			return res.status(401).json({ error: "Invalid credentials" });
		}

		const token = generateToken(user.id, user.role);

		res.status(200).json({ message: "Login successful", token });
	} catch (error) {
		res.status(500).json({ error: "Error logging in" });
	}
});

export default router;
