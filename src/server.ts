// src/server.ts
import app from './app';
import dotenv from 'dotenv';

dotenv.config({
	path:
		process.env.NODE_ENV === "test"
			? ".env.test"
			: process.env.NODE_ENV === "production"
			? ".env.production"
			: ".env",
});


const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Notification service running at http://localhost:${PORT}`);
});
