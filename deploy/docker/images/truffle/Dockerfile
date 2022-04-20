FROM node:17

# Set work directory
WORKDIR /

# Copy dependencies files
COPY ./backend/package.json \
    ./backend/yarn.lock \
    /

# Install backend dependencies
RUN yarn install -g --production

RUN npm config set bin-links false

# Copy contract Files
COPY ./backend /backend

# Copy scripts and set execution permissions
COPY ./deploy/docker/images/truffle/truffle.sh /truffle.sh
COPY ./deploy/docker/images/truffle/truffle-test.sh /truffle-test.sh
COPY ./deploy/docker/development/truffle-dev.sh /truffle-dev.sh
COPY ./deploy/docker/production/truffle-prod.sh /truffle-prod.sh
RUN chmod +x /*.sh

# Default command to run when starting the container
ENTRYPOINT ./truffle.sh
