# Use an official Node.js runtime as a parent image
FROM node:19.3.0 AS development

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and yarn.lock to the working directory
COPY package.json yarn.lock ./

# Install development dependencies
RUN yarn install

# Copy the application code to the working directory
COPY . .

# Define the command to run the application
CMD [ "yarn", "start:dev" ]

# Stage for production
FROM node:19.3.0 AS production

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy only necessary files for production
COPY --from=development /usr/src/app/package.json ./
COPY --from=development /usr/src/app/yarn.lock ./
COPY --from=development /usr/src/app/src/ ./src/
COPY --from=development /usr/src/app/tsconfig.json ./
COPY --from=development /usr/src/app/.env ./

# Install production dependencies
RUN yarn install --production

# Build the application
RUN yarn build

# Define the command to run the production application
CMD [ "yarn", "start:prod" ]
