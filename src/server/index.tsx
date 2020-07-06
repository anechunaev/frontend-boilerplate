import * as morgan from 'morgan';
import * as Express from 'express';
import loadable from 'react-loadable';
import pageTemplate from './middlewares/serverSideRender';
import pageNotFound from './middlewares/handler404';
import staticUrls from './middlewares/assetsUrls';
import errorRequestHandler from './middlewares/errorRequestHandler';
import healthcheck from './middlewares/healthcheck';
import getShutdownHandler from './lib/gracefulShutdown';
import * as expressStaticGzip from "express-static-gzip";

const PORT = process.env.PORT || 8081;
const HOST = process.env.HOST || '0.0.0.0';
const app = Express();

app.disable('x-powered-by');
app.all('/healthcheck', healthcheck);
app.use(morgan('tiny'));
app.use('/dist', expressStaticGzip('dist/public', {
	enableBrotli: true,
	index: false,
	orderPreference: ['br', 'gzip'],
}));
app.use('/', Express.static('static'));
app.all('*', staticUrls);
app.all('/', pageTemplate);
app.all('/:page', pageTemplate);
app.all('*', errorRequestHandler);
app.all('*', pageNotFound);

loadable.preloadAll().then(function onBundlesPreloaded() {
	const server = app.listen(+PORT, HOST, function onAppStart() {
		console.log(`==> Server @ http://${HOST}:${PORT}`);
	});
	const shutdown = getShutdownHandler(server);

	process.on('SIGINT', function onSigInt () {
		console.info('\n==> Got SIGINT. Graceful shutdown @ ' + (new Date()).toISOString());
		shutdown();
	});

	process.on('SIGTERM', function onSigTerm () {
		console.info('\n==> Got SIGTERM. Graceful shutdown @ ' + (new Date()).toISOString());
		shutdown();
	});

	process.on('unhandledRejection', function unhandledRejectionHandler(reason, promise) {
		console.error("Unhandled rejection at:\n", promise, "\n\nReason: ", reason);
		process.exitCode = 1;
		shutdown();
	});
	
	process.on('uncaughtException', function uncaughtExceptionHandler(error) {
		console.error("Uncaught exception:\n", error);
		process.exitCode = 1;
		shutdown();
	});
});