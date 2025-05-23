import { body, validationResult } from "express-validator";
import { Request, Response, NextFunction } from "express";

export const registerValidationRules = [
	body("username").notEmpty().withMessage("Username is required"),
	body("email").isEmail().withMessage("Invalid email format"),
	body("password")
		.isLength({ min: 3 })
		.withMessage("Password must be at least 3 characters long"),
];

export const loginValidationRules = [
	body("email").isEmail().withMessage("Invalid email format"),
	body("password").notEmpty().withMessage("Password is required"),
];

export const validate = (
	req: Request,
	res: Response,
	next: NextFunction
): void => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		res.status(422).json({ errors: errors.array() });
		return;
	}
	next();
};
