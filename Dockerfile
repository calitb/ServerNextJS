# base image
FROM node:12.18-alpine3.11

# create & set working directory
RUN mkdir -p /usr/src
WORKDIR /usr/src

# copy source files
COPY . /usr/src

RUN npm install react-scripts -g --silent 

# install dependencies
RUN yarn 

# start app
RUN yarn build
EXPOSE 3000
CMD yarn start