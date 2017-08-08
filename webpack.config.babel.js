// @ts-nocheck
import "babel-core/register";
import "babel-polyfill";
import Config, { environment } from 'webpack-config';
import PATHS from './config/paths';

function load(file) {
	return new Config().extend(`[root]/${file}.js`).toObject();
}

environment.setAll({
	root: () => PATHS.webpack,
});

const toExport = [];

for (const build of (process.env.WEBPACK_CONFIG || '').trim().split(',')) {
	if (build) toExport.push(load(build));
}

if (!toExport.length) {
	// eslint-disable-next-line no-console
	console.error('Error: WEBPACK_CONFIG files not given');
	process.exit();
}

export default toExport;