FROM node:11-alpine

HEALTHCHECK --interval=30s --timeout=30s --start-period=5s --retries=3 CMD [ "/usr/share/app/bin/healthcheck.sh" ]

ARG CACHE_PORT=8080
ARG PORT=8081
ARG HOST='0.0.0.0'
ARG PORT_DEBUG=9229

ENV HOST=$HOST \
	PORT=$PORT \
	CACHE_PORT=$CACHE_PORT \
	PORT_DEBUG=$PORT_DEBUG \
	TERM=xterm \
	LANG=en_US.UTF-8 \
	TZ='Europe/Moscow' \
	NO_UPDATE_NOTIFIER=true \
	NPM_CONFIG_USERCONFIG=/usr/share/app/.npmrc \
	NPM_CONFIG_CACHE=/usr/share/app/.npm \
	NPM_CONFIG_PREFIX=/usr/share/app/.npm-global

EXPOSE $CACHE_PORT $PORT_DEBUG

RUN apk add --no-cache varnish=~6 yarn && \
	mkdir -p /usr/share/app && chown 1001:0 /usr/share/app && \
	mkdir -p /usr/share/app/.npm && chown 1001:0 /usr/share/app/.npm && \
	mkdir -p /usr/share/app/.npm-global && chown 1001:0 /usr/share/app/.npm-global && \
	mkdir -p /usr/share/app/varnish && chown 1001:0 /usr/share/app/varnish
WORKDIR /usr/share/app

COPY package.json /usr/share/app
RUN yarn --no-progress --silent && yarn cache clean --silent --no-progress
COPY . /usr/share/app

ARG NODE_ENV=production
ENV NODE_ENV $NODE_ENV

# Change $PORT in Varnish config because constant is expected
RUN sed -i "s/\${PORT}/\"$PORT\"/g" /usr/share/app/config/varnish.vcl

RUN sh /usr/share/app/bin/build.sh

USER 1001
CMD [ "sh", "./bin/start.sh" ]