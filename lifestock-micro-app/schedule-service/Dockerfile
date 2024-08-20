# Dockerfile for Feeding Schedule Service
FROM node:alpine

WORKDIR /server

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3003

CMD [ "node", "server.js" ]
