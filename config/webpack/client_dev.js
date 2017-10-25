/* eslint import/no-extraneous-dependencies: ["error", {"devDependencies": true}] */
// @ts-nocheck

import webpack from 'webpack';
import WebpackConfig from 'webpack-config';
import paths from '../../config/paths';

const HOST = 'localhost';
const PORT = 8080;
const LOCAL = `http://${HOST}:${PORT}`;

export default new WebpackConfig().extend({
	'[root]/client.js': conf => {
		conf.entry.browser.unshift(
			'react-hot-loader/patch',
			`webpack-dev-server/client?${LOCAL}`,
			'webpack/hot/only-dev-server',
		);

		conf.module.loaders.find(l => l.test.toString() === /\.(j|t)sx?$/.toString())
			.loaders.unshift({
				loader: 'react-hot-loader/webpack',
			});

		return conf;
	},
}).merge({
	devtool: 'cheap-module-source-map',
	devServer: {
		host: HOST,
		port: PORT,
		contentBase: [
			paths.static,
			paths.views,
		],
		compress: true,
		publicPath: '/',
		inline: true,
		hot: true,
		noInfo: false,
		overlay: true,
		historyApiFallback: {
			index: '/client.html',
		},
		stats: {
			chunks: false,
			colors: true,
			errors: true,
			hash: true,
			performance: true,
			version: true,
			warnings: true,
		},
	},

	module: {
		loaders: [
			{
				test: /\.css$/,
				loaders: [
					'style-loader',
					{
						loader: 'css-loader',
						query: {
							minimize: false,
							localIdentName: '[local]-[hash:base64]',
							importLoaders: 1,
							sourceMap: true,
							modules: true,
						},
					},
					'postcss-loader',
				],
			},
			{
				test: /\.less$/,
				loaders: [
					'style-loader',
					{
						loader: 'css-loader',
						query: {
							minimize: false,
							localIdentName: '[local]-[hash:base64]',
							importLoaders: 1,
							sourceMap: true,
							modules: true,
						},
					},
					'postcss-loader',
					'less-loader',
				],
			},
		],
	},

	output: {
		sourceMapFilename: '[file].map',
		publicPath: `${LOCAL}/`,
	},

	plugins: [
		new webpack.NamedModulesPlugin(),
		new webpack.HotModuleReplacementPlugin(),
		new webpack.DefinePlugin({
			'process.env': {
				NODE_ENV: JSON.stringify('development'),
			},
		}),
	],
});