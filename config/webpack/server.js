/* eslint import/no-extraneous-dependencies: ["error", {"devDependencies": true}] */
// @ts-nocheck

import path from 'path';
import webpack from 'webpack';
import WebpackConfig from 'webpack-config';
import nodeModules from 'webpack-node-externals';
import { CheckerPlugin, TsConfigPathsPlugin } from 'awesome-typescript-loader';
import paths from '../../config/paths';

function recursiveLoader(root = {}, func) {
	if (root.loaders) {
		root.loaders.forEach(l => recursiveLoader(l, func));
	}
	if (root.loader) return func(root);
	return false;
}

const config = new WebpackConfig().extend({
	'[root]/base.js': conf => {
		conf.module.loaders.forEach(loader => {
			recursiveLoader(loader, l => {
				if (l.loader === 'file-loader') {
					l.query.emitFile = false;
				}
			});
		});

		conf.module.loaders.find(l => l.test.toString() === /\.(jpe?g|png|gif|svg)$/i.toString())
			.loaders.push({
				loader: 'image-webpack-loader',
				options: {},
			});

		return conf;
	},
}).merge({
	target: 'node',
	output: {
		path: paths.dist,
		filename: 'server.js',
	},

	entry: {
		javascript: [
			path.join(paths.entry, 'server.tsx'),
		],
	},

	node: {
		__dirname: true,
	},

	module: {
		rules: [
			{
				test: /\.css$/,
				loader: 'css-loader/locals',
				query: {
					minimize: true,
					modules: true,
					localIdentName: '[folder]__[local]__[hash:base64:5]'
				}
			},
			{
				test: /\.less$/,
				use: [
					{
						loader: 'css-loader/locals',
						options: {
							minimize: true,
							modules: true,
							localIdentName: '[folder]__[local]__[hash:base64:5]'
						}
					},
					'less-loader'
				]
			},
			{
				test: /\.tsx?$/,
				loader: 'awesome-typescript-loader',
				exclude: /node_modules(?!(\/@tutu.*))/,
				query: {
					useCache: true,
					cacheDirectory: '.awcache-server',
				},
			},
			{
				test: /\.jsx?$/,
				loader: 'babel-loader',
				exclude: /node_modules(?!(\/@tutu.*))/
			}
		],
	},

	plugins: [
		new webpack.NormalModuleReplacementPlugin(/\.(woff2?|ttf|eot|png|jpe?g|gif|svg)(\?.*$|$)/, 'node-noop'),
		new webpack.DefinePlugin({
			SERVER: true,
			'process.env': {
				NODE_ENV: JSON.stringify('production'),
			},
		}),
		new webpack.EnvironmentPlugin({
			NODE_ENV: 'production',
			DEBUG: false,
		}),
		new CheckerPlugin(),
		new TsConfigPathsPlugin(),
	],

	externals: nodeModules({
		whitelist: [
			/@tutu/i,
		]
	}),
});

export default config;