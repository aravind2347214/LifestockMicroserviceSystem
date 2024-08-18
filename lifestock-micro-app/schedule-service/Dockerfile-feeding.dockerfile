# Dockerfile for Feeding Schedule Service
FROM node:14

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3002

CMD [ "node", "scheduleService.js" ]
