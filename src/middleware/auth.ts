import jwt from "jsonwebtoken";

const authMiddleware = (req: any, res: any, next: any) => {
	const authHeader = req.headers["authorization"];
	if (!authHeader || !authHeader.startsWith("Bearer ")) {
		return res.status(401).json({ message: "No token provided" });
	}

	try {
		const token = authHeader.split(" ")[1];
		const decoded = jwt.verify(token, process.env.JWT_SECRET) as {
			id: number;
			role: "USER" | "ADMIN";
		};
		req.user = decoded;
		next();
	} catch (error) {
		return res.status(401).json({ message: "Invalid token" });
	}
};
export default authMiddleware;
