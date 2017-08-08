/* eslint import/no-extraneous-dependencies: ["error", {"devDependencies": true}] */
// @ts-nocheck

import path from 'path';
import webpack from 'webpack';
import WebpackConfig from 'webpack-config';
import { CheckerPlugin, TsConfigPathsPlugin } from 'awesome-typescript-loader';
import paths from '../../config/paths';

export default new WebpackConfig().extend('[root]/base.js').merge({
	entry: {
		browser: [
			path.join(paths.entry, 'client.tsx'),
		],
	},

	node: {
		console: true,
		fs: 'empty',
		net: 'empty',
		tls: 'empty',
	},

	module: {
		loaders: [
			{
				test: /\.(j|t)sx?$/,
				exclude: /node_modules|dist/,
				loaders: [
					{
						loader: 'awesome-typescript-loader',
						query: {
							useCache: true,
							cacheDirectory: '.awcache-browser',
						},
					},
				],
			},
		],
	},

	plugins: [
		new webpack.optimize.CommonsChunkPlugin({
			name: 'vendor',
			minChunks: module => (
				 module.context && module.context.indexOf('node_modules') !== -1
			),
		}),
		new webpack.DefinePlugin({
			SERVER: false,
		}),
		new CheckerPlugin(),
		new TsConfigPathsPlugin(),
	],
});