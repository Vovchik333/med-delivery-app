FROM node:18.19.0-alpine

WORKDIR /app/med-delivery

COPY package*.json ./
RUN npm install

COPY src ./src
COPY *.env ./

CMD ["npm", "start"]