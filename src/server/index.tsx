import * as morgan from 'morgan';
import * as Express from 'express';
import loadable from 'react-loadable';
import pageTemplate from './middlewares/pageTemplate';
import pageNotFound from './middlewares/404';
import staticUrls from './middlewares/staticUrls';
import errorRequestHandler from './middlewares/errorRequestHandler';
import getShutdownHandler from './lib/gracefulShutdown';

const PORT = process.env.PORT || 8080;
const HOST = process.env.HOST || '0.0.0.0';
const app = Express();

app.use('/dist', Express.static('dist/public'));
app.use('/', Express.static('static'));
app.all('*', staticUrls);
app.all('/', pageTemplate);
app.all('/:page', pageTemplate);
app.all('*', morgan('common'));
app.all('*', errorRequestHandler);
app.all('*', pageNotFound);

process.on('unhandledRejection', (reason, promise) => {
	console.error("Unhandled rejection at:\n", promise, "\n\nReason: ", reason);
	process.exit(1);
});

loadable.preloadAll().then(function onBundlesPreloaded() {
	const server = app.listen(+PORT, HOST, function onAppStart() {
		console.log(`==> Server @ http://${HOST}:${PORT}`);
	});
	const shutdown = getShutdownHandler(server);

	process.on('SIGINT', function onSigint () {
		console.info('\n==> Got SIGINT. Graceful shutdown @ ' + (new Date()).toISOString());
		shutdown();
	});

	process.on('SIGTERM', function onSigterm () {
		console.info('\n==> Got SIGTERM. Graceful shutdown @ ' + (new Date()).toISOString());
		shutdown();
	});
});