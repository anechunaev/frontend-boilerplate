/* eslint-disable */
// @ts-nocheck

import Config, { environment } from 'webpack-config';

environment.setAll({
	root: () => __dirname,
});

function load(file) {
	return new Config().extend(`[root]/${file}.js`).toObject();
}

export default load('base');