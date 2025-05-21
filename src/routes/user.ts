import { Router } from "express";
import { PrismaClient } from "@prisma/client";
import { hashPassword, comparePassword, generateToken } from "../utils/auth";

const router = Router();
const prisma = new PrismaClient();

router.post("/register", async (req, res) => {
	const { username, email, password } = req.body;

	try {
		const hashedPassword = hashPassword(password);
		const user = await prisma.user.create({
			data: {
				username,
				email,
				password: hashedPassword,
			},
		});

		res.status(201).json({ message: "User created successfully", user });
	} catch (error) {
		res.status(500).json({ error: "Error creating user" });
	}
});

router.post("/login", async (req: any, res: any) => {
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

		const token = generateToken(user.id);

		res.status(200).json({ message: "Login successful", token });
	} catch (error) {
		res.status(500).json({ error: "Error logging in" });
	}
});

export default router;
