FROM node:7.10

RUN curl -o- -L https://yarnpkg.com/install.sh | bash

WORKDIR /src

COPY package.json package.json
COPY yarn.lock yarn.lock

COPY . /src
RUN yarn install
