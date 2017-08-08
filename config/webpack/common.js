/* eslint-disable import/prefer-default-export */
// @ts-nocheck

export const css = {
	loaders: [
		{
			ext: 'css',
			use: [],
		},
		{
			ext: 'less',
			use: ['less-loader'],
		},
	],
	loaderDefaults: {
		minimize: false,
		localIdentName: '[local]-[hash:base64]',
		importLoaders: 1,
	},
	getModuleRegExp(ext) {
		return [
			[`[^\\.global]\\.${ext}$`, { modules: true }],
			[`\\.global\\.${ext}$`, { modules: false }],
		];
	},
};