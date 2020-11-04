const {
	resolve
} = require('path');
const webpack = require('webpack');
const TerserPlugin = require('terser-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const BrotliCompression = require("brotli-webpack-plugin");
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const LoadablePlugin = require('@loadable/webpack-plugin');
const { loadableTransformer } = require('loadable-ts-transformer');

module.exports = {
	mode: 'production',
	target: 'web',
	context: resolve(__dirname),
	entry: {
		client: resolve(__dirname, '../../src/client/index.tsx')
	},
	output: {
		filename: '[name].prod.[contenthash].js',
		chunkFilename: '[name].chunk.prod.[contenthash].js',
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
	plugins: [
		new webpack.DefinePlugin({
			'process.env': {
				NODE_ENV: JSON.stringify('production'),
				HOST: JSON.stringify(process.env.HOST),
				PORT: JSON.stringify(process.env.PORT),
			},
			PRODUCTION: JSON.stringify(true),
		}),
		new ManifestPlugin(),
		new LoadablePlugin(),
		new ForkTsCheckerWebpackPlugin({
			typescript: {
				configFile: '../../tsconfig.json',
			},
		}),
		new CompressionPlugin({
			cache: true,
			minRatio: 0.9,
		}),
		new BrotliCompression({
			minRatio: 0.9,
		}),
	],
	optimization: {
		chunkIds: 'deterministic',
		moduleIds: 'deterministic',
		minimize: true,
		minimizer: [
			new TerserPlugin({
				terserOptions: {
					output: {
						comments: false,
					},
					compress: {
						drop_console: true,
					},
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