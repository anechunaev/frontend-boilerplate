const {
	resolve
} = require('path');
const webpack = require('webpack');
const ManifestPlugin = require('webpack-manifest-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const LoadablePlugin = require('@loadable/webpack-plugin');
const { loadableTransformer } = require('loadable-ts-transformer');

module.exports = {
	mode: 'development',
	target: 'web',
	context: resolve(__dirname),
	devtool: 'cheap-module-source-map',
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
			use: ['cache-loader', {
				loader: 'ts-loader',
				options: {
					configFile: 'tsconfig.json',
					transpileOnly: true,
					logInfoToStdOut: true,
					getCustomTransformers: () => ({ before: [loadableTransformer] }),
				},
			}, ],
			exclude: /node_modules/,
		}, ],
	},
	optimization: {
		chunkIds: 'named',
		moduleIds: 'named',
	},
	plugins: [
		new webpack.DefinePlugin({
			'process.env': {
				NODE_ENV: JSON.stringify('development'),
				HOST: JSON.stringify(process.env.HOST),
				PORT: JSON.stringify(process.env.PORT),
			},
			PRODUCTION: JSON.stringify(false),
		}),
		new ManifestPlugin(),
		new ForkTsCheckerWebpackPlugin({
			typescript: {
				configFile: '../../tsconfig.json',
			},
		}),
		new LoadablePlugin(),
	],
};