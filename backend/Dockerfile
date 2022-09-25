# docker build -t backend:latest . && docker run -d --name backend -p 3333:3333 backend:latest

FROM node:16.3.0-alpine

WORKDIR /usr/app

COPY package.json ./
COPY yarn.lock ./
RUN yarn

COPY . .
EXPOSE 3333

CMD ["yarn", "start"]