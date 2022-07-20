FROM node:13.12.0-alpine
RUN apk update && apk add git


WORKDIR /app

COPY package.json ./
COPY package-lock.json ./
RUN npm install
RUN npm build

COPY . ./


CMD ["npm", "start"]
