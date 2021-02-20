FROM node:alpine

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY package.json /usr/src/app
COPY ./.next /usr/src/app/.next
COPY ./node_modules /usr/src/app/node_modules
COPY ./.env.local /usr/src/app/.env.local

EXPOSE 3000
CMD [ "yarn", "start" ]