import express from "express";
import bodyParser from "body-parser";
import { NotificationFactory } from "./factory/notification-factory";
import userRoutes from "./routes/user";
import authMiddleware from "./middleware/auth";

const app = express();
const port = 3000;
app.use(express.json());
app.use(bodyParser.json());

app.use("/auth", userRoutes);

app.get("/", (req, res) => {
	res.send("Notification Service");
});
// Define routes for different notification types

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

app.listen(port, () => {
	console.log(`Notification service running at http://localhost:${port}`);
});

export { app };
