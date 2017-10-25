import 'isomorphic-fetch';

import * as path from 'path';
import { readFileSync } from 'fs';
import * as ms from 'microseconds';

import * as React from 'react';
import * as ReactDOMServer from 'react-dom/server';
import { StaticRouter } from 'react-router';
import { Provider } from 'react-redux';
import Helmet from 'react-helmet';

import * as express from 'express';
import { compose } from 'compose-middleware';
import * as morgan from 'morgan';
type Middleware = (req: express.Request, res: express.Response, next?: () => express.RequestHandler) => void;
type RequestHandler = express.RequestHandler;

import createNewStore from 'lib/redux';

import Html from 'src/server/views/server';
import App from 'src/common/App';

import * as paths from 'config/paths';

const [manifest, chunkManifest] = ['manifest', 'chunk-manifest'].map(
	name => JSON.parse(
		readFileSync(path.resolve(paths.dist, `${name}.json`), 'utf8'),
	),
);

const scripts = [
	'manifest.js',
	'vendor.js',
	'browser.js'
].map(key => manifest[key]);

const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || '0.0.0.0';
const app = express();

const errorHandler: Middleware = async (req, res, next) => {
	try {
		if (!!next) {
			await next();
		} else {
			throw Error('Empty handler');
		}
	} catch (e) {
		console.error('Error: ', e.message);
		res.send('There was an error. Please try again later.');
	}
};

const responseTimeHandler: Middleware = async (req, res, next) => {
	const start = ms.now();

	if (!!next) await next();
	
	const end = ms.parse(ms.since(start));
	const total = end.microseconds + (end.milliseconds * 1e3) + (end.seconds * 1e6);
	res.set('Response-Time', `${total / 1e3}ms`);
}

const pageTemplateHandler: RequestHandler = async (req, res) => {
	const route = {};
	const store = createNewStore({reducers: [], middleware: []});
	const components = (
		<StaticRouter location={req.baseUrl} context={route}>
			<Provider store={store}>
				<App />
			</Provider>
		</StaticRouter>
	);

	const html = ReactDOMServer.renderToString(components);

	res.send(`<!DOCTYPE html>\n${ReactDOMServer.renderToStaticMarkup(
		<Html
			html={html}
			head={Helmet.rewind()}
			window={{
				webpackManifest: chunkManifest,
				__STATE__: store.getState(),
			}}
			scripts={scripts}
			css={manifest['browser.css']}
			vendorCss={manifest['vendor.css']}
		/>
	)}`);
}

app.use(compose([
	errorHandler,
	responseTimeHandler,
	morgan('tiny'),
]));

app.use('/', express.static('dist/public'));

app.all('*', pageTemplateHandler);

app.listen(PORT, HOST);
console.log(`Server started on ${HOST}:${PORT}`);