# Dockerfile for Health Monitoring Service
FROM node:alpine

WORKDIR /server

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3002

CMD [ "npx","nodemon", "server.js" ]
