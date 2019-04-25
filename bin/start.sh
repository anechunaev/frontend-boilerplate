#!/bin/sh

prep_term()
{
    unset term_child_pid
    unset term_kill_needed
    trap 'handle_term' TERM INT
}

handle_term()
{
    if [ "${term_child_pid}" ]; then
        kill -TERM "${term_child_pid}" 2>/dev/null
    else
        term_kill_needed="yes"
    fi
}

wait_term()
{
    term_child_pid=$!
    if [ "${term_kill_needed}" ]; then
        kill -TERM "${term_child_pid}" 2>/dev/null 
    fi
    wait ${term_child_pid}
    trap - TERM INT
    wait ${term_child_pid}
}

prep_term
varnishd -s malloc,128M -a :$CACHE_PORT -f /usr/share/app/config/varnish.vcl -n /usr/share/app/varnish
echo "==> Reverse cache service @ http://${HOST}:${CACHE_PORT}"
/usr/bin/env node --icu-data-dir=./node_modules/full-icu ./dist/server &
wait_term
