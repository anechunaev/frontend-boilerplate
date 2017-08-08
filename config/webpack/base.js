/* eslint import/no-extraneous-dependencies: ["error", {"devDependencies": true}] */
// @ts-nocheck

import webpack from 'webpack';
import WebpackConfig from 'webpack-config';
import cssnano from 'cssnano';
import ProgressBarPlugin from 'progress-bar-webpack-plugin';
import chalk from 'chalk';
import paths from '../../config/paths';


export default new WebpackConfig().merge({
	resolve: {
		extensions: ['.js', '.jsx', '.ts', '.tsx', '.css', '.less'],
		modules: [
			paths.root,
			'node_modules',
		],
	},
	module: {
		loaders: [
			{
				test: /\.(woff|woff2|ttf|eot)$/i,
				loader: 'file-loader',
				query: {
					name: 'assets/fonts/[name].[hash].[ext]',
				},
			},
			{
				test: /\.(jpe?g|png|gif|svg)$/i,
				loaders: [
					{
						loader: 'file-loader',
						query: {
							name: 'assets/img/[name].[hash].[ext]',
						},
					},
				],
			},
		],
	},
	output: {
		path: paths.public,
		publicPath: '/',
		filename: '[name].js',
	},
	plugins: [
		new ProgressBarPlugin({
			format: ` ${chalk.cyan.bold('Frontend Boilerplate')} building [:bar] :percent' (:elapsed sec)`,
		}),
		new webpack.LoaderOptionsPlugin({
			minimize: true,
			debug: false,
			options: {
				context: paths.src,
				postcss() {
					return {
						plugins: [
							cssnano({autoprefixer: false}),
						],
					};
				},
				imageWebpackLoader: {
					mozjpeg: {
						quality: 65,
					},
					pngquant: {
						quality: '65-90',
						speed: 4,
					},
					svgo: {
						plugins: [
							{
								removeViewBox: false,
							},
							{
								removeEmptyAttrs: false,
							},
						],
					},
				},
			},
		}),
	],
});