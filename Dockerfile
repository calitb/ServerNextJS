FROM node:alpine

RUN apk add --no-cache  chromium --repository=http://dl-cdn.alpinelinux.org/alpine/v3.10/main ; exit 0
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY package.json /usr/src/app
COPY ./.next /usr/src/app/.next
COPY ./public /usr/src/app/public
COPY ./node_modules /usr/src/app/node_modules

EXPOSE 3000
CMD [ "yarn", "start" ]