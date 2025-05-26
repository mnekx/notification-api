// src/server.ts
import app from './app';
import dotenv from 'dotenv';

dotenv.config(); // Load .env.production in deploy, .env locally

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Notification service running at http://localhost:${PORT}`);
});
