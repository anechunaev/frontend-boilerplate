import * as React from 'react';
import { HelmetData } from 'react-helmet';

export interface HtmlProps {
	head: HelmetData;
	html: string;
	scripts: string[];
	window: any;
	css: string;
	vendorCss: string;
}

const Html = ({ head, html, scripts, window, css, vendorCss }: HtmlProps) => (
	<html lang="en">
		<head>
			<meta charSet="utf-8" />
			<meta name="viewport" content="width=device-width, initial-scale=1" />
			{head.meta.toComponent()}
			<link rel="stylesheet" href={vendorCss} />
			<link rel="stylesheet" href={css} />
			{head.title.toComponent()}
		</head>
		<body>
			<div
				id="main"
				dangerouslySetInnerHTML={{ __html: html }}
			/>
			<script
				dangerouslySetInnerHTML={{
					__html: Object.keys(window).reduce(
						(out, key) => out += `window.${key}=${JSON.stringify(window[key])};`,
					''),
				}}
			/>
			{scripts.map(src => <script key={src} defer src={src} />)}
		</body>
	</html>
);

export default Html;