# base image
FROM node:12.18-alpine3.11

# create & set working directory
RUN mkdir -p /usr/src
WORKDIR /usr/src

# copy source files
COPY . /usr/src

# Install yarn
RUN apk add --no-cache --virtual .build-deps \
  ca-certificates \
  wget \
  tar && \
  cd /usr/local/bin && \
  wget https://yarnpkg.com/latest.tar.gz && \
  tar zvxf latest.tar.gz && \
  ln -s /usr/local/bin/dist/bin/yarn.js /usr/local/bin/yarn.js && \
  apk del .build-deps

# install dependencies
RUN yarn install 

# start app
RUN yarn build
EXPOSE 3000
CMD yarn start