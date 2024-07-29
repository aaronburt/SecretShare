# Use the official Node.js 22 Alpine image for the build stage
FROM node:22-alpine AS builder

# Create and set the working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application files to the working directory
COPY . .

# Generate Prisma client
RUN npx prisma generate

# Build the application
RUN npm run build

# Use a minimal Alpine image and add Node.js for the final runtime stage
FROM alpine:3.18

# Install Node.js and bash
RUN apk add --no-cache nodejs bash curl

# Create and set the working directory
WORKDIR /usr/src/app

# Copy everything from the builder stage
COPY --from=builder /usr/src/app .

# Download wait-for-it.sh
RUN curl -o /usr/src/app/wait-for-it.sh https://raw.githubusercontent.com/vishnubob/wait-for-it/master/wait-for-it.sh && \
    chmod +x /usr/src/app/wait-for-it.sh

# Expose port 80
EXPOSE 80

# Add script to migrate the database and start the application
CMD ["sh", "-c", "./wait-for-it.sh mysql:3306 -- node dist/main.js"]
