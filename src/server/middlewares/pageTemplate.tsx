import * as React from 'react';
import { renderToString } from 'react-dom/server';
import { SheetsRegistry } from 'react-jss';
import { StaticRouter } from 'react-router';
import { Capture } from 'react-loadable';
import Chain from '../../app/chain';
import * as csso from 'csso';
import * as Express from 'express';

export default (req: Express.Request, res: Express.Response) => {
	const route = {};
	const sheets = new SheetsRegistry();
	const modules: string[] = [];

	const components = (
		<StaticRouter location={req.url} context={route}>
			<Capture report={(name) => modules.push(name)}>
				<Chain registry={sheets} />
			</Capture>
		</StaticRouter>
	);

	const html = renderToString(components);
	const css = csso.minify(sheets.toString()).css;

	// react-loadable.json is generated after bundling, so webpack is not able to find it.
	// Use dynamic require function from Node.js instead.
	const bundles = eval(`(() => {
		const { getBundles } = require('react-loadable/webpack');
		const { resolve } = require('path');
		return getBundles(
			require(resolve(__dirname, '../dist/react-loadable.json')),
			modules
		);
	})()`);

	res.send(`<!DOCTYPE html>
		<html lang="ru">
		<head>
			<meta charset="utf-8" />
			<meta name="viewport" content="width=device-width, initial-scale=1" />
			<title>${res.locals.title || 'Frontend Boilerplate'}</title>
			<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/normalize/7.0.0/normalize.min.css" />
			<style type="text/css" id="server-side-styles">${css}</style>
		</head>
		<body>
			<div data-render="ssr" id="main">${html}</div>
			${res.locals.script.vendor ? `<script defer src="${res.locals.script.vendor}" data-origin="webpack-vendor"></script>` : ''}
			${bundles.map((chunk: any) => `<script defer src="${chunk.publicPath}" data-origin="react-loadable"></script>`).join('')}
			${
				(res.locals.script.chunks || []).map(
					(script: string) => `<script defer src="${script}" data-origin="webpack-chunk"></script>`
				).join('')
			}
			<script defer src="${res.locals.script.client}" data-origin="webpack-bundle"></script>
		</body>
		</html>
	`.replace(/(\t|\n)/g, ''));
}