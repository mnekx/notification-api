# 1. Use official Node.js image
FROM node:18

# 2. Set working directory
WORKDIR /app

# 3. Copy package files and install dependencies
COPY package*.json ./
RUN npm ci

# 4. Copy all application files including prisma schema
COPY . .

# 5. Set ENV for Prisma to find the DB
ENV DATABASE_URL="file:./dev.db"

# 6. Generate Prisma client
RUN npx prisma generate

# 7. Push schema to SQLite (creates dev.db)
RUN npx prisma db push

# 8. Build the app
RUN npm run build

# 9. Expose port
EXPOSE 3000

# 10. Start the app
CMD ["node", "dist/app.js"]
