# Modern Web Frontend Boilerplate

## Technologies
- **Client-side:** TypeScript v3, React v16
- **Server-side:** TypeScript v3, Node.js v11
- **Routing:** Express v4, React-Router v5

## Limitations and restrictions

**Server-side:**
- Node.js v.8+
- Npm v.6+
- TLS/SSL not supported, it should be implemented by platform router or reverse-proxy

**Client-side:**
- IE browser is not supported (we are modern, right?)

## Docker repository

`bungubot/frontend-boilerplate`

## Features

### Build process

- [x] Containerized build process with Docker
- [x] Multi-stage build with Docker
- [x] Generate compressed assets with gzip and [brotli](https://github.com/google/brotli)

### Server-side application

- [x] Graceful shutdown
- [x] Web server response caching with [Varnish](https://varnish-cache.org)
- [x] Server-side rendering with critical CSS
- [x] Above-the-fold CSS
- [x] Internationalization support with `Intl` API for Node.js
- [ ] Use GraphQL to implement client-server-client messaging

### Client-side application

- [x] PWA
	- [x] Web App Manifest
	- [x] App icons
	- [ ] Offline mode with Service Workers
	- [ ] Client-side cache with Service Workers
- [x] SPA with splitted chunks and async loading
- [x] Dynamic styling and theming with JSS
- [ ] Use GraphQL to implement client-server-client messaging

### Development tools

- [ ] Quality assurance tools
	- [ ] Integrate framework for unit-testing
	- [ ] Integrate framework for e2e testing
	- [ ] Coverage reports
	- [ ] Performance reports
	- [ ] Linters and code-style checkers
- [ ] Watcher
- [ ] Hot module replacement for client-side code
- [ ] Iterative assets building

## How to build
Production build:
```sh
$ npm run build
```

Development build:
```sh
$ npm run dev:build
```

Start server:
```sh
$ npm start
# or
$ ./bin/start.sh
```