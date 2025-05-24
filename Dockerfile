# Use official Node.js image
FROM node:18

# Set working directory
WORKDIR /app

# Copy package files first to leverage Docker cache
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy the rest of the application
COPY . .

# Generate Prisma client
RUN npx prisma generate

# Push schema to SQLite to ensure the database file exists
RUN npx prisma db push

# Build TypeScript code
RUN npm run build

# Expose app port
EXPOSE 3000

# Start the application
CMD ["node", "dist/app.js"]
