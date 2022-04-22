FROM node:13.12.0-alpine
RUN apk update && apk add git


WORKDIR /app


ENV PORT 4200
EXPOSE $PORT

COPY package.json ./
COPY package-lock.json ./

RUN npm install

COPY . ./


CMD ["npm", "build"]