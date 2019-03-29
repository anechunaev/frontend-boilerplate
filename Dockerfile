FROM node:11-alpine

ENV TERM xterm
ENV LANG en_US.UTF-8
ENV TZ='Europe/Moscow'

RUN mkdir -p /usr/share/app && chown 1001:0 /usr/share/app
RUN mkdir -p /usr/share/app/.npm && chown 1001:0 /usr/share/app/.npm
RUN mkdir -p /usr/share/app/.npm-global && chown 1001:0 /usr/share/app/.npm-global
WORKDIR /usr/share/app

ENV NO_UPDATE_NOTIFIER=true
ENV NPM_CONFIG_USERCONFIG=/usr/share/app/.npmrc
ENV NPM_CONFIG_CACHE=/usr/share/app/.npm
ENV NPM_CONFIG_PREFIX=/usr/share/app/.npm-global
COPY package.json /usr/share/app
RUN npm install --no-progress --silent && npm cache clean --force
COPY . /usr/share/app

ARG NODE_ENV=production
ENV NODE_ENV $NODE_ENV
ARG PORT=8080
ENV PORT $PORT
ARG HOST='0.0.0.0'
ENV HOST $HOST
ARG PORT_DEBUG=9229
ENV PORT_DEBUG $PORT_DEBUG

EXPOSE $PORT $PORT_DEBUG

RUN sh /usr/share/app/bin/build.sh

HEALTHCHECK --interval=30s --timeout=30s --start-period=5s --retries=3 CMD [ "/usr/share/app/bin/healthcheck.sh" ]

USER 1001

CMD [ "sh", "./bin/start.sh" ]