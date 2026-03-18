# Use Node 14 (Debian-based)
FROM node:14

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy all source files
COPY . .

# Expose port 3000 (React default)
EXPOSE 3000

# Start the app
CMD ["npm", "start"]