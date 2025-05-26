# 1. Use official Node.js image
FROM node:18

# 2. Set working directory
WORKDIR /app

# 3. Copy package files and install dependencies
COPY package*.json ./
RUN npm ci

# 4. Copy all application files including prisma schema
COPY . .

# 6. Generate Prisma client
RUN npx prisma generate

# 8. Build the app
RUN npm run build

# 9. Expose port
EXPOSE 3000

# 10. Start the app
CMD ["sh", "-c", "npx prisma migrate deploy && node dist/server.js"]
