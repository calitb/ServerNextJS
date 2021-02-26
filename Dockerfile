FROM node:alpine

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY package.json /usr/src/app
COPY ./.next /usr/src/app/.next
COPY ./public /usr/src/app/public
COPY ./node_modules /usr/src/app/node_modules

EXPOSE 3000
CMD [ "yarn", "start" ]