# Modern Web Frontend Boilerplate

## Technologies
- **Client-side:** TypeScript, React
- **Server-side:** TypeScript, Node.js
- **Routing:** Express, React-Router

## Limitations and restrictions

**Server-side:**
- Node.js v.8+
- Npm v.6+
- TLS/SSL not supported, it should be implemented by platform router or reverse-proxy

**Client-side:**
- IE browser is not supported (we are modern, right?)


## Additional features
- [ ] TODO: PWA
  - [x] HTTPS and responsiveness should be implemented by developer
  - [x] AMP and Schema.org metadata should be implemented by developer
  - [ ] TODO: Offline mode with Service Workers
  - [x] Web App Manifest
  - [ ] TODO: Client-side cache by Service Workers
  - [x] App icons
- [x] SPA with splitted chunks and async loading
- [x] Dynamic styles by JSS
  - [x] SSR with dynamic styles (critical CSS)
  - [ ] TODO: SSR with above-the-fold CSS
  - [ ] TODO: Extract static styles to file
- [ ] TODO: Use GraphQL to implement client-server-client messaging
- [ ] TODO: Web Fragments
  - [ ] TODO: Implement Entity-component-system pattern for client-side or isomorphic applications
  - [ ] TODO: Web Components server-side-rendering
  - [ ] TODO: Server-side dynamic polyfills loading
- [ ] TODO: Quality assurance tools
  - [ ] TODO: Integrate framework for unit-testing
  - [ ] TODO: Integrate framework for e2e testing
  - [ ] TODO: Coverage reports
  - [ ] TODO: Performance reports
  - [ ] TODO: Linters and code-style checkers
- [ ] TODO: Development tools
  - [ ] TODO: Watcher
  - [ ] TODO: Hot module replacement for client-side code
  - [ ] TODO: Iterative building of client-side application

## Under consideration
- Hot module replacement for server-side code
- Multi-platform development (build web and mobile applications from source code)
  - Adapt kotlin for web-development
- API for URL generating
  - Use route tables to create react-router and express routes
  - Generate sitemap from route tables
- Synchronize data in real time from all opened tabs or browsers
- Implement built-in telemetry system
- Internationalization tools

## How to build
Production build:
```
$ npm run build
```

Development build:
```
$ npm run dev:build
```

Start server:
```
$ npm start
```