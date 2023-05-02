###################
# BUILD FOR LOCAL DEVELOPMENT
###################

FROM node:18-alpine As development

# Set port 3000 to open
# This is commented out because not all application need an open port
#ARG PORT=3000
#ENV PORT $PORT

# Create app directory
WORKDIR /usr/src/app

# Copy application dependency manifests to the container image.
# A wildcard is used to ensure copying both package.json AND package-lock.json (when available).
# Copying this first prevents re-running npm install on every code change.
COPY --chown=node:node package*.json ./

# Install app dependencies using the `npm ci` command instead of `npm install`
RUN npm ci

# Bundle app source
COPY --chown=node:node . .

# Use the node user from the image (instead of the root user)
USER node

###################
# BUILD FOR PRODUCTION
###################

FROM node:18-alpine As build

WORKDIR /usr/src/app

COPY --chown=node:node package*.json ./

COPY --chown=node:node --from=development /usr/src/app/node_modules ./node_modules

COPY --chown=node:node . .

# Run the test commands
RUN npm run test
# Enable lint in this line
# RUN npm run lint

# Run the build command which creates the production bundle
RUN npm run build

# Set NODE_ENV environment variable
ENV NODE_ENV production

# Running `npm ci` removes the existing node_modules directory.
# Passing in --only=production ensures that only the production dependencies are installed.
# This ensures that the node_modules directory is as optimized as possible.
RUN npm ci --only=production && npm cache clean --force

USER node
###################
# PRODUCTION DEPLOYMENT
###################

# Use apline package to keep it small
FROM node:18-alpine As production

# set our node environment, either development or production
# defaults to production, compose overrides this to development on build and run
ARG NODE_ENV=production
ENV NODE_ENV $NODE_ENV

# Set port 3000 to open
# This is commented out because not all application need an open port
#ARG PORT=3000
#ENV PORT $PORT

# Copy the bundled code from the build stage to the production image
COPY --chown=node:node --from=build /usr/src/app/node_modules ./node_modules
COPY --chown=node:node --from=build /usr/src/app/build ./build

#Expose port 3000
# This is commented out because not all application need an open port
#EXPOSE ${PORT}

# check every 30s to ensure this service returns HTTP 200
# This is commented out because not all application have a healthcheck endpoint
#HEALTHCHECK --interval=30s CMD wget --no-verbose --tries=1 --spider http://0.0.0.0:$PORT/v1/healthz #todo

USER node

# Start the server using the production build
CMD [ "node", "--max_old_space_size=450", "build/index.js" ]
