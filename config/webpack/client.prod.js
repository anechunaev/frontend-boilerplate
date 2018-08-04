const { resolve } = require('path');
const webpack = require('webpack');
const { CheckerPlugin } = require('awesome-typescript-loader');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');

module.exports = {
	mode: 'production',
	target: 'web',
	context: resolve(__dirname),
	entry: { client: resolve(__dirname, '../../src/client/index.tsx') },
	output: {
		filename: '[name].prod.js',
		chunkFilename: '[name].chunk.prod.js',
		publicPath: '/',
		path: resolve(__dirname, '../../dist/public'),
	},
	resolve: {
		extensions: ['.js', '.jsx', '.ts', '.tsx'],
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
							useCahce: true,
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
				NODE_ENV: JSON.stringify('production'),
			},
			PRODUCTION: JSON.stringify(true),
		}),
		new CheckerPlugin(),
		new ManifestPlugin(),
	],
	optimization: {
		minimizer: [
			new UglifyJsPlugin({
				sourceMap: true,
				uglifyOptions: {
					compress: {
						drop_console: true,
					},
					dead_code: true,
				},
			}),
		],
		splitChunks: {
			cacheGroups: {
				vendor: {
					test: /node_modules/,
					chunks: "initial",
					name: "vendor",
					priority: 10,
					enforce: true,
				},
			},
		},
	},
};