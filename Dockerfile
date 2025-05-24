# Base image
FROM node:18-alpine AS builder

# Set working directory
WORKDIR /app

# Copy package files
COPY package.json package-lock.json ./

# Install dependencies
RUN npm ci

# Copy source files
COPY . .

# Generate Prisma client
RUN npx prisma generate

# Build TypeScript
RUN npm run build

# Optional: Prepare SQLite DB (for development/staging only)
# RUN npx prisma migrate deploy

# --------------------------------------
# Final image
FROM node:18-alpine

WORKDIR /app

# Copy node_modules and build output from builder
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/.env ./
COPY --from=builder /app/package*.json ./

# Generate Prisma client again (in case COPY breaks it)
RUN npx prisma generate

# Copy SQLite DB if needed (for development only)
COPY --from=builder /app/dev.db ./dev.db

# Expose app port
EXPOSE 3000

# Start app
CMD ["node", "dist/app.js"]
