import * as React from 'react';
import { renderToString } from 'react-dom/server';
import { SheetsRegistry } from 'react-jss';
import { StaticRouter } from 'react-router';
import Chain from '../../app/chain';
import * as csso from 'csso';
import * as Express from 'express';

export default function middlewareServerSideRender(req: Express.Request, res: Express.Response) {
	const route = {};
	const sheets = new SheetsRegistry();

	const components = (
		<StaticRouter location={req.url} context={route}>
			<Chain registry={sheets} />
		</StaticRouter>
	);

	// loadable-stats.json is generated after bundling, so webpack is not able to find it.
	// Use dynamic require function from Node.js instead.
	const withChunks = eval(`(() => {
		const { ChunkExtractor } = require('@loadable/server');
		const { resolve } = require('path');
		const statsFile = resolve(__dirname, '../dist/public/loadable-stats.json');
		const extractor = new ChunkExtractor({ statsFile });
		return (app) => ({
			jsx: extractor.collectChunks(app),
			extractor,
		});
	})()`);

	const app = withChunks(components);

	const html = renderToString(app.jsx);
	let css = sheets.toString();

	let minifyRegExp = /(\n\t\t)/g;
	let minifyReplace = "\n";

	if (process.env.NODE_ENV === 'production') {
		css = csso.minify(css).css;
		minifyRegExp = /(\t|\n)/g;
		minifyReplace = "";
	}

	// Add Cache-Control header to enable browser http-cache and Varnish caching
	// res.set('Cache-Control', 'public, max-age=' + 24 * 60 * 60); // Cache on 1 day

	res.send(`<!DOCTYPE html>
		<html lang="en">
		<head>
			<meta charset="utf-8" />
			<meta name="viewport" content="width=device-width, initial-scale=1" />
			<title>${res.locals.title || 'Frontend Boilerplate'}</title>
			<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/normalize/7.0.0/normalize.min.css" />
			<link rel="manifest" href="/manifest.webmanifest" />
			<style type="text/css" id="server-side-styles">${css}</style>
			${app.extractor.getStyleTags()}
		</head>
		<body>
			<div data-render="ssr" id="main">${html}</div>
			${res.locals.script.vendor ? `<script defer src="${res.locals.script.vendor}" data-origin="webpack-vendor"></script>` : ''}
			<script src="${res.locals.script.client}" data-origin="webpack-bundle"></script>
			${app.extractor.getScriptTags({
				async: false,
				defer: true,
			})}
			${(res.locals.script.chunks || []).map(
				(script: string) => `<script defer src="${script}" data-origin="webpack-chunk"></script>`
			).join("\n")}
		</body>
		</html>
	`.replace(minifyRegExp, minifyReplace));
}