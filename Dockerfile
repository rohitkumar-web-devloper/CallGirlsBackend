# Use the official Node.js image
FROM node:14

# Set the working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Install nodemon and TypeScript globally
RUN npm install -g nodemon typescript

# Copy the rest of your application code
COPY . .

# Compile TypeScript files
RUN tsc

# Expose the port your app runs on
EXPOSE 7575

# Start the application using nodemon with TypeScript
CMD ["nodemon", "--legacy-watch", "dist/index.js"] # Ensure 'dist/index.js' is the correct entry file after compilation
