const {
	resolve
} = require('path');
const webpack = require('webpack');
const {
	CheckerPlugin
} = require('awesome-typescript-loader');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');
const AsyncChunkNamesPlugin = require('webpack-async-chunk-names-plugin');
const {
	ReactLoadablePlugin
} = require('react-loadable/webpack');
const CompressionPlugin = require('compression-webpack-plugin');
const BrotliCompression = require("brotli-webpack-plugin");

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
				NODE_ENV: JSON.stringify('production'),
				HOST: JSON.stringify(process.env.HOST),
				PORT: JSON.stringify(process.env.PORT),
			},
			PRODUCTION: JSON.stringify(true),
		}),
		new CheckerPlugin(),
		new ManifestPlugin(),
		new AsyncChunkNamesPlugin(),
		new ReactLoadablePlugin({
			filename: './dist/react-loadable.json',
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