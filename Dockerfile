FROM node:16.18.1-alpine

RUN apk add --no-cache bash

RUN npm install -g @nestjs/cli@9.0.0

USER node

WORKDIR /home/node/app