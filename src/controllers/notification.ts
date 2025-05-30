import { Request, Response } from "express";
import prisma from "../prisma";
import { Prisma } from "@prisma/client";

export const listNotifications = async (req: Request, res: Response) => {
	const where: Prisma.NotificationWhereInput | undefined =
		req.user?.role === "ADMIN" ? undefined : { userId: Number(req.user?.id) };
	const notifications = await prisma.notification.findMany({
		where,
		orderBy: { createdAt: "desc" },
	});
	res.status(200).json(notifications);
};

export const deleteNotification = async (
	req: Request,
	res: Response
): Promise<void> => {
	const { id } = req.params;
	const notification = await prisma.notification.findUnique({ where: { id } });

	if (!notification) res.status(404).json({ error: "Notification not found" });

	await prisma.notification.delete({ where: { id } });
	res.status(204).send();
};

export const retryNotification = async (
	req: Request,
	res: Response
): Promise<void> => {
	const { id } = req.params;
	const notification = await prisma.notification.findUnique({ where: { id } });

	if (!notification) {
		res.status(404).json({ message: "Notification not found!" });
		return;
	}

	if (notification?.status === "SENT") {
		res.status(409).json({ message: "Already been sent" });
		return;
	}

	const updated = await prisma.notification.update({
		where: { id },
		data: { status: "PENDING", error: null },
	});

	res.status(200).json({ ...updated, message: "Notification retried" });
};
