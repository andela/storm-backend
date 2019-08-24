# Base Image to build this new image on
FROM node:10.14.1
# Set ENV to Production
ARG NODE_ENV=development
ENV NODE_ENV=${NODE_ENV}
# Set working directory
WORKDIR /src/app/backend
# Copy source code into the working directory
COPY . /src/app/backend
# Install npm dependencies
RUN yarn install
# Transpile project down to ES5
RUN yarn run build
EXPOSE ${SERVER_PORT}
# Sets the command and parameters that will be executed first when a container is ran.
ENTRYPOINT ["yarn", "start"]
