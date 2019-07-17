import * as React from 'react';
import { hydrate } from 'react-dom';
import Chain from '../app/chain';
import { BrowserRouter } from 'react-router-dom';
import Loadable from 'react-loadable';

window.addEventListener("load", () => {
	const generatedStyles = document.getElementById('server-side-styles');
	if (!!generatedStyles) generatedStyles.outerHTML = '';
});

document.addEventListener("DOMContentLoaded", () => {
	const container = document.getElementById('main');
	Loadable.preloadReady().then(() => {
		hydrate(
			<BrowserRouter>
				<Chain />
			</BrowserRouter>,
			container,
			() => {
				if (container) container.dataset.render = "client";
			}
		);
	});
});