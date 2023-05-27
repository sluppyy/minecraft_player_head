FROM node:18-alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

ENV port=3000
EXPOSE $port

CMD [ "node", "src/index.js" ]