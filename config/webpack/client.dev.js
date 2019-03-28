const {
	resolve
} = require('path');
const webpack = require('webpack');
const {
	CheckerPlugin
} = require('awesome-typescript-loader');
const ManifestPlugin = require('webpack-manifest-plugin');
const AsyncChunkNamesPlugin = require('webpack-async-chunk-names-plugin');
const {
	ReactLoadablePlugin
} = require('react-loadable/webpack');

module.exports = {
	mode: 'development',
	target: 'web',
	context: resolve(__dirname),
	entry: {
		client: resolve(__dirname, '../../src/client/index.tsx')
	},
	output: {
		filename: '[name].dev.[contenthash].js',
		chunkFilename: '[name].chunk.dev.[contenthash].js',
		publicPath: '/dist/',
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
		rules: [{
			test: /\.(j|t)sx?$/,
			use: [{
				loader: 'awesome-typescript-loader',
				options: {
					useCahce: true,
					forceIsolatedModules: true,
					reportFiles: ["src/**/*.{ts,tsx}"],
					silent: true,
				},
			}, ],
			exclude: /node_modules/,
		}, ],
	},
	plugins: [
		new webpack.NamedModulesPlugin(),
		new webpack.HashedModuleIdsPlugin(),
		new webpack.DefinePlugin({
			'process.env': {
				NODE_ENV: JSON.stringify('development'),
				HOST: JSON.stringify(process.env.HOST),
				PORT: JSON.stringify(process.env.PORT),
			},
			PRODUCTION: JSON.stringify(false),
		}),
		new CheckerPlugin(),
		new ManifestPlugin(),
		new AsyncChunkNamesPlugin(),
		new ReactLoadablePlugin({
			filename: './dist/react-loadable.json',
		}),
	],
};