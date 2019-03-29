#!/bin/sh

STATUSCODE=$(curl --silent --output /dev/null --write-out "%{http_code}" http://0.0.0.0:$PORT/healthcheck)

if test $STATUSCODE -ne 200; then
	exit 1
fi
