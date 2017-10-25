FROM node:8.2.1

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

ARG NODE_ENV
ENV NODE_ENV $NODE_ENV
COPY package.json /usr/src/app/
# RUN npm set registry http://frontend.tutu.pro
RUN npm install && npm cache clean --force
COPY . /usr/src/app

CMD [ "npm", "start" ]

EXPOSE 3000