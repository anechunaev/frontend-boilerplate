FROM node:11-alpine as builder

ARG CACHE_PORT=8080
ARG PORT=8081
ARG HOST='0.0.0.0'

ENV HOST=$HOST \
	PORT=$PORT \
	CACHE_PORT=$CACHE_PORT \
	TERM=xterm \
	LANG=en_US.UTF-8 \
	TZ='Europe/Moscow' \
	NO_UPDATE_NOTIFIER=true \
	NPM_CONFIG_USERCONFIG=/tmp/.npmrc \
	NPM_CONFIG_CACHE=/tmp/npm-cache \
	NPM_CONFIG_PREFIX=/tmp/npm-global

RUN apk add --no-cache yarn \
	&& mkdir -p /usr/share/app &&  chown 1001:0 /usr/share/app \
	&& mkdir -p /tmp/npm-cache \
	&& mkdir -p /tmp/npm-global

WORKDIR /usr/share/app

COPY package.json .
RUN yarn --no-progress --silent
COPY . .

ARG NODE_ENV=production
ENV NODE_ENV $NODE_ENV

RUN sh ./bin/build.sh

# Change $PORT in Varnish config because constant is expected
RUN sed -i "s/\${PORT}/\"$PORT\"/g" ./config/varnish.vcl



FROM node:11-alpine as runner

ARG CACHE_PORT=8080
ARG PORT=8081
ARG HOST='0.0.0.0'
ARG NODE_ENV=production

ENV HOST=$HOST \
	PORT=$PORT \
	CACHE_PORT=$CACHE_PORT \
	NODE_ENV=$NODE_ENV

WORKDIR /usr/share/app
RUN apk add --no-cache varnish=~6 \
	&& mkdir -p ./varnish \
	&& chown -R 1001:0 .

COPY --from=builder --chown=1001:0 /usr/share/app/bin ./bin
COPY --from=builder --chown=1001:0 /usr/share/app/config/varnish.vcl ./config/varnish.vcl
COPY --from=builder --chown=1001:0 /usr/share/app/dist ./dist
COPY --from=builder --chown=1001:0 /usr/share/app/static ./static
COPY --from=builder --chown=1001:0 /usr/share/app/node_modules/full-icu ./node_modules/full-icu
COPY --from=builder --chown=1001:0 /usr/share/app/node_modules/react-loadable ./node_modules/react-loadable

EXPOSE $CACHE_PORT
HEALTHCHECK --interval=30s --timeout=30s --start-period=5s --retries=3 CMD [ "./bin/healthcheck.sh" ]

USER 1001
CMD [ "./bin/start.sh" ]
