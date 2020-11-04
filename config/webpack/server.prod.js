const {
	resolve
} = require('path');
const webpack = require('webpack');
const TerserPlugin = require('terser-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const LoadablePlugin = require('@loadable/webpack-plugin');
const { loadableTransformer } = require('loadable-ts-transformer');

module.exports = {
	mode: 'production',
	target: 'node',
	context: resolve(__dirname),
	entry: {
		server: resolve(__dirname, '../../src/server/index.tsx')
	},
	output: {
		filename: '[name].js',
		chunkFilename: '[name].chunk.js',
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
		rules: [{
			test: /\.(j|t)sx?$/,
			use: ['cache-loader', {
				loader: 'ts-loader',
				options: {
					useCache: true,
					forceIsolatedModules: true,
					reportFiles: ["src/**/*.{ts,tsx}"],
					silent: true,
				},
			}, ],
			exclude: /node_modules/,
		}, ],
	},
	plugins: [
		new webpack.DefinePlugin({
			'process.env': {
				NODE_ENV: JSON.stringify('production'),
				HOST: JSON.stringify(process.env.HOST),
				PORT: JSON.stringify(process.env.PORT),
			},
			PRODUCTION: JSON.stringify(true),
			__dirname: JSON.stringify(__dirname),
		}),
		new LoadablePlugin(),
		new ForkTsCheckerWebpackPlugin({
			typescript: {
				configFile: '../../tsconfig.json',
			},
		}),
		new webpack.optimize.LimitChunkCountPlugin({
			maxChunks: 1,
		}),
	],
	optimization: {
		chunkIds: 'deterministic',
		moduleIds: 'deterministic',
		minimizer: [
			new TerserPlugin(),
		],
	},
};