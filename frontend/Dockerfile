# docker build -t frontend:latest . && docker run -d --name frontend -p 3000:3000 frontend:latest

FROM node:16.3.0-alpine

WORKDIR /usr/app

COPY package.json ./
COPY yarn.lock ./
RUN yarn

COPY . .
RUN yarn build
EXPOSE 3000

CMD ["yarn", "start"]