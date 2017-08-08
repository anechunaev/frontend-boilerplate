/* eslint import/no-extraneous-dependencies: ["error", {"devDependencies": true}] */
// @ts-nocheck

import { join } from 'path';
import webpack from 'webpack';
import WebpackConfig from 'webpack-config';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import CompressionPlugin from 'compression-webpack-plugin';
import ChunkManifestPlugin from 'chunk-manifest-webpack-plugin';
import WebpackChunkHash from 'webpack-chunk-hash';
import ManifestPlugin from 'webpack-manifest-plugin';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';
import { BUNDLE_ANALYZER } from '../../config/project';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import { css } from './common';
import paths from '../../config/paths';

const autoprefixer = require('autoprefixer');
const csso = require('postcss-csso');

const extractCSS = new ExtractTextPlugin({
	filename: 'assets/css/style.[contenthash].css',
	allChunks: true,
});

export default new WebpackConfig().extend({
	'[root]/client.js': config => {
		config.module.loaders.find(l => l.test.toString() === /\.(jpe?g|png|gif|svg)$/i.toString())
			.loaders.push({
				loader: 'image-webpack-loader',
				options: {},
			});

		return config;
	},
}).merge({
	output: {
		filename: '[name].[chunkhash].js',
		chunkFilename: '[name].[chunkhash].js',
	},
	module: {
		loaders: [
			{
				test: /\.css$/,
				use: extractCSS.extract({
					fallback: 'style-loader',
					use: [
						{
							loader: 'css-loader',
							options: {
								minimize: true,
								modules: true,
								localIdentName: '[local]-[hash:base64:10]'
							}
						},
						{
							loader: 'postcss-loader',
							options: {
								plugins: function () {
									return [
										autoprefixer,
										csso
									]
								}
							}
						}
					]
				}),
			},
			{
				test: /\.less$/,
				use: extractCSS.extract({
					fallback: 'style-loader',
					use: [
						{
							loader: 'css-loader',
							options: {
								minimize: true,
								modules: true,
								localIdentName: '[local]-[hash:base64:10]'
							}
						},
						{
							loader: 'postcss-loader',
							options: {
								plugins: function () {
									return [
										autoprefixer,
										csso
									]
								}
							}
						},
						{
							loader: 'less-loader',
							options: {}
						}
					]
				}),
			}
		],
	},
	plugins: [
		new webpack.DefinePlugin({
			'process.env': {
				NODE_ENV: JSON.stringify('production'),
			},
		}),
		new webpack.NoEmitOnErrorsPlugin(),
		new webpack.optimize.UglifyJsPlugin({
			mangle: true,
			compress: {
				warnings: false,
				pure_getters: true,
				unsafe: true,
				unsafe_comps: true,
				screw_ie8: true,
			},
			output: {
				comments: false,
			},
			exclude: [/\.min\.js$/gi],
		}),
		new webpack.optimize.OccurrenceOrderPlugin(),
		new webpack.optimize.AggressiveMergingPlugin(),
		new CompressionPlugin({
			minRatio: 0.99,
		}),
		extractCSS,
		new webpack.optimize.CommonsChunkPlugin({
			name: 'manifest',
			minChunks: Infinity,
		}),
		new webpack.HashedModuleIdsPlugin(),
		new WebpackChunkHash(),
		new ChunkManifestPlugin({
			filename: '../chunk-manifest.json',
			manifestVariable: 'webpackManifest',
		}),
		new ManifestPlugin({
			fileName: '../manifest.json',
			publicPath: '/',
		}),

		new BundleAnalyzerPlugin({
			analyzerMode: 'static',
			reportFilename: join(paths.dist, 'report.html'),
			openAnalyzer: BUNDLE_ANALYZER.openAnalyzer,
		}),

		new CopyWebpackPlugin([
			{
				from: paths.static,
				force: true,
			},
		]),
	],
});