import { Request, Response, NextFunction } from "express";

export const authorizeAdmin = (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	if (req.user?.role !== "ADMIN") {
		res.status(403).json({ message: "Admin access required." });
	}
	next();
};

export const authorizeOwnerOrAdmin = (
	getOwnerId: (req: Request) => Promise<number | undefined>
) => {
	return async (
		req: Request,
		res: Response,
		next: NextFunction
	): Promise<void | undefined> => {
		const ownerId = await getOwnerId(req);

		if(!ownerId) res.status(404).json({message: "Notification not found!"})

		if (!req.user) {
			res.status(401).json({ message: "Authentication required!" });
			return;
		}

		if (req.user.role !== "ADMIN" && req.user.id !== ownerId) {
			res.status(403).json({ message: "Access denied." });
			return;
		}

		next();
	};
};
