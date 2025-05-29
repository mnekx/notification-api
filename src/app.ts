import express from "express";
import bodyParser from "body-parser";
import { NotificationFactory } from "./factory/notification-factory";
import userRoutes from "./routes/user";
import authMiddleware from "./middleware/auth";
import {
	deleteNotification,
	listNotifications,
	retryNotification,
} from "./controllers/notification";
import { authorizeAdmin, authorizeOwnerOrAdmin } from "./middleware/authorize";
import prisma from "./prisma";

const app = express();
const port = 3000;
app.use(express.json());
app.use(bodyParser.json());

app.get("/", (req, res) => {
	res.send("Healthy Notification Service");
});

app.use("/auth", userRoutes);

app.post("/email", authMiddleware, async (req, res) => {
	const { recipient, subject, body } = req.body;
	const emailNotification = NotificationFactory.createEmail(
		recipient,
		subject,
		body
	);
	await emailNotification.send();
	res.send({ status: "Email sent" });
});

app.post("/sms", authMiddleware, async (req, res) => {
	const { recipient, message } = req.body;
	const smsNotification = NotificationFactory.createSMS(recipient, message);
	await smsNotification.send();
	res.send({ status: "SMS sent" });
});

app.post("/push", authMiddleware, async (req, res) => {
	const { token, message, title } = req.body;
	const pushNotification = NotificationFactory.createPush(
		token,
		message,
		title
	);
	await pushNotification.send();
	res.send({ status: "Push notification sent" });
});

app.get("/notifications", authMiddleware, listNotifications);
app.delete(
	"/notifications/:id",
	authMiddleware,
	authorizeOwnerOrAdmin(async (req) => {
		const notification = await prisma.notification.findUnique({
			where: { id: req.params.id },
		});
		return notification?.userId ?? undefined;
	}),
	deleteNotification
);

app.post(
	"/notifications/:id/retry",
	authMiddleware,
	authorizeOwnerOrAdmin(async (req) => {
		const notification = await prisma.notification.findUnique({
			where: { id: req.params.id },
		});
		return notification?.userId ?? undefined;
	}),
	retryNotification
);

app.get("/admin", authMiddleware, authorizeAdmin, (req, res) => {
	res.status(200).json({ message: "Only admin functionality" });
	return;
});

if (process.env.NODE_ENV === "test") {
	app.get("/crash", (req, res) => {
		throw new Error("Simulated server error");
	});
}

// 404 Not Found fallback
app.use((req, res, next) => {
	res.status(404).json({ message: "Not found" });
});

// Error handler for unexpected errors
app.use((err: any, req: any, res: any, next: any) => {
	// console.error(err.stack);
	res.status(500).json({ message: "Something went wrong" });
});

export default app;
