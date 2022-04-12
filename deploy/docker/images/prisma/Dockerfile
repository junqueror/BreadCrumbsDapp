# ---------------------------- Base Node ----------------------------

# Start from an official Node image
FROM node:17-alpine3.14 AS base

# Set work directory
WORKDIR /

# Install OS dependencies
RUN apk add --update

# Create log dir and files
RUN mkdir -p /logs

# Copy dependencies files
COPY ./package.json /

# Install common dependencies
RUN yarn global add prisma dotenv-cli

# Copy project code
COPY ./prisma /prisma

# Default command to run when starting the container
CMD dotenv -e .env.production -- npx prisma migrate deploy
