vcl 4.0;

backend default {
    .host = "0.0.0.0";
    .port = ${PORT};
}

sub vcl_deliver {
    unset resp.http.Via;
    unset resp.http.X-Varnish;
}

sub vcl_backend_response {
    if (beresp.http.content-type ~ "text") {
        set beresp.do_gzip = true;
    }
}