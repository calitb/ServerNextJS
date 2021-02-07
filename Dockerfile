# base image
FROM node

# create & set working directory
RUN mkdir -p /usr/src
WORKDIR /usr/src

# copy source files
COPY . /usr/src
RUN rm -r node_modules

# install dependencies
RUN yarn

# start app
RUN yarn build
EXPOSE 3000
CMD yarn start