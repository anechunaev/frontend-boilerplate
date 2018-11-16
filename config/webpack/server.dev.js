const { resolve } = require('path');
const webpack = require('webpack');
const { CheckerPlugin } = require('awesome-typescript-loader');

module.exports = {
	mode: 'development',
	target: 'node',
	context: resolve(__dirname),
	entry: { server: resolve(__dirname, '../../src/server/index.tsx') },
	output: {
		filename: '[name].js',
		chunkFilename: '[name].chunk.dev.js',
		publicPath: '/dist/',
		path: resolve(__dirname, '../../dist'),
	},
	resolve: {
		extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
		modules: [
			resolve(__dirname, '../../src'),
			'node_modules',
		],
	},
	module: {
		rules: [
			{
				test: /\.(j|t)sx?$/,
				use: [
					{
						loader: 'awesome-typescript-loader',
						options: {
							useCache: true,
							forceIsolatedModules: true,
							reportFiles: [ "src/**/*.{ts,tsx}" ],
						},
					},
				],
				exclude: /node_modules/,
			},
		],
	},
	plugins: [
		new webpack.NamedModulesPlugin(),
		new webpack.HashedModuleIdsPlugin(),
		new webpack.DefinePlugin({
			'process.env': {
				NODE_ENV: JSON.stringify('development'),
			},
			PRODUCTION: JSON.stringify(false),
			__dirname: JSON.stringify(__dirname),
		}),
		new CheckerPlugin(),
	],
};