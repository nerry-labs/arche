FROM node:16 as builder

# Create app directory
WORKDIR /usr/src/build

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN yarn install
# If you are building your code for production
# RUN npm ci --only=production

# Bundle app source
COPY . .

RUN yarn build

FROM node:16.4-alpine3.14 as release

WORKDIR /usr/src/app
COPY --from=builder --chown=node:node /usr/src/build/dist /usr/src/app/
COPY --from=builder --chown=node:node /usr/src/build/node_modules /usr/src/app/node_modules/

EXPOSE 8080
CMD [ "node", "index.js" ]
