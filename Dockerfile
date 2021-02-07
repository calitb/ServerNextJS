# base image
FROM node:12.18-alpine3.11

# create & set working directory
RUN mkdir -p /usr/src
WORKDIR /usr/src

# copy source files
COPY . /usr/src

# install dependencies
RUN npm i

# start app
RUN npm run build
EXPOSE 3000
CMD npm start