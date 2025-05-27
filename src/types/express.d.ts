// src/types/express.d.ts
import { AuthUser } from "./user";

declare global {
	namespace Express {
		interface Request {
			user?: AuthUser;
			notification?: { userId: string };
		}
	}
}
