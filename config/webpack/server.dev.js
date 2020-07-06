const {
	resolve
} = require('path');
const webpack = require('webpack');
const {
	CheckerPlugin
} = require('awesome-typescript-loader');
const { TutuLangExtractPlugin } = require('@tutu/lang/lib/webpack');

module.exports = {
	mode: 'development',
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
			use: [{
				loader: 'awesome-typescript-loader',
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
		new webpack.NamedModulesPlugin(),
		new webpack.HashedModuleIdsPlugin(),
		new webpack.DefinePlugin({
			'process.env': {
				NODE_ENV: JSON.stringify('development'),
				HOST: JSON.stringify(process.env.HOST),
				PORT: JSON.stringify(process.env.PORT),
			},
			PRODUCTION: JSON.stringify(false),
			__dirname: JSON.stringify(__dirname),
		}),
		new CheckerPlugin(),
		new webpack.optimize.LimitChunkCountPlugin({
			maxChunks: 1,
		}),
		// new TutuLangExtractPlugin({
		// 	apiKey: 'fc257c16d9fd0eeb41893debbe226a2f16689bc9',
		// 	projectId: '970301685e4d1f3714c7b4.32832284',
		// 	test: /\.labels\.json$/,
		// 	include: /\bnode_modules\/@tutu\b/,
		// 	exclude: /\bnode_modules\b/,
		// }),
	],
};