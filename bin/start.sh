#!/bin/sh

varnishd -s malloc,128M -a :$CACHE_PORT -f /usr/share/app/config/varnish.vcl -n /usr/share/app/varnish
echo "==> Reverse cache service @ http://${HOST}:${CACHE_PORT}"
/usr/bin/env node ./dist/server
