# Use an official Node.js runtime as a parent image
FROM node:18-alpine

# Set the working directory in the container
WORKDIR D:\container

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install Angular CLI globally and project dependencies
RUN npm install -g @angular/cli -force && npm install -force

# Copy the rest of the application code into the container
COPY . .

# Build the Angular app for production
RUN ng build --prod

# Expose the port the app will run on
EXPOSE 4200

# Serve the application
CMD ["ng", "serve", "--host", "0.0.0.0"]
