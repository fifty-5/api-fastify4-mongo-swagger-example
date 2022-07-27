FROM node:16.16-alpine as base

# set working directory
WORKDIR /app

# install app dependencies
COPY package*.json ./
RUN npm install 

COPY . ./

FROM base as dev

# start app
CMD ["npm", "run", "start:dev"]

FROM base as prod

# build 
RUN npm build

# start app
CMD ["npm", "run", "start:prod"]