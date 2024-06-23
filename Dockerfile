FROM node:18-alpine

# Set working directory
WORKDIR /usr/src/kidshift

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy Prisma files and generate Prisma client
COPY prisma ./prisma/
RUN npx prisma generate

# Copy the rest of the application code and build the project
COPY . .
RUN npm run build

# Set environment variables if necessary
ENV NODE_ENV=production

# Expose the application port
EXPOSE 3000

# Command to run the application
CMD ["npm", "start"]
