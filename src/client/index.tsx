import * as React from 'react';
import { hydrate } from 'react-dom';
import Chain from '../app/chain';
import { BrowserRouter } from 'react-router-dom';
import { loadableReady } from '@loadable/component';

window.addEventListener("load", () => {
	const generatedStyles = document.getElementById('server-side-styles');
	if (!!generatedStyles) generatedStyles.outerHTML = '';
});

document.addEventListener("DOMContentLoaded", () => {
	const container = document.getElementById('main');
	loadableReady(() => {
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